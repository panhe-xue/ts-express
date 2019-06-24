import {RetCode, RetMsg} from "../util/RetStatus";
import ms from '../util/ms';

import IMiddleware from "../interface/interface";
import * as express from "express";

class LoginCheck implements IMiddleware {
    handler(req: express.Request, res: express.Response, next: Function) {
        let cookie = req.cookies.isLogin;
        let uri = req.url;
        //处理登陆情况
        if(ms.loginIgnore || cookie || uri == "/login") { //不处理登陆
            next();
        }else{ //处理登陆
            res.json({
                ret: -2,
                msg: RetMsg.ERR_FORBIDDEN
            })
            return
        }
    }
}

export default LoginCheck;