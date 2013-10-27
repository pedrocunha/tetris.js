function TetrominoPresenter(context) {
  this.context = context;
};

TetrominoPresenter.prototype = {
  draw: function(tetromino, xPos, yPos){
    this.context.fillStyle = tetromino.color;
    this.context.fillRect(xPos, yPos, TetrominoPresenter.BLOCK_SIZE, TetrominoPresenter.BLOCK_SIZE);
  }
};

// Class 
// - Constants
TetrominoPresenter.BLOCK_SIZE = 30;
