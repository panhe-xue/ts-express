import * as express from "express";
import {RetCode, RetMsg} from "../../util/RetStatus";
// import LoginDao from "../../dao/login/LoginDao";
import { httpGet } from "../../util/request";
import globalData from '../../lib/globalData';
export  const route = express.Router();
// var LoginInstance = new LoginDao();
var log = require('log4js').getLogger("login");

route.post('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string = RetMsg.SUC_OK;
        let data;
        let code = req.body.code;
        log.debug('user login request args.........:', code)
        do {
            const options: object = {
                url: globalData.code2SessionUrl,
                data: {
                    appid: globalData.appData.appId,
                    secret: globalData.appData.appSecret,
                    js_code: code
                }
            }
            try {
                data = await httpGet(options);
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error
            }
        } while (false)

        let result = {
            status: ret,
            msg   : msg,
            subMsg: subMsg,
            data  : data
        }
        //返回操作
        res.json(result);
        next();
    })()
});