// The game is composed by VERTICAL_SPACES x HORIZONTAL_SPACES cells
// the bottom row is considered the VERTICAL_SPACES-1 nth row.
function Game(){
  this.grid             = [];
  this.currentTetromino = null; 
  this.nextTetromino    = null;

  this.currentX         = null;
  this.currentY         = -1;
  this.animating        = false;

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
      return false

    // All is fine! We can move the tetromino down
    // Easiest algorithm is just to remove any references to
    // the Tetromino and put it back in
    this._removeCurrentTetromino();

    // Put the tetromino back in
    this.currentY = this.currentY + 1;
    this._placeCurrentTetromino();

    return true
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
    if ( this.currentX == 0 )
      return false

    // If block outside of grid on
    // top allow movement as long is still inside
    // the horizontal spaces
    if ( this.currentY < 0 && this.currentX > 0 ){
      this.currentX = this.currentX - 1
      return true
    }

    // Check first if blocks to the left are available
    for ( i = tetrominoHeight - 1, j = this.currentY; i >= 0 && j >= 0; --i, --j ){
      // Get first block filled in
      for ( w = 0; w < tetrominoWidth; ++w ){
        if(this.currentTetromino.grid[i][w] == 1 ){
          firstXBlock = w
          break
        }
      }

      nextXBlock = this.currentX + firstXBlock - 1
      if ( this.grid[j][nextXBlock] != null )
        return false
    }

    // Clean block from the grid
    this._removeCurrentTetromino();

    // Put back in
    this.currentX = this.currentX - 1
    this._placeCurrentTetromino();

    return true
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
    if ( tetrominoHeight <= this.currentY && this.currentX + tetrominoWidth - 1 == Game.HORIZONTAL_SPACES - 1)
      return false

    // If block outside of grid on
    // top allow movement as long is still inside
    // the horizontal spaces
    if ( this.currentY < 0)
      if ( this.currentX + tetrominoWidth < Game.HORIZONTAL_SPACES ){
        this.currentX = this.currentX + 1
        return true
      }
      else 
        return false

    // Check first if blocks to the right are available
    for ( i = tetrominoHeight - 1, j = this.currentY; i >= 0 && j >= 0; --i, --j ){
      // Get last block filled in
      for ( w = 0; w < tetrominoWidth; ++w ){
        if(this.currentTetromino.grid[i][w] == 1 )
          lastXBlock = w
      }

      nextXBlock = lastXBlock + this.currentX + 1
      if ( this.grid[j][nextXBlock] != null || nextXBlock == Game.HORIZONTAL_SPACES)
        return false
    }

    // Clean block from the grid
    this._removeCurrentTetromino();

    // Put back in
    this.currentX = this.currentX + 1
    this._placeCurrentTetromino();

    return true
  },

  start: function(options){
    if ( options == undefined )
      options = {}

    this.currentTetromino = options.currentTetromino || Tetromino.random();
    this.nextTetromino    = options.nextTetromino    || Tetromino.random();

    // Decide what's the currentX position
    // based on the width of the Tetromino
    var tetrominoWidth = this.currentTetromino.width();
    this.currentX = Math.floor(Game.HORIZONTAL_SPACES / tetrominoWidth) 
  },
  
  next: function(){
    this.currentTetromino = this.nextTetromino;
    this.nextTetromino    = Tetromino.random();
  },

  canMoveDown: function(){
    var i               = 0,
        j               = 0,
        futureY         = this.currentY + 1,
        tetrominoHeight = this.currentTetromino.height(),
        tetrominoWidth  = this.currentTetromino.width()

    if (this.currentY == (Game.VERTICAL_SPACES - 1))
      return false

    for(i = 0; i < tetrominoWidth; ++i){
     
     // Checking if there is a block on the tetromino
     // grid on the last row
     if(this.currentTetromino.grid[tetrominoHeight - 1][i] == 1)

       // Checking if the grid is available for that block
       if(this.grid[futureY][this.currentX + i] != null)
         return false
    }

    return true
  },

  // helper methods
  isAnimating: function(animating){
     if( animating == undefined )
       return this.animating

     this.animating = animating
  },

  enableControls: function(){
    var that = this;
    key('left', function(){
      if(that.isAnimating()) return false
      that.moveLeft();
    });

    key('right', function(){
      if(that.isAnimating()) return false
      that.moveRight();
    });

    key('down', function(){
      if(that.isAnimating()) return false
      that.moveDown();
    });
  },

  _removeCurrentTetromino: function(){
    // Search algorithm goes bottom-up
    var found = false;
    for(var i = this.currentY; i >= 0; --i){
      for(var j = 0; j < Game.HORIZONTAL_SPACES; ++j){
        
        if(this.grid[i][j] == this.currentTetromino){
          this.grid[i][j] = null
          found = true
        }
      }

      // When going up if one row has no occurrences
      // of a particular tetromino means the next up
      // can't have either. So we break earlier
      if(!found)
        break
      else
        found = false
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
      --updateY

      if ( updateY < 0 )
        break

    }
    return true
  }
}


Game.HORIZONTAL_SPACES = 10
Game.VERTICAL_SPACES   = 20
