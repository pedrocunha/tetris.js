function Tretomino(coordinates){
  this.coordinates = coordinates;
}

Tretomino.all = [
  new Tretomino([[0,0], [1,0], [2,0], [3, 0]]), // xxxx
  new Tretomino([[0,0], [0,1], [1,1], [2, 1]]), // Lxx
  new Tretomino([[0,2], [0,1], [1,1], [2, 1]]), // xxJ
  new Tretomino([[0,0], [1,0], [1,0], [1, 1]]), // xx
  new Tretomino([[1,0], [2,0], [0,1], [1, 1]]), // oxx/xxo
  new Tretomino([[1,0], [0,1], [1,1], [2, 1]]), // oxo/xxx
  new Tretomino([[0,0], [1,0], [1,1], [1, 2]]) // xxo/oxx
]

Tretomino.random = function(){
  return Tretomino.all[_.random(Tretomino.all.length - 1)]
}
