describe("Game", function() {
  var game;

  describe("#start", function(){
    beforeEach(function(){
      game = new Game();
      game.start()
    })

    it("prepares the current Tetromino", function(){
      expect(game.currentTetromino).toBeDefined()
    })

    it("prepares the next Tetromino", function(){
      expect(game.nextTetromino).toBeDefined()
    })

    it("allows to specify the current tetromino", function(){
      var tetromino = Tetromino.random();

      game.start({ currentTetromino: tetromino })
      expect(game.currentTetromino.coordinates).toEqual(tetromino.coordinates)
    })

    it("allows to specify the next tetromino", function(){
      var tetromino = Tetromino.random();

      game.start({ nextTetromino: tetromino })
      expect(game.nextTetromino.coordinates).toEqual(tetromino.coordinates)
    })
  })

  describe("#moveDown", function(){
    var tetromino;

    beforeEach(function(){
      tetromino = new Tetromino([[0,0], [0,1], [1,1], [2, 1]]) // xoo/xxx
      game = new Game()
      game.start({ currentTetromino: tetromino })
    })

    it("returns true after start when can move to the first top row", function(){
      expect(game.moveDown()).toBe(true) 
    })

    it("returns false when row 0th is all filled", function(){
      // Fill the first row of grid with non-nil
      // values. moveDown returns false because
      // he can't move down. 
      for ( var i = 0; i < Game.HORIZONTAL_SPACES; ++i )
        game.grid[0][i] = {}

      expect(game.moveDown()).toBe(false);
    })

    it("reflects moving down on the grid", function(){
      game.moveDown()

      // - - - X X X - - - -
      expect(game.grid[0][2]).toBe(null);
      expect(game.grid[0][3]).not.toBe(null);
      expect(game.grid[0][4]).not.toBe(null);
      expect(game.grid[0][5]).not.toBe(null);
      expect(game.grid[0][6]).toBe(null);
    })

    it("changes the grid state to reflect the twice movement", function(){
      game.moveDown()
      game.moveDown()

      // - - - X - - - - - -
      expect(game.grid[0][2]).toBe(null);
      expect(game.grid[0][3]).not.toBe(null);
      expect(game.grid[0][4]).toBe(null);
      expect(game.grid[0][5]).toBe(null);
      expect(game.grid[0][6]).toBe(null);

      // - - - X X X - - - -
      expect(game.grid[1][2]).toBe(null);
      expect(game.grid[1][3]).not.toBe(null);
      expect(game.grid[1][4]).not.toBe(null);
      expect(game.grid[1][5]).not.toBe(null);
      expect(game.grid[1][6]).toBe(null);
    })
  })

  describe('#lineIsEmpty', function(){
    beforeEach(function(){
      game = new Game();
      game.start()
    })

    it("returns true for any row when game starts", function(){
      for(var i = 0; i < Game.VERTICAL_SPACES; ++i)
        expect(game.lineIsEmpty(i)).toBe(true)
    })

    it("returns false if row contains at least one non-null object", function(){
      game.grid[1][5] = {}
      expect(game.lineIsEmpty(1)).toBe(false)
    })
  })
});


