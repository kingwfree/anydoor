const {createGzip,createDeflate} = require('zlib')

module.exports = (rs,req,res)=>{
  //查看浏览器支持什么压缩方式
  const acceptEncoding = req.headers['accept-encoding']
  if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
    return rs;
  }else if(acceptEncoding.match(/\bgzip\b/)){
    res.setHeader('Content-Encoding','gzip')
    return rs.pipe(createGzip())
  }else if(acceptEncoding.match(/\bdeflate\b/)){
    res.setHeader('Content-Encoding','deflate')
    return rs.pipe(createDeflate())
  }
}
