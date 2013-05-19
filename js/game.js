// The game is composed by VERTICAL_SPACES x HORIZONTAL_SPACES cells
// the bottom row is considered the VERTICAL_SPACES-1 nth row.
function Game(){
  this.grid             = [];
  this.currentTetromino = null; 
  this.nextTetromino    = null;

  this.currentX         = null;
  this.currentY         = -1;

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
    var i               = 0,
        j               = 0,
        futureY         = this.currentY + 1,
        tetrominoHeight = this.currentTetromino.height(),
        tetrominoWidth  = this.currentTetromino.width()

    for(i = 0; i < tetrominoWidth; ++i){
     
     // Checking if there is a block on the tetromino
     // grid on the last row
     if(this.currentTetromino.grid[tetrominoHeight - 1][i] == 1)

       // Checking if the grid is available for that block
       if(this.grid[futureY][this.currentX + i] != null)
         return false
    }

    // All is fine! We can move the tetromino down
    // Easiest algorithm is just to remove any references to
    // the Tetromino and put it back in
    //
    // Search algorithm goes bottom-up
    var found = false;
    for(i = this.currentY; i >= 0; --i){
      for(j = 0; j < Game.HORIZONTAL_SPACES; ++j){
        
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

    // Put the tetromino back in
    this.currentY = futureY
    var updateY   = this.currentY

    for(i = tetrominoHeight - 1; i >= 0; --i){
      for(j = 0; j < tetrominoWidth; ++j){
        if(this.currentTetromino.grid[i][j] == 1)
          // currentY should be inclusive
          this.grid[updateY][this.currentX + j] = this.currentTetromino
      }
      --updateY

      if ( updateY < 0 )
        break

    }
    return true
  },

  moveLeft: function(){
  },

  moveRight: function(){
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

  // helper methods
  lineIsEmpty: function(row){
    var i = 0
    for(; i < this.grid[row].length; ++i){
      if( this.grid[row][i] != null )
        return false
    }
    return true
  }
}


Game.HORIZONTAL_SPACES = 10
Game.VERTICAL_SPACES   = 20
