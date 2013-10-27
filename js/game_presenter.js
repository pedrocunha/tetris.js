function GamePresenter(game, canvas){
  this.game = game;
  this.canvas = canvas;
  this.context = this.canvas.getContext('2d');
  this.tetrominoPresenter = new TetrominoPresenter(this.context);
  this.timeout = null;
  this.isPaused = false;
};

GamePresenter.prototype = {
  prepare: function(){ 
    this.canvas.style.height = GamePresenter.gameHeight + "px";
    this.canvas.style.width  = GamePresenter.gameWidth + "px";
    this.canvas.height       = GamePresenter.gameHeight;
    this.canvas.width        = GamePresenter.gameWidth;

    this._autoMoveDown();
  },

  clear: function(){
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0,0, GamePresenter.gameWidth, GamePresenter.gameHeight);
  },

  draw: function(){
    var i = null,
        j = null;

    for (i = 0 ; i < this.game.grid.length; ++i) 
      for (j = 0; j < this.game.grid[i].length; ++j) 
        if ( this.game.grid[i][j] != undefined )
          this.tetrominoPresenter.draw(
              game.grid[i][j],
              j * TetrominoPresenter.BLOCK_SIZE, 
              i * TetrominoPresenter.BLOCK_SIZE
          );
  },

  pause: function(){
    if( this.isPaused ) {
      this.isPaused = false;
      this._autoMoveDown();
    }
    else {
      clearInterval(this.timeout);
      this.isPaused = true;
    }
  },

  areControlsDisabled: function(){
    if(this.isPaused || this.game.isAnimating())
      return true;

    return false;
  },

  enableControls: function(){
    var that = this;
    key('left', function(){
      if (that.areControlsDisabled()) return false;
      that.game.moveLeft();
    });

    key('right', function(){
      if (that.areControlsDisabled()) return false;
      that.game.moveRight();
    });

    key('down', function(){
      if (that.areControlsDisabled()) return false;
      clearInterval(that.timeout);
      that.game.moveDown();
      that._autoMoveDown();
    });

    key('enter', function(){
      if (that.areControlsDisabled()) return false;
      that.game.rotate();
    });

    $('a.pause').click(function(){
      $(this).toggleClass("active");
      $('.tooltip').toggleClass('active');
      that.pause();
    })

    key('p', function(){
      $('a.pause').trigger('click');
    });
  },

  _autoMoveDown: function(){
    this.timeout = setInterval(function(){
      game.moveDown();
    }, 700);
  }
};

GamePresenter.gameWidth  = TetrominoPresenter.BLOCK_SIZE * Game.HORIZONTAL_SPACES;
GamePresenter.gameHeight = TetrominoPresenter.BLOCK_SIZE * Game.VERTICAL_SPACES;
