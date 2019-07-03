/**
 * 封装的http请求需要完善
 */
var request = require('request');
import ms from "./ms";

/**
 * http get方法
 * @param options options
 */
export function httpGet(options):Promise<any> {
    ms.log.info('each http get arg:', "url", options.url, '.data:', options.data);
    return new Promise<any>((resolve, reject) => {
        request({
            timeout: 5000, //超时时间
            method: 'GET',
            url: options.url,
            qs: options.data ? options.data : null
        }, (error, response, body) => {
            ms.log.info('响应http GET response msg from request module::',error, response.headers, body)
            if(!error && response.statusCode === 200) {
                resolve(body)
            }else{
                reject(error)
            }
        })
    })
}

/**
 * http post方法
 * @param options options
 */
export function httpPost(options: any):Promise<any> {
    const header = {
        "cache-control": "no-cache",
        "Content-type": "application/json"
    }
    ms.log.info('each http POST arg:', "url", options.url, '.data:', options.data);
    return new Promise<any>((resolve, reject) => {
        request({
            timeout: 5000, //超时时间
            method: 'POST',
            url: options.url,
            json: true,
            headers: options.header ? options.header : header,
            form: options.data ? JSON.stringify(options.data) : null
        }, (error, response, body) => {
            ms.log.info('响应http POST response msg::', error, response.statusCode, response.headers, body);
            if(!error && response.statusCode === 200) {
                resolve(body)
            }else{
                reject(error)
            }
        })
    })
}

/**
 * request结合pipe保存文件
 * @param options options
 */
export function httpSaveFile(options: any, path: string, encoding?: string):Promise<any> {
    const header = {
        "cache-control": "no-cache",
        "Content-type": "application/json"
    }
    ms.log.info('each http POST arg:', "url", options.url, '.data:', options.data);
    return new Promise<any>((resolve, reject) => {
        request({
            timeout: 5000, //超时时间
            method: 'POST',
            url: options.url,
            json: true,
            headers: options.header ? options.header : header,
            form: options.data ? JSON.stringify(options.data) : null
        })
        .on("response", function(response) {
            ms.log.info("request 保存文件httpSaveFile result from request module::", response.headers, response.statusCode)
            if (response.statusCode === 200) {
                resolve(true)
            }
        })
        .on("error", function(error) {
            if(error) {
                reject(error);
            }
        })
        .pipe(ms.fs.createWriteStream(path), { encoding: encoding || "utf8" })
    })
}