describe("Game", function() {
  var game;

  beforeEach(function() {
    game = new Game();
    game.start();
  })
  
  describe("#start", function(){
    it("prepares the current Tetromino", function(){
      expect(game.currentTetromino).toEqual(jasmine.any(Object))
    })

    it("prepares the next Tetromino", function(){
      expect(game.nextTetromino).toEqual(jasmine.any(Object))
    })

    it("allows to specify the current tetromino", function(){
      game.start({ currentTetromino: Tetromino.all[0] })
      expect(game.currentTetromino.coordinates).toEqual(Tetromino.all[0].coordinates)
    })

    it("allows to specify the next tetromino", function(){
      game.start({ nextTetromino: Tetromino.all[0] })
      expect(game.nextTetromino.coordinates).toEqual(Tetromino.all[0].coordinates)
    })
  })
});
