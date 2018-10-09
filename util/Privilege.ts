import {RetCode, RetMsg} from "./RetStatus";
import ms from './ms';

import IMiddleware from "../interface/interface";
import * as express from "express";

class Privilege implements IMiddleware {
    handler(req: express.Request, res: express.Response, next: Function) {
        let cookie = req.cookies.isLogin;
        next();
        /* var userId = req.session.userId || "";
        let uri = req.url;
        
        //处理权限情况
        acl.isAllowed(userId, req.path, '*')
        .then(allowed => {
            if(allowed) {
                next()
            }else {
                res.json({
                  ret: RetCode.ERR_PRIVILEGE,
                  msg: RetMsg.ERR_PRIVILEGE
                });
                return;
            }
        })
        .catch((e) => {
            res.json({
                ret: RetCode.ERR_PRIVILEGE,
                msg: RetMsg.ERR_PRIVILEGE,
                subMsg: e.message
            })
            return
        }) */
    }
}

export default Privilege;