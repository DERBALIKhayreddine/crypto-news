var fs = require('fs')
var fileHelper = require('./libs/fileHelper.js')
var _path_ = require('path')

function deploy(dest){

   fileHelper.copyDir(__dirname + '/libs/donet-route', dest);

   fileHelper.copyDir('./views', dest + '/Views', function(viewPath, data){
     var viewBagPath = viewPath.replace(/\/views\//, '/test/viewbag/').replace(/\.\w+$/, '.viewbag')
     if(fs.existsSync(viewBagPath)){
       var viewbag = fs.readFileSync(viewBagPath)
       return '\ufeff' + String(data).replace(/^/, function($){
         return '@{\n' + viewbag + '}\n'
       })
     }else{
       return '\ufeff' + String(data);
     }
   })

   fileHelper.copyDir('./static', dest + '/static')

   fileHelper.copyDir('./test/async', dest + '/async')

}

module.exports = deploy;
