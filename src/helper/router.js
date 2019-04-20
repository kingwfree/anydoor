const fs = require('fs')
const {join,basename,relative} = require('path')
const {promisify} = require('util')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config  = require('../config/defaultConfig')
const pug = require('pug')
const pugPath = join(__dirname,'../views/template.pug')
const source = fs.readFileSync(pugPath)
const template = pug.compile(source.toString())
const mime = require('./mime')

module.exports = async function (req,res,filePath) {
  try{
    const stats =await stat(filePath)
    if(stats.isFile()){
      const contentType = mime(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type',contentType)
      fs.createReadStream(filePath).pipe(res);
    }else if(stats.isDirectory()){
      const files =await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type','text/html')
      const dir = relative(config.root,filePath)
      const data = {
        files:files.map(file=>({
          file,
          icon:mime(file)
        })),
        dir:dir?`/${dir}`:'',
        title:basename(filePath)
      }
      res.end(template(data))
    }
  }catch(err){
    if(err){
      console.error(err)
      res.statusCode = 404;
      res.setHeader('Content-Type','text/plain');
      res.end(`${filePath} is not a directory or file`);
      return;
    }
  }
}
