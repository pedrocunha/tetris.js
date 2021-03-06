describe('Tetromino', function() {
  var tetromino;

  describe('#new', function(){
    beforeEach(function() {
      // oxx/xxo
      tetromino = new Tetromino([[1,0], [2,0], [0,1], [1, 1]]);
    });

    it('allows access to its composition', function(){
      expect(tetromino.coordinates).toBeDefined();
    });

    it('sets a default color', function(){
      expect(tetromino.color).toEqual('#FFFFFF')
    })

    it('initializes a grid with 2 rows and 3 columns', function(){
      expect(tetromino.grid[0].length).toEqual(3)
      expect(tetromino.grid[1].length).toEqual(3)
      expect(tetromino.grid.length).toEqual(2)
    })
  })

  describe('.all', function(){
    it('has all 7 combinations', function(){
      expect(Tetromino.all.length).toEqual(7)
    })
  });

  describe('.random', function(){
    it('returns a random Tetromino', function(){
      expect(Tetromino.random()).toEqual(jasmine.any(Object))
    })
  })

  describe('#clone', function(){
    var clone;
    
    beforeEach(function(){
      tetromino = new Tetromino([[0,0]], 'pink')
      clone     = tetromino.clone();
    })

    it('copies coordinates', function(){
      expect(clone.coordinates).toEqual([[0,0]])
    })

    it('copies color', function(){
      expect(clone.color).toEqual('pink')
    })

    it('doesnt return self', function(){
      expect(clone).not.toBe(tetromino)
    })
  })

  describe('#width', function(){
    it('returns 4 as width if it is 4 blocks wide', function(){
      tetromino = new Tetromino([[0,0], [1,0], [2,0], [3, 0]]) // xxxx
      expect(tetromino.width()).toEqual(4)
    })

    it('correctly calculates the width of 3 for a block with 2 levels', function(){
      tetromino = new Tetromino([[1,0], [2,0], [0,1], [1, 1]]) // oxx/xxo
      expect(tetromino.width()).toEqual(3)
    })
  })

  describe('#height', function(){
    it('returns 2 as height if its 2 row wide', function(){
      tetromino = new Tetromino([[0,0], [1,0], [1,0], [1, 1]]) // xx/xx
      expect(tetromino.height()).toEqual(2)
    })
  })

  describe('#rotateRight', function(){
    beforeEach(function(){
      tetromino = new Tetromino([[1,0], [2,0], [0,1], [1, 1]]) // oxx/xxo
      tetromino.rotateRight();
    })

    it('rotates the tetromino to the right', function(){
      // - X X
      // X X -

      // X -
      // X X
      // - X
      expect(tetromino.grid[0][0]).toBe(1);
      expect(tetromino.grid[0][1]).toBe(0);

      expect(tetromino.grid[1][0]).toBe(1);
      expect(tetromino.grid[1][1]).toBe(1);

      expect(tetromino.grid[2][0]).toBe(0);
      expect(tetromino.grid[2][1]).toBe(1);
    })

    it('updates the height', function(){
      expect(tetromino.height()).toBe(3);
    })

    it('updates the width', function(){
      expect(tetromino.width()).toBe(2);
    })
  })
});
