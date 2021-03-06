var game = new Game();
game.start();

var canvas  = document.getElementById('gameCanvas');
var gamePresenter = new GamePresenter(game, canvas);
gamePresenter.prepare();
gamePresenter.enableControls();

var mainloop = function() {
  updateGame();
  drawGame();
};

var animFrame = window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                null ;

if(animFrame !== null) {
  var recursiveAnim = function() {
    mainloop();
    animFrame(recursiveAnim, canvas);
  };

  // start the mainloop
  animFrame(recursiveAnim, canvas);
} else {
  var ONE_FRAME_TIME = 1000.0 / 60.0 ;
  setInterval(mainloop, ONE_FRAME_TIME);
}


function updateGame(){
  if(!game.canMoveDown()){
    game.removeCompletedRows();
    game.next();
  }
}

function drawGame(){
  gamePresenter.clear();
  gamePresenter.draw();
}
