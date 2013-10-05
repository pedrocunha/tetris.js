var fs = require('fs');
var vm = require('vm');

function include(path) {
  var code = fs.readFileSync(path, 'utf-8');
  vm.runInThisContext(code, path);
}

include('./js/underscore.min.js');
include('./js/game.js');
include('./js/tetromino.js');
