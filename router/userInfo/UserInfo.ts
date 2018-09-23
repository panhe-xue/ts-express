import * as express from "express";

import {RetCode, RetMsg} from "../../util/RetStatus";
import LoginDao from "../../dao/LoginDao";
export  const route = express.Router();

route.post('/useradmin/userlist', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let dataRows; //数据库用户情况
        let user_info; //人员的基本信息
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string = RetMsg.SUC_OK;

        let username = req.body.username;
        let password = req.body.password;
        console.log('user login params:', username, password);
        do {
            
        } while (false)

        let result = {
            status: ret,
            msg   : msg,
            subMsg: subMsg,
            user_info  : user_info
        }
        //返回操作
        res.json(result);
        next();
    })()
});