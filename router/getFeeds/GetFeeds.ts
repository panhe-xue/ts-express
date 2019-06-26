import * as express from "express";

import {RetCode, RetMsg} from "../../util/RetStatus";
import { GetBrandsDao } from "../../dao/getBrands/GetBrandsDao";
export  const route = express.Router();
import  UserLog from "../../dao/user/user_log";
import { isFalseExZero } from "../../util/util";

//日志打印
const userLog = new UserLog();
const getBrandsDao = new GetBrandsDao();
route.post('/getHasSubscribeFeeds', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;
        let openid = req.body.openid;
        let data = {};
        do {
            //参数校验
            if(!openid) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = '缺少openid';
                break;
            }
            console.log("checkData success!!");

            // 获取订阅brands数
            try {
                let allNum = await getBrandsDao.getHasSubscribeBrands(openid);
                data = allNum;
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }

            console.log("get User list FromDB success!!");
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