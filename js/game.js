// The game is composed by VERTICAL_SPACES x HORIZONTAL_SPACES cells
// the bottom row is considered the VERTICAL_SPACES-1 nth row.
function Game(){
  this.grid             = [];
  this.currentTetromino = null; 
  this.nextTetromino    = null;
  this.animating        = false;

  /*
   * currentX:
   *   This variable holds the current X position of
   *   the current tetromino, considering it's left
   *   most blocks
   */
  this.currentX = null;

  /*
   * currentY:
   *   This variable holds the current Y position of
   *   the current tetromino, considering it's bottom
   *   most block.
   */
  this.currentY = -1;

  this._initializeGrid();
}

Game.prototype = {
  _initializeGrid: function(){
    var i = 0;
    var j = 0;

    for (i = 0; i < Game.VERTICAL_SPACES; ++i){
      this.grid[i] = [];
      for(j = 0; j < Game.HORIZONTAL_SPACES; ++j){
        this.grid[i][j] = null;
      }
    }
  },

  moveDown: function(){
    if (!this.canMoveDown())
      return false;

    // All is fine! We can move the tetromino down
    // Easiest algorithm is just to remove any references to
    // the Tetromino and put it back in
    this._removeCurrentTetromino();

    // Put the tetromino back in
    this.currentY = this.currentY + 1;
    this._placeCurrentTetromino();

    return true;
  },

  moveLeft: function(){
    var i = 0,
        j = 0,
        w = 0,
        firstXBlock = 0,
        nextXBlock = 0

    var tetrominoHeight = this.currentTetromino.height();
    var tetrominoWidth  = this.currentTetromino.width();
    
    // Return as early as possible if block at edge of
    // grid
    if ( this.currentX === 0 )
      return false;

    // If block outside of grid on
    // top allow movement as long is still inside
    // the horizontal spaces
    if ( this.currentY < 0 && this.currentX > 0 ){
      this.currentX = this.currentX - 1;
      return true;
    }

    // Check first if blocks to the left are available
    for ( i = tetrominoHeight - 1, j = this.currentY; i >= 0 && j >= 0; --i, --j ){
      // Get first block filled in
      for ( w = 0; w < tetrominoWidth; ++w ){
        if(this.currentTetromino.grid[i][w] === 1 ){
          firstXBlock = w;
          break;
        }
      }

      nextXBlock = this.currentX + firstXBlock - 1;
      if ( this.grid[j][nextXBlock] !== null )
        return false;
    }

    // Clean block from the grid
    this._removeCurrentTetromino();

    // Put back in
    this.currentX = this.currentX - 1
    this._placeCurrentTetromino();

    return true;
  },

  moveRight: function(){
    var i = 0,
        j = 0,
        w = 0,
        lastXBlock = 0,
        nextXBlock = 0

    var tetrominoHeight = this.currentTetromino.height();
    var tetrominoWidth  = this.currentTetromino.width();
    
    // Return as early as possible if block at edge of
    // grid
    if ( tetrominoHeight <= this.currentY && this.currentX + tetrominoWidth - 1 === Game.HORIZONTAL_SPACES - 1)
      return false;

    // If block outside of grid on
    // top allow movement as long is still inside
    // the horizontal spaces
    if ( this.currentY < 0)
      if ( this.currentX + tetrominoWidth < Game.HORIZONTAL_SPACES ){
        this.currentX = this.currentX + 1;
        return true;
      }
      else 
        return false;

    // Check first if blocks to the right are available
    for ( i = tetrominoHeight - 1, j = this.currentY; i >= 0 && j >= 0; --i, --j ){
      // Get last block filled in
      for ( w = 0; w < tetrominoWidth; ++w ){
        if(this.currentTetromino.grid[i][w] === 1 )
          lastXBlock = w;
      }

      nextXBlock = lastXBlock + this.currentX + 1;
      if ( this.grid[j][nextXBlock] !== null || nextXBlock === Game.HORIZONTAL_SPACES)
        return false;
    }

    // Clean block from the grid
    this._removeCurrentTetromino();

    // Put back in
    this.currentX = this.currentX + 1;
    this._placeCurrentTetromino();

    return true;
  },

  start: function(options){
    if ( options === undefined )
      options = {}

    this.currentTetromino = options.currentTetromino || Tetromino.random();
    this.nextTetromino    = options.nextTetromino    || Tetromino.random();

    // Decide what's the currentX position
    // based on the width of the Tetromino
    this.currentX = this._calculateCurrentX();
  },
  
  next: function(){
    this.currentTetromino = this.nextTetromino;
    this.nextTetromino    = Tetromino.random();
    this.currentY         = -1;
    this.currentX         = this._calculateCurrentX();
  },

  removeCompletedRows: function(){
    var i = this.grid.length - 1,
        j = 0;

    for ( ; i >= 0; --i ) {
      for (j = 0; j < this.grid[i].length; ++j ) {
        // If it's null we can skip this
        // row
        if ( this.grid[i][j] === null  )
          break
        // If last position is occupied
        // and it hasn't return from this
        // loop. this line is complete and
        // must be removed
        else if ( this.grid[i][j] !== null && j === this.grid[i].length - 1 ) {
          this.removeRow(i);

          // Save one full grid iteration
          // if row removed it 0
          if (i !== 0) 
            this.removeCompletedRows();
        }
      }
    }
  },

  removeRow: function(row){
    var i = row
    
    for ( ; i >= 0; --i )
      if ( i == 0 )
        for ( var j = 0; j < this.grid[i].length; ++j)
          this.grid[i][j] = null;
      else
        this.grid[i] = _.clone(this.grid[i - 1]);
    
  },

  rotate: function(){
    var newGrid      = this.currentTetromino.rotateRight(false),
        currHeight   = this.currentTetromino.height(),
        currWidth    = this.currentTetromino.width(),
        futureHeight = newGrid.length,
        futureWidth  = newGrid[0].length,
        futureX      = null,
        futureY      = null;

    if ( futureHeight > currHeight )
      futureY = this.currentY + Math.floor(futureHeight/2);
    else if ( futureHeight < currHeight )
      futureY = this.currentY - Math.floor(currHeight/2);
    else
      futureY = this.currentY;

    if ( futureWidth > currWidth )
      futureX = this.currentX - Math.floor(futureWidth/2);
    else if ( futureWidth < currWidth )
      futureX = this.currentX + Math.floor(currWidth/2);
    else
      futureX = this.currentX;
    
    // if futureX is less than 0
    // means the tetromino would be
    // drawn outside of the left bound
    if ( futureX < 0 )
      return false;

    // if futureX plus futureWidth is
    // higher than Game.HORIZONTAL_SPACES means
    // the tetromino would be drawn outside
    // of the right bound
    if ( futureX + futureWidth > Game.HORIZONTAL_SPACES )
      return false;

    var w = futureHeight;
    for (var i = futureY; i >= 0 && w > 0; --i, --w){
      for (var j = futureX; j < futureX + futureWidth; ++j){

        if(newGrid[w - 1][j - futureX] !== 1)
          continue;

        if(this.grid[i][j] !== null && this.grid[i][j] !== this.currentTetromino)
          return false;
      }
    }
    
    // Clean block from the grid
    this._removeCurrentTetromino();

    this.currentTetromino.rotateRight();
    this.currentX = futureX;
    this.currentY = futureY;

    this._placeCurrentTetromino();

    return true;
  },

  // helper methods
  isAnimating: function(animating){
     if( animating == undefined )
       return this.animating;

     this.animating = animating;
  },

  canMoveDown: function(){
    var i               = 0,
        j               = 0,
        tetrominoWidth  = this.currentTetromino.width()

    if (this.currentY == (Game.VERTICAL_SPACES - 1))
      return false;

    for(i = this.currentX; i < this.currentX + tetrominoWidth; ++i){
      for(j = this.currentY + 1; j >= 0; --j){
        
        // Edge case when outside
        // of the grid
        if(j - 1 > -1 && this.grid[j - 1][i] != this.currentTetromino )
          continue;
        else if(this.grid[j][i] == this.currentTetromino)
          break;
        else if(this.grid[j][i] != null)
          return false;
      }
    }
     
    return true;
  },


  // Private methods
  _removeCurrentTetromino: function(){
    // Search algorithm goes bottom-up
    var found = false;
    for(var i = this.currentY; i >= 0; --i){
      for(var j = 0; j < Game.HORIZONTAL_SPACES; ++j){
        
        if(this.grid[i][j] == this.currentTetromino){
          this.grid[i][j] = null;
          found = true;
        }
      }

      // When going up if one row has no occurrences
      // of a particular tetromino means the next up
      // can't have either. So we break earlier
      if(!found)
        break;
      else
        found = false;
    }
  },

  _placeCurrentTetromino: function(){
    var updateY         = this.currentY
    var tetrominoHeight = this.currentTetromino.height();
    var tetrominoWidth  = this.currentTetromino.width();

    for(var i = tetrominoHeight - 1; i >= 0; --i){
      for(var j = 0; j < tetrominoWidth; ++j){
        if(this.currentTetromino.grid[i][j] == 1)
          // currentY should be inclusive
          this.grid[updateY][this.currentX + j] = this.currentTetromino
      }
      --updateY;

      if ( updateY < 0 )
        break;

    }
    return true;
  },

  _calculateCurrentX: function(){
    if(this.currentTetromino.width() % 2 == 0)
      return (Game.HORIZONTAL_SPACES - this.currentTetromino.width())/2;
    else
      return Math.floor(Game.HORIZONTAL_SPACES / this.currentTetromino.width());
  }
}


Game.HORIZONTAL_SPACES = 10;
Game.VERTICAL_SPACES   = 20;
