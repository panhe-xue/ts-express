import * as express from "express";
import ms from "../util/ms";
import {RetCode, RetMsg} from "../util/RetStatus";
import LoginDao from "../dao/LoginDao";
export  const route = express.Router();

route.post('/login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let dataRows; //数据库用户情况
        let user_info; //人员的基本信息
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;

        let username = req.body.username;
        let password = req.body.password;
        do {
            var LoginInstance = new LoginDao(username, password);
            //参数校验
            if(!LoginInstance.checkData()) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                break;
            }
            console.log("checkData success!!");
            //数据库获取数据
            try {
                dataRows = await LoginInstance.getUserFromDB();
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
            }
            
            if(!dataRows) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                break;
            }
            console.log("getUserFromDB success!!");

            if(dataRows.length == 0) {
                ret = -1;
                msg = "用户名不存在"
                break;
            }
            console.log("user have one more in db!!");

            if(dataRows[0].password != password) {
                ret = -2;
                msg = "密码错误";
                break;
            }
            console.log("check Login over success!!");

            //设置cookie
            res.cookie("user_name", username);
            //获取基本信息
            try {
                user_info = await LoginInstance.getUserInfo(dataRows[0].id_card);
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
            }
        } while (false)

        //返回数据
        let result = {
            status: ret,
            msg   : msg,
            user_info  : user_info
        }
        //返回操作
        res.json(result);
        next();
    })()
});