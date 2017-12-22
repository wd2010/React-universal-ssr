const ignore=()=> {
  var extensions = ['.css', '.scss','.less','.png','.jpg','.gif']; //服务端渲染不加载的文件类型
  for (let i = 0, len = extensions.length; i < len; i++) {
    require.extensions[extensions[i]] = function () {
      return false;
    };
  }
}
module.exports = ignore;