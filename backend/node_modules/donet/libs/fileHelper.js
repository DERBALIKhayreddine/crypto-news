var fs = require('fs')
var stat = fs.stat
var _PATH_ = require('path')
var makeArray = require('make-array')

module.exports = fileHelper = {
  copyFile: function(src, dst, middleware){
    fs.readFile(src, function(err, data){
      if(err) throw err
      if(middleware){
        data = middleware(src, data);
      }
      fs.writeFile(dst, data)
    })
  },
  copyDir: function(src, dst, middleware){
    // 创建目的目录
    fileHelper.mkdirs(dst)

    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
      if( err ){
        throw err;
      }
      paths.forEach(function( path ){
        var _src = src + '/' + path,
          _dst = dst + '/' + path,
          readable, writable;
        stat( _src, function( err, st ){
          if( err ){
            throw err;
          }
          // 判断是否为文件
          if( st.isFile() ){
            fileHelper.copyFile(_src, _dst, middleware)
          }
          // 如果是目录则递归调用自身
          else if( st.isDirectory() ){
            fileHelper.exists( _src, _dst, fileHelper.copyDir, middleware);
          }
        });
      });
    });
  },

  exists: function(src, dst, callback, middleware){
    fs.exists( dst, function( exists ){
      // 已存在
      if( exists ){
        callback( src, dst, middleware );
      }
      // 不存在
      else{
        fs.mkdir( dst, function(){
          callback( src, dst, middleware );
        });
      }
    });
  },

  getDir: function(dir){
    var dirs = [];
    var paths = fs.readdirSync(dir);
    paths.forEach(function(_path){
      var st = fs.statSync(_PATH_.join(dir, _path));
      if(st.isDirectory()){
        dirs.push(_path);
      }
    });
    return dirs;
  },

  mkdirs: function(dir){

    dir = _PATH_.resolve(dir);

    if (fs.existsSync(dir)) {
        if (fs.statSync(dir).isDirectory()) {
            return;
        }
        throw new Error("Not a directory: " + dir);
    }
    var i = dir.lastIndexOf(_PATH_.sep);
    if (i < 0) {
        throw new Error("No parent directory: " + dir);
    }
    fileHelper.mkdirs(dir.substring(0, i));
    fs.mkdirSync(dir);
  }
}
