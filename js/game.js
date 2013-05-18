function Game(){
  this.grid             = [];
  this.currentTetromino = null; 
  this.nextTetromino    = null;
  this.initializeGrid();
}

Game.prototype = {
  initializeGrid: function(){
    var horizontalSpaces = 10;
    var verticalSpaces   = 50;
    var i                = 0;
    var j                = 0;

    for(; i < horizontalSpaces; ++i){
      this.grid[i] = [];
      for(; j < verticalSpaces; ++j){
        this.grid[i][j] = null;
      }
    }
  },

  transit: function(){
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
  }
}
