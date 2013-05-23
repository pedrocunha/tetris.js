describe('Tetromino', function() {
  var tretomino;

  describe('#new', function(){
    beforeEach(function() {
      // oxx/xxo
      tretomino = new Tetromino([[1,0], [2,0], [0,1], [1, 1]]);
    });

    it('allows access to its composition', function(){
      expect(tretomino.coordinates).toBeDefined();
    });

    it('sets a default color', function(){
      expect(tretomino.color).toEqual('black')
    })

    it('initializes a grid with 2 rows and 3 columns', function(){
      expect(tretomino.grid[0].length).toEqual(3)
      expect(tretomino.grid[1].length).toEqual(3)
      expect(tretomino.grid.length).toEqual(2)
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

  describe('#toSVG', function(){
    var svg;

    beforeEach(function(){
      svg = Tetromino.all[0].toSVG();
    })

    it('returns a svg with the correct namespace', function(){
      expect($(svg).attr('xmlns')).toEqual("http://www.w3.org/2000/svg")
    })

    it('returns a svg with 4 rect elements', function(){
      var els = _.map($(svg).children(), function(i){ return i.tagName })
      expect(els).toEqual(['rect','rect','rect','rect'])
    })
  })


  describe('#width', function(){
    it('returns 4 as width if it is 4 blocks wide', function(){
      tetromino = new Tetromino([[0,0], [1,0], [2,0], [3, 0]]), // xxxx
      expect(tetromino.width()).toEqual(4)
    })

    it('correctly calculates the width of 3 for a block with 2 levels', function(){
      tetromino = new Tetromino([[1,0], [2,0], [0,1], [1, 1]]), // oxx/xxo
      expect(tetromino.width()).toEqual(3)
    })
  })

  describe ('#height', function(){
    it('returns 2 as height if its 2 row wide', function(){
      tetromino = new Tetromino([[0,0], [1,0], [1,0], [1, 1]]), // xx/xx
      expect(tetromino.height()).toEqual(2)
    })
  })
});
