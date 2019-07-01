var log4js = require('log4js');
var basePath = __dirname + '/../../../logs/';
var reqPath = basePath + 'reqlogs/reqlogs';
var errPath = basePath + 'errlogs/errlogs';
var othPath = basePath + 'othlogs/othlogs';
log4js.configure({
    replaceConsole: true,
    appenders: {
        stdout: {
            type: 'stdout'
        },
        req: {
            type: 'dateFile',
            filename: reqPath,
            pattern: 'req-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        err: {
            type: 'dateFile',
            filename: errPath,
            pattern: 'err-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        oth: {
            type: 'dateFile',
            filename: othPath,
            pattern: 'oth-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: { appenders: ['stdout', 'req'], level: 'debug' },
        err: { appenders: ['stdout', 'err'], level: 'error' },
        oth: { appenders: ['stdout', 'oth'], level: 'info' }
    }
});
exports.getLogger = function (name) {
    return log4js.getLogger(name || 'default');
};
exports.useLogger = function (app, logger) {
    app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
        format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent：wzb]' //自定义输出格式
    }));
    /*
      如果不是express是原生node,可以 return log4js.connectLogger(logger || log4js.getLogger('default'), {
          format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent：作者：小本]'//自定义输出格式
      });
      在原生node对应路由里 log4js.useLogger(null, null)(req, res, function () {
          这里写你该路由的处理并返回什么数据
      });
    */
};
//# sourceMappingURL=log.js.map