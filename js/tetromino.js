function Tetromino(coordinates, color){
  this.coordinates = coordinates;
  this.color       = color || 'black';

  this._initializeGrid();
}

// Instance methods
function makeSVG(tag, attrs) {
  var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (var k in attrs)
    el.setAttribute(k, attrs[k]);
  return el;
}


Tetromino.prototype = {
  toSVG: function(){
    var svgNS = "http://www.w3.org/2000/svg";
    var svg   = makeSVG('svg', { xmlns: svgNS, version: '1.1' })
    var i     = 0;
    var point = null;
    var rect  = null;
    var attrs = null;


    for(; i < this.coordinates.length; ++i){
      point = this.coordinates[i];

      attrs = {
        x:      point[0] * Tetromino.BLOCK_SIZE,
        y:      point[1] * Tetromino.BLOCK_SIZE, 
        style:  "fill:blue;stroke:black;stroke-width:5",
        width:  Tetromino.BLOCK_SIZE,
        height: Tetromino.BLOCK_SIZE
      }

      rect = makeSVG('rect', attrs);

      svg.appendChild(rect);
    }

    return svg;
  },

  clone: function(){
    return new Tetromino(_.clone(this.coordinates), this.color);
  },

  width: function(){
    return this.grid[0].length
  },

  _initializeGrid: function(){
    var i        = 0,
        j        = 0
        point    = null,
        currentY = null,
        maxX     = 0

    this.grid = [];

    // Fill 1s where there is
    // a block
    for ( ; i < this.coordinates.length; ++i) {
      point = this.coordinates[i];
      
      // when currentY changes we need
      // to introduce a new row
      if( currentY != point[1] ){      
        currentY = point[1]
        this.grid[currentY] = []
      }

      this.grid[currentY][point[0]] = 1;

      if(maxX < point[0])
        maxX = point[0]
    }

    // Fill 0s when there is no block
    for (i = 0; i < this.grid.length; ++i)
      for (j = 0; j < maxX + 1; ++j)
        if ( this.grid[i][j] != 1 )
          this.grid[i][j] = 0
 },
}

// Class constants
Tetromino.BLOCK_SIZE = 50

// Class methods
Tetromino.all = [
  new Tetromino([[0,0], [1,0], [2,0], [3, 0]]), // xxxx
  new Tetromino([[0,0], [0,1], [1,1], [2, 1]]), // xoo/xxx
  new Tetromino([[2,0], [0,1], [1,1], [2, 1]]), // oox/xxx
  new Tetromino([[0,0], [1,0], [1,0], [1, 1]]), // xx/xx
  new Tetromino([[1,0], [2,0], [0,1], [1, 1]]), // oxx/xxo
  new Tetromino([[1,0], [0,1], [1,1], [2, 1]]), // oxo/xxx
  new Tetromino([[0,0], [1,0], [1,1], [2, 1]])  // xxo/oxx
]

Tetromino.random = function(){
  return Tetromino.all[_.random(Tetromino.all.length - 1)].clone();
}
