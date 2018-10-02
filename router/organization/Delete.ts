import * as express from "express";

import {RetCode, RetMsg} from "../../util/RetStatus";
import {OrganizationDeleteDao} from "../../dao/organization/DeleteDao";
export  const route = express.Router();

route.get('/organization/delete', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let dataRows; //数据库用户情况
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string = RetMsg.SUC_OK;

        let id = req.query.id; //筛选条件

        console.log('user login params:', id);
        do {
            var DelInstance = new OrganizationDeleteDao(id);
            //参数校验
            if(!DelInstance.checkData()) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = "参数出错";
                break;
            }
            console.log("checkData success!!");

            //数据库获取数据
            try {
                dataRows = await DelInstance.doDel()
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }
            console.log("delete User FromDB success!!");
        } while (false)

        let result = {
            status: ret,
            msg   : msg,
            subMsg: subMsg
        }
        //返回操作
        res.json(result);
        next();
    })()
});