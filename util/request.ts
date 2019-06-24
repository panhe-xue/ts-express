/**
 * 封装的http请求需要完善
 */
var request = require('request');

export function httpGet(options):Promise<object> {
    console.log('each http get arg:', "url", options.url, '.data:', options.data);
    return new Promise<object>((resolve, reject) => {
        request({
            timeout: 5000, //超时时间
            method: 'GET',
            url: options.url,
            qs: options.data ? options.data : null
        }, (error, response, body) => {
            console.log('响应http GET response msg::',error, response.statusCode, body)
            if(!error && response.statusCode === 200) {
                resolve(body)
            }else{
                reject(error)
            }
        })
    })
}