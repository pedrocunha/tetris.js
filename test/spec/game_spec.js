describe('Game', function() {
  var game;

  describe('#start', function(){
    beforeEach(function(){
      game = new Game();
      game.start()
    })

    it('prepares the current Tetromino', function(){
      expect(game.currentTetromino).toBeDefined()
    })

    it('prepares the next Tetromino', function(){
      expect(game.nextTetromino).toBeDefined()
    })

    it('allows to specify the current tetromino', function(){
      var tetromino = Tetromino.random();

      game.start({ currentTetromino: tetromino })
      expect(game.currentTetromino.coordinates).toEqual(tetromino.coordinates)
    })

    it('allows to specify the next tetromino', function(){
      var tetromino = Tetromino.random();

      game.start({ nextTetromino: tetromino })
      expect(game.nextTetromino.coordinates).toEqual(tetromino.coordinates)
    })
  })

  describe('#moveDown', function(){
    var tetromino;

    beforeEach(function(){
      tetromino = new Tetromino([[0,0], [0,1], [1,1], [2, 1]]) // xoo/xxx
      game = new Game()
      game.start({ currentTetromino: tetromino })
    })

    it('returns true after start when can move to the first top row', function(){
      expect(game.moveDown()).toBe(true) 
    })

    it('returns false when row 0th is all filled', function(){
      // Fill the first row of grid with non-nil
      // values. moveDown returns false because
      // he can't move down. 
      for ( var i = 0; i < Game.HORIZONTAL_SPACES; ++i )
        game.grid[0][i] = {}

      expect(game.moveDown()).toBe(false);
    })

    it('reflects moving down on the grid', function(){
      game.moveDown()

      // - - - X X X - - - -
      expect(game.grid[0][2]).toBe(null);
      expect(game.grid[0][3]).not.toBe(null);
      expect(game.grid[0][4]).not.toBe(null);
      expect(game.grid[0][5]).not.toBe(null);
      expect(game.grid[0][6]).toBe(null);
    })

    it('changes the grid state to reflect the twice movement', function(){
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

    it('returns false when it reaches the bottom row', function(){
      game.moveDown();
      for(var i = 0; i < Game.VERTICAL_SPACES - 1; ++i)
        game.moveDown();

      expect(game.moveDown()).toBe(false)
    })
  })

  describe('#moveRight', function(){
    var tetromino;

    beforeEach(function(){
      tetromino = new Tetromino([[0,0], [0,1], [1,1], [2, 1]]) // xoo/xxx
      game = new Game()
      game.start({ currentTetromino: tetromino })
    })

    it('returns true when can move to the right', function(){
      expect(game.moveRight()).toBe(true)
    })

    it('returns false if can not move to the right', function(){
      game.moveDown()
      game.moveRight(); // - - - - X X X - - -
      game.moveRight(); // - - - - - X X X - - 
      game.moveRight(); // - - - - - - X X X - 
      expect(game.moveRight()).toBe(true); 
      expect(game.moveRight()).toBe(false); 
    })

    it('moves the whole tetromino', function(){
      game.moveDown()
      game.moveDown();
      game.moveRight();

      // - - - - X - - - - -
      // - - - - X X X - - - 
      expect(game.grid[0][3]).toBe(null);
      expect(game.grid[0][4]).not.toBe(null);
      expect(game.grid[0][5]).toBe(null);
      expect(game.grid[0][6]).toBe(null);
      expect(game.grid[0][7]).toBe(null);

      expect(game.grid[1][3]).toBe(null);
      expect(game.grid[1][4]).not.toBe(null);
      expect(game.grid[1][5]).not.toBe(null);
      expect(game.grid[1][6]).not.toBe(null);
      expect(game.grid[1][7]).toBe(null);
    })

    it('moves to the right till gets to a complex tetromino', function(){
      game.grid[0][6] = 1
      game.grid[0][7] = 1
      game.grid[1][7] = 1

      game.moveDown()
      game.moveDown();
      // - - - X - - 1 1 - -
      // - - - X X X - 1 - -

      expect(game.moveRight()).toBe(true)
      // - - - - X - 1 1 - -
      // - - - - X X X 1 - -

      expect(game.moveRight()).toBe(false)
    })

    it('moves to the right till gets to a complex tetromino (case 2)', function(){
      game.grid[0][6] = 1
      game.grid[0][7] = 1
      game.grid[0][8] = 1
      game.grid[0][9] = 1
      game.grid[1][9] = 1

      game.moveDown()
      game.moveDown();
      // - - - X - - 1 1 1 1
      // - - - X X X - - - 1

      expect(game.moveRight()).toBe(true)
      // - - - - X - 1 1 1 1
      // - - - - X X X - - 1

      expect(game.moveRight()).toBe(true)
      // - - - - - X 1 1 1 1
      // - - - - - X X X - 1

      expect(game.moveRight()).toBe(false)
    })

    it('returns false if can not move to the right due to a block', function(){
      game.grid[0][6] = 1
      game.grid[1][6] = 1

      game.moveDown();
      game.moveDown();
      
      // - - - X - - 1 - - -
      // - - - X X X 1 - - - 
      expect(game.moveRight()).toBe(false)
    })

    it('returns true when its still vertically outside of the grid but still horizontally inside', function(){
      expect(game.moveRight()).toBe(true)
    })

    it('returns false when its vertically outside but at the right edge of the grid', function(){
      game.moveRight();
      game.moveRight();
      game.moveRight();
      expect(game.moveRight()).toBe(true);

      //               X X X
      // - - - - - - - - - -

      expect(game.moveRight()).toBe(false);
    })
  })

  describe('#moveRight (Example 2)', function(){
    var tetromino;

    beforeEach(function(){
      tetromino = new Tetromino([[1,0], [2,0], [0,1], [1, 1]]), // oxx/xxo
      game = new Game()
      game.start({ currentTetromino: tetromino })
    })

    it('moves the whole tetromino', function(){
      game.moveDown()
      game.moveDown();
      game.moveDown();
      game.moveRight();

      // - - - - - - - - - -
      // - - - - - X X - - -
      // - - - - X X - - - - 
      expect(game.grid[1][3]).toBe(null);
      expect(game.grid[1][4]).toBe(null);
      expect(game.grid[1][5]).not.toBe(null);
      expect(game.grid[1][6]).not.toBe(null);
      expect(game.grid[1][7]).toBe(null);

      expect(game.grid[2][3]).toBe(null);
      expect(game.grid[2][4]).not.toBe(null);
      expect(game.grid[2][5]).not.toBe(null);
      expect(game.grid[2][6]).toBe(null);
      expect(game.grid[2][7]).toBe(null);
    })
  })

  describe('#moveLeft', function(){
    var tetromino;

    beforeEach(function(){
      tetromino = new Tetromino([[2,0], [0,1], [1,1], [2, 1]]), // oox/xxx
      game = new Game()
      game.start({ currentTetromino: tetromino })
    })

    it('can always move once to the left on the beginning', function(){
      expect(game.moveLeft()).toBe(true)
    })

    it('moves to the left till it reaches the wall', function(){
      game.moveDown()
      game.moveLeft();                    // - - X X X - - - - -
      game.moveLeft();                    // - X X X - - - - - - 
      expect(game.moveLeft()).toBe(true); // X X X - - - - - - -
      expect(game.moveLeft()).toBe(false); 
    })

    it('moves the whole tetromino', function(){
      game.moveDown()
      game.moveDown();
      game.moveLeft();

      // - - - - X - - - - -
      // - - X X X - - - - -
      expect(game.grid[0][1]).toBe(null);
      expect(game.grid[0][2]).toBe(null);
      expect(game.grid[0][3]).toBe(null);
      expect(game.grid[0][4]).not.toBe(null);
      expect(game.grid[0][5]).toBe(null);

      expect(game.grid[1][1]).toBe(null);
      expect(game.grid[1][2]).not.toBe(null);
      expect(game.grid[1][3]).not.toBe(null);
      expect(game.grid[1][4]).not.toBe(null);
      expect(game.grid[1][5]).toBe(null);
    })

    it('moves to the left till gets to a complex tetromino', function(){
      game.grid[0][1] = 1
      game.grid[0][2] = 1
      game.grid[1][1] = 1

      game.moveDown();
      game.moveDown();
      // - 1 1 - - X - - - -
      // - 1 - X X X - - - -

      expect(game.moveLeft()).toBe(true)
      // - 1 1 - X - - - - -
      // - 1 X X X - - - - -

      expect(game.moveLeft()).toBe(false)
    })

    it('moves to the left till gets to a complex tetromino (case 2)', function(){
      game.grid[0][0] = 1
      game.grid[0][1] = 1
      game.grid[0][2] = 1

      game.moveDown();
      game.moveDown();
      // 1 1 1 - - X - - - -
      // - - - X X X - - - -

      game.moveLeft();
      // 1 1 1 - X - - - - -
      // - - X X X - - - - -

      expect(game.moveLeft()).toBe(true)
      // 1 1 1 X - - - - - -
      // - X X X - - - - - -
      
      expect(game.moveLeft()).toBe(false)
    })

    it('moves to the left till it reaches the wall even if its still not inside the grid', function(){
      game.moveLeft();
      game.moveLeft();
      expect(game.moveLeft()).toBe(true);

      // X X X              
      // - - - - - - - - - -

      expect(game.moveLeft()).toBe(false);
    })
  })

  describe('#moveLeft (Example 2)', function(){
    var tetromino;

    beforeEach(function(){
      tetromino = new Tetromino([[1,0], [2,0], [0,1], [1, 1]]), // oxx/xxo
      game = new Game()
      game.start({ currentTetromino: tetromino })
    })

    it('can always move once to the left on the beginning', function(){
      expect(game.moveLeft()).toBe(true)
    })

    it('moves to the left till it reaches the wall', function(){
      game.moveDown()
      game.moveLeft();                    // - - X X - - - - - -
      game.moveLeft();                    // - X X - - - - - - - 
      expect(game.moveLeft()).toBe(true); // X X - - - - - - - -
      expect(game.moveLeft()).toBe(false); 
    })

    it('moves the whole tetromino', function(){
      game.moveDown()
      game.moveDown();
      game.moveDown();
      game.moveLeft();

      // - - - - - - - - - -
      // - - - X X - - - - -
      // - - X X - - - - - -
      expect(game.grid[0][0]).toBe(null);
      expect(game.grid[0][1]).toBe(null);
      expect(game.grid[0][2]).toBe(null);
      expect(game.grid[0][3]).toBe(null);
      expect(game.grid[0][4]).toBe(null);
      expect(game.grid[0][5]).toBe(null);

      expect(game.grid[1][0]).toBe(null);
      expect(game.grid[1][1]).toBe(null);
      expect(game.grid[1][2]).toBe(null);
      expect(game.grid[1][3]).not.toBe(null);
      expect(game.grid[1][4]).not.toBe(null);
      expect(game.grid[1][5]).toBe(null);

      expect(game.grid[2][0]).toBe(null);
      expect(game.grid[2][1]).toBe(null);
      expect(game.grid[2][2]).not.toBe(null);
      expect(game.grid[2][3]).not.toBe(null);
      expect(game.grid[2][4]).toBe(null);
      expect(game.grid[2][5]).toBe(null);
    })
  })

  describe('#next', function(){
    beforeEach(function(){
      game = new Game();
      game.start();
    })

    it('replaces the currentTetromino with the nextTetromino', function(){
      var nextTetromino = game.nextTetromino;
      game.next();
      expect(game.currentTetromino).toBe(nextTetromino);
    })
  })
});


