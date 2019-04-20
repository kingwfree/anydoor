const {extname} = require('path')

const mimeTypes = {
  'json':'application/json',
  'png':'image/png',
  'swf':'application/x-shockwave-flash',
  'txt':'text/plain',
  'wav':'audio/x-wav',
  'wma':'audio/x-ms-wma',
  'wmv':'video/x-ms-wmv',
  'xml':'text/xml',
  'js':'application/x-javascript',
  'gif':'image/gif',
  'jpeg':'image/jpeg',
  'jpg':'image/jpeg',
  'svg':'image/svg+xml',
  'tif':'image/tiff',
  'tiff':'image/tiff',
  'ico':'image/x-icon',
  'css':'text/css',
  'html':'text/html',
  'pdf':'application/pdf'
}

module.exports = (filePath) =>{
  let ext = extname(filePath).split('.').pop().toLowerCase()
  if(!ext){
    ext = filePath
  }
  return mimeTypes[ext] || mimeTypes['txt']

}











