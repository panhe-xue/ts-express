const log4js = require('log4js');

var basePath = __dirname + '/../../../logs/';
var reqPath = basePath + 'reqlogs/reqlogs';
var errPath = basePath + 'errlogs/errlogs';
var othPath = basePath + 'othlogs/othlogs';

log4js.configure({
 replaceConsole: true,
 appenders: {
  stdout: {//控制台输出
   type: 'stdout'
  },
  req: {//请求日志
   type: 'dateFile',
   filename: reqPath,//和pattern拼接组成的文件
   pattern: 'req-yyyy-MM-dd.log',
   alwaysIncludePattern: true
  },
  err: {//错误日志
   type: 'dateFile',
   filename: errPath,
   pattern: 'err-yyyy-MM-dd.log',
   alwaysIncludePattern: true
  },
  oth: {//其他日志
   type: 'dateFile',
   filename: othPath,
   pattern: 'oth-yyyy-MM-dd.log',
   alwaysIncludePattern: true
  }
 },
 categories: {
  default: { appenders: ['stdout', 'req'], level: 'debug' },//appenders:采用的appender,取appenders项,level:设置级别
  err: { appenders: ['stdout', 'err'], level: 'error' },
  oth: { appenders: ['stdout', 'oth'], level: 'info' }
 }
})

exports.getLogger = function (name) {//name取categories项
 return log4js.getLogger(name || 'default')
}

exports.useLogger = function (app, logger) {//用来与express结合
 app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
  format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent：wzb]'//自定义输出格式
 }))
  /*
    如果不是express是原生node,可以 return log4js.connectLogger(logger || log4js.getLogger('default'), {
        format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent：作者：小本]'//自定义输出格式
    });
    在原生node对应路由里 log4js.useLogger(null, null)(req, res, function () {
        这里写你该路由的处理并返回什么数据
    });
  */
}