import {RetCode, RetMsg} from "./RetStatus";
import ms from './ms';

import IMiddleware from "../interface/interface";
import * as express from "express";

class LoginCheck implements IMiddleware {
    handler(req: express.Request, res: express.Response, next: Function) {
        //处理登陆情况
        if(ms.loginIgnore) {
            next();
        }
    }
}

export default LoginCheck;