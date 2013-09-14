function Tetromino(coordinates, color){
  this.coordinates = coordinates;
  this.color       = color || '#FFFFFF';
  this.grid        = [];

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

  rotateRight: function(commit){
    var i       = this.grid.length - 1,
        j       = 0,
        newGrid = [];

    for ( ; i >= 0; --i ) {
      for ( var j = 0; j < this.grid[i].length; ++j ) {
        if ( newGrid[j] == null ) newGrid[j] = [];
        newGrid[j][this.grid.length - 1 - i] = this.grid[i][j];
      }
    }

    if ( commit === undefined || commit === true )
      this.grid = newGrid;

    return newGrid;
  },

  _initializeGrid: function(){
    var i        = 0,
        j        = 0
        point    = null,
        currentY = null,
        maxX     = 0

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
  new Tetromino([[0,0], [1,0], [2,0], [3, 0]], '#e33100'), // xxxx
  new Tetromino([[0,0], [0,1], [1,1], [2, 1]], '#2daebf'), // xoo/xxx 
  new Tetromino([[2,0], [0,1], [1,1], [2, 1]], '#FFC740'), // oox/xxx 
  new Tetromino([[0,0], [1,0], [0,1], [1, 1]], '#FF6C00'), // xx/xx  orange
  new Tetromino([[1,0], [2,0], [0,1], [1, 1]], '#00B64F'), // oxx/xxo green
  new Tetromino([[1,0], [0,1], [1,1], [2, 1]], '#36BBCE'), // oxo/xxx blue
  new Tetromino([[0,0], [1,0], [1,1], [2, 1]], '#FFEE40')  // xxo/oxx yellow
]

Tetromino.random = function(){
  return Tetromino.all[_.random(Tetromino.all.length - 1)].clone();
}
