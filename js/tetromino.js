function Tetromino(coordinates, color){
  this.coordinates = coordinates;
  this.color       = color || '#FFFFFF';

  this._initializeGrid();
}

Tetromino.prototype = {

  clone: function(){
    return new Tetromino(_.clone(this.coordinates), this.color);
  },

  width: function(){
    return this.grid[0].length
  },

  height: function(){
    return this.grid.length
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

// Class methods
Tetromino.all = [
  new Tetromino([[0,0], [1,0], [2,0], [3, 0]], 'rgb(255, 173, 0)'), // xxxx
  new Tetromino([[0,0], [0,1], [1,1], [2, 1]], 'rgb(0, 255, 214)'), // xoo/xxx
  new Tetromino([[2,0], [0,1], [1,1], [2, 1]], 'rgb(0, 92, 255)'), // oox/xxx
  new Tetromino([[0,0], [1,0], [0,1], [1, 1]], 'rgb(255, 0, 61)'), // xx/xx
  new Tetromino([[1,0], [2,0], [0,1], [1, 1]], 'rgb(245, 255, 0)'), // oxx/xxo
  new Tetromino([[1,0], [0,1], [1,1], [2, 1]], 'rgb(61, 255, 0)'), // oxo/xxx
  new Tetromino([[0,0], [1,0], [1,1], [2, 1]], 'rgb(122, 255, 0)')  // xxo/oxx
]

Tetromino.random = function(){
  return Tetromino.all[_.random(Tetromino.all.length - 1)].clone();
}
