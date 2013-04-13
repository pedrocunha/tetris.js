describe("Tretomino", function() {
  var tretomino;

  beforeEach(function() {
    tretomino = new Tretomino([]);
  });

  it("allows access to its composition", function(){
    expect(tretomino.coordinates).toEqual([])
  });

  describe(".all", function(){
    it("has all 7 combinations", function(){
      expect(Tretomino.all.length).toEqual(7)
    })
  });

  describe(".random", function(){
    it("returns a random Tretomino", function(){
      expect(Tretomino.random()).toEqual(jasmine.any(Object))
    })
  })

  describe("#toSVG", function(){
    var svg;

    beforeEach(function(){
      svg = Tretomino.all[0].toSVG();
    })

    it("returns a svg with the correct namespace", function(){
      expect($(svg).attr("xmlns")).toEqual("http://www.w3.org/2000/svg")
    })

    it("returns a svg with 4 rect elements", function(){
      var els = _.map($(svg).children(), function(i){ return i.tagName })
      expect(els).toEqual(['rect','rect','rect','rect'])
    })
  })
});
