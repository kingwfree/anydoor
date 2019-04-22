const {cache} = require('../config/defaultConfig')
function refreshRes(stats,res) {
  const {maxAge,expires,cacheControl,lastModified,etag} = cache
  if(expires){
    res.setHeader('Expires',(new Date(Date.now()+maxAge*1000)).toUTCString())
  }
  if(cacheControl){
    res.setHeader('Cache-Control',`public,max-age=${maxAge}`)
  }
  if(lastModified){
    res.setHeader('Last-Modified',stats.mtime.toUTCString())
  }
  if(etag){
    res.setHeader('ETag',`${stats.size}-${stats.mtime}`)
  }
}
module.exports = function isFresh(stats,req,res){
  refreshRes(stats,res)
  const lastModified = req.headers['if-modified-since']
  const etag = req.headers['if-none-match']
  //如果lastModified和etag这两个信息客户端都没有给我们则说明

  //是第一次请求
  if(!lastModified && !etag){
    return false;
  }

  //失效
  if(lastModified && lastModified !== res.getHeader('Last-Modified')){
    return false;
  }
  if(etag && etag !== res.getHeader('ETag')){
    return false;
  }

  return true;
}