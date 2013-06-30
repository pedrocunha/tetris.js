function GamePresenter(game, canvas){
  this.game = game;
  this.canvas = canvas;
  this.context = this.canvas.getContext('2d');
  this.tetrominoPresenter = new TetrominoPresenter(this.context);
}

GamePresenter.prototype = {
  prepare: function(){ 
    canvas.style.height = GamePresenter.gameHeight + "px";
    canvas.style.width  = GamePresenter.gameWidth + "px";
    canvas.height       = GamePresenter.gameHeight;
    canvas.width        = GamePresenter.gameWidth;
  },

  clear: function(){
    this.context.fillStyle = "#000000";
    this.context.fillRect(0,0, GamePresenter.gameWidth, GamePresenter.gameHeight);
  },

  draw: function(){
    var i = null,
        j = null;

    for (i = 0 ; i < this.game.grid.length; ++i) 
      for (j = 0; j < this.game.grid[i].length; ++j) 
        if ( this.game.grid[i][j] != undefined )
          this.tetrominoPresenter.draw(game.grid[i][j], j * TetrominoPresenter.BLOCK_SIZE, i * TetrominoPresenter.BLOCK_SIZE);
  },

  enableControls: function(){
    var that = this;
    key('left', function(){
      if (that.game.isAnimating() ) return false
      that.game.moveLeft();
    });

    key('right', function(){
      if (that.game.isAnimating() ) return false
      that.game.moveRight();
    });

    key('down', function(){
      if (that.game.isAnimating() ) return false
      that.game.moveDown();
    });

    key('enter', function(){
      if (that.game.isAnimating() ) return false
      that.game.rotate();
    });
  }
}

GamePresenter.gameWidth  = TetrominoPresenter.BLOCK_SIZE * Game.HORIZONTAL_SPACES;
GamePresenter.gameHeight = TetrominoPresenter.BLOCK_SIZE * Game.VERTICAL_SPACES;
