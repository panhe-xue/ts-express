// import * as path from "path";

export default {
    appData: {
        appId: 'wx27044477f9e515dd',  //appid
        appSecret: '76e5cc6f9508507de3e71b54dc5df76c' //appSecret
    },
    code2SessionUrl: 'https://api.weixin.qq.com/sns/jscode2session',  //小程序登录地址
    autoGetAccessTokenUrl: "https://api.weixin.qq.com/cgi-bin/token", // 获取调用凭据 access_token
    wxacodeUrl: "https://api.weixin.qq.com/wxa/getwxacode",  //获取小程序码
    dev: {
        wxacodePath: __dirname + '/../../../otherNotCode/wxacode/',
        databasePath: 'http://panhe.free.idcfengye.com/wxacode/'
    },
    prod: {
        wxacodePath: "/home/static/images/wxacode/",
        databasePath: "https://www.sibaixue.com/images/wxacode/"
    }
}