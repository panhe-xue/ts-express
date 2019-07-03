import * as express from "express";
import {RetCode, RetMsg} from "../../util/RetStatus";
import LoginDao from "../../dao/login/LoginDao";
import UserSubscribe from "../../dao/user/user_subscribe";
import { httpGet } from "../../util/request";
import globalData from '../../config/globalData';
export  const route = express.Router();
const LoginInstance = new LoginDao();
import ms from "../../util/ms";

// 用户订阅
const userSubscribe = new UserSubscribe();

route.post('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string = RetMsg.SUC_OK;
        let data;
        let code = req.body.code;
        ms.log.info('user login request args.........:', code)
        do {
            if(!LoginInstance.checkData(code)) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = '缺少code'
                break;
            }
            const options: object = {
                url: globalData.code2SessionUrl,
                data: {
                    appid: globalData.appData.appId,
                    secret: globalData.appData.appSecret,
                    js_code: code
                }
            }
            try {
                //获取openid
                data = await httpGet(options);
                data = JSON.parse(data);
                if(data.errcode) {
                    ret = RetCode.ERR_SERVER_EXCEPTION;
                    msg = RetMsg.ERR_SERVER_EXCEPTION;
                    subMsg = data.errmsg;
                    break;
                }
                // 查询user表
                const user = await LoginInstance.getOpenid(data.openid);

                //新用户
                if(user.length === 0) {
                    // 新用户插入用户表
                    // 产生一条登录日志
                    // 默认订阅--新生事物(默认id=1)
                    await Promise.all([ LoginInstance.InsertOpenid(data.openid), userSubscribe.subscribeBrands(data.openid, 1)])
                }
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
            openid  : (data && data.openid) || ''
        }
        //返回操作
        res.json(result);
    })()
});