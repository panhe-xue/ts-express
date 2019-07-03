"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 封装的http请求需要完善
 */
var request = require('request');
var ms_1 = require("./ms");
/**
 * http get方法
 * @param options options
 */
function httpGet(options) {
    ms_1.default.log.info('each http get arg:', "url", options.url, '.data:', options.data);
    return new Promise(function (resolve, reject) {
        request({
            timeout: 5000,
            method: 'GET',
            url: options.url,
            qs: options.data ? options.data : null
        }, function (error, response, body) {
            ms_1.default.log.info('响应http GET response msg from request module::', error, response.headers, body);
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
/**
 * http post方法
 * @param options options
 */
function httpPost(options) {
    var header = {
        "cache-control": "no-cache",
        "Content-type": "application/json"
    };
    ms_1.default.log.info('each http POST arg:', "url", options.url, '.data:', options.data);
    return new Promise(function (resolve, reject) {
        request({
            timeout: 5000,
            method: 'POST',
            url: options.url,
            json: true,
            headers: options.header ? options.header : header,
            form: options.data ? JSON.stringify(options.data) : null
        }, function (error, response, body) {
            ms_1.default.log.info('响应http POST response msg::', error, response.statusCode, response.headers, body);
            if (!error && response.statusCode === 200) {
                resolve(body);
            }
            else {
                reject(error);
            }
        });
    });
}
exports.httpPost = httpPost;
/**
 * request结合pipe保存文件
 * @param options options
 */
function httpSaveFile(options, path, encoding) {
    var header = {
        "cache-control": "no-cache",
        "Content-type": "application/json"
    };
    ms_1.default.log.info('each http POST arg:', "url", options.url, '.data:', options.data);
    return new Promise(function (resolve, reject) {
        request({
            timeout: 5000,
            method: 'POST',
            url: options.url,
            json: true,
            headers: options.header ? options.header : header,
            form: options.data ? JSON.stringify(options.data) : null
        })
            .on("response", function (response) {
            ms_1.default.log.info("request 保存文件httpSaveFile result from request module::", response.headers, response.statusCode);
            if (response.statusCode === 200) {
                resolve(true);
            }
        })
            .on("error", function (error) {
            if (error) {
                reject(error);
            }
        })
            .pipe(ms_1.default.fs.createWriteStream(path), { encoding: encoding || "utf8" });
    });
}
exports.httpSaveFile = httpSaveFile;
//# sourceMappingURL=request.js.map