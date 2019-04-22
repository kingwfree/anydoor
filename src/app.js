const http = require('http')
const chalk = require('chalk')
const conf  = require('./config/defaultConfig')
const {join} = require('path')
const router = require('./helper/router')
const openUrl = require('./helper/open')

class Server{
  constructor(config){
    this.conf = Object.assign({},conf,config)
  }
  start(){
    const server = http.createServer((req,res)=>{
      const filePath = join(this.conf.root,req.url)
      router(req,res,filePath,this.conf)

      // fs.stat(filePath,(err,stats)=>{
      //   if(err){
      //     res.statusCode = 404;
      //     res.setHeader('Content-Type','text/plain');
      //     res.end(`${filePath} is not a directory or file`);
      //     return;
      //   }
      //   if(stats.isFile()){
      //     res.statusCode = 200
      //     res.setHeader('Content-Type','text/plain')
      //     fs.createReadStream(filePath).pipe(res);
      //   }else if(stats.isDirectory()){
      //     fs.readdir(filePath,(err,files)=>{
      //       res.statusCode = 200
      //       res.setHeader('Content-Type','text/plain')
      //       res.end(files.join(','))
      //     })
      //   }
      // })
    })
    server.listen(this.conf.port,this.conf.hostname,()=>{
      const addr = `http://${this.conf.hostname}:${this.conf.port}`
      console.info(`Server started at ${chalk.green(addr)}`)
      openUrl(addr)
    })
  }
}

module.exports = Server
