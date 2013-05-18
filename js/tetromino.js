function Tetromino(coordinates, color){
  this.coordinates = coordinates;
  this.color       = color || 'black';

  // Game size will be 500px
  this.BLOCK_SIZE  = 50 // in px
}

// Class methods
Tetromino.all = [
  new Tetromino([[0,0], [1,0], [2,0], [3, 0]]), // xxxx
  new Tetromino([[0,0], [0,1], [1,1], [2, 1]]), // xoo/xxx
  new Tetromino([[0,2], [0,1], [1,1], [2, 1]]), // xxJ
  new Tetromino([[0,0], [1,0], [1,0], [1, 1]]), // xx
  new Tetromino([[1,0], [2,0], [0,1], [1, 1]]), // oxx/xxo
  new Tetromino([[1,0], [0,1], [1,1], [2, 1]]), // oxo/xxx
  new Tetromino([[0,0], [1,0], [1,1], [1, 2]])  // xxo/oxx
]

Tetromino.random = function(){
  return Tetromino.all[_.random(Tetromino.all.length - 1)]
}

// Instance methods
function makeSVG(tag, attrs) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (var k in attrs)
    el.setAttribute(k, attrs[k]);
  return el;
}


Tetromino.prototype.toSVG = function(){
  var svgNS = "http://www.w3.org/2000/svg";
  var svg   =  makeSVG('svg', { xmlns: svgNS, version: '1.1' })
  var i     = 0;
  var point = null;
  var rect  = null;
  var attrs = null;


  for(; i < this.coordinates.length; ++i){
    point = this.coordinates[i];

    attrs = {
      x:      point[0] * this.BLOCK_SIZE,
      y:      point[1] * this.BLOCK_SIZE, 
      style:  "fill:blue;stroke:black;stroke-width:5",
      width:  this.BLOCK_SIZE,
      height: this.BLOCK_SIZE
    }

    rect = makeSVG('rect', attrs);

    svg.appendChild(rect);
  }

  return svg;
}
