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
});
