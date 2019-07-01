"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 封装的http请求需要完善
 */
var request = require('request');
var ms_1 = require("./ms");
function httpGet(options) {
    ms_1.default.log.info('each http get arg:', "url", options.url, '.data:', options.data);
    return new Promise(function (resolve, reject) {
        request({
            timeout: 5000,
            method: 'GET',
            url: options.url,
            qs: options.data ? options.data : null
        }, function (error, response, body) {
            ms_1.default.log.info('响应http GET response msg::', error, response.statusCode, body);
            if (!error && response.statusCode === 200) {
                resolve(body);
            }
            else {
                reject(error);
            }
        });
    });
}
exports.httpGet = httpGet;
//# sourceMappingURL=request.js.map