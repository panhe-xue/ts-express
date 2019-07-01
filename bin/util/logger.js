"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loggers = require('../config/log');
console.log(loggers, 'aaaaaaaaa');
var logger = loggers.getLogger(); //根据需要获取logger,如在getLogger里加err或oth,就会在设置的文件里添加信息，这里取默认default
// 日志等级 trace<debug<info<warn<error<fatal<mark
var errlogger = loggers.getLogger('err');
var othlogger = loggers.getLogger('oth');
exports.default = {
    debug: logger.debug.bind(logger),
    info: othlogger.info.bind(othlogger),
    warn: othlogger.warn.bind(othlogger),
    error: errlogger.error.bind(errlogger),
    fatal: errlogger.fatal.bind(errlogger),
};
//# sourceMappingURL=logger.js.map