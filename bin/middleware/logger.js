"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log4js = require('log4js');
log4js.configure({
    levels: {
        'log_file': 'info'
    },
    appenders: [
        {
            type: 'dateFile',
            filename: __dirname + '../logs/logger',
            compress: false,
            pattern: '-yyyy-MM-dd.log',
            encoding: 'utf-8',
            category: 'log_date'
        }
    ],
    replaceConsole: true
});
exports.default = log4js.getLogger('log_date');
//# sourceMappingURL=logger.js.map