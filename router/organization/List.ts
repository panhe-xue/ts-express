import * as express from "express";

import {RetCode, RetMsg} from "../../util/RetStatus";
import {ListDao} from "../../dao/organization/ListDao";
export  const route = express.Router();

route.get('/organization/list', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let dataRows; //数据库用户情况
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;

        let page_info = {
            page_size: 0,
            page_now: 0,
            page_total: 0
        };

        let type_content = req.query; //刷选内容

        //分页参数
        let page_size = +req.query.page_size;
        let page_now = +req.query.page_now;
        let limitBegin = (page_now-1)*page_size; //分页的开始

        page_info.page_size = page_size;
        page_info.page_now = page_now;

        console.log('user info params:', page_size, page_now);
        do {
            var UserInfoInstance = new ListDao(type_content, limitBegin, page_size);
            let result = UserInfoInstance.checkData();
            //参数校验
            if(!result.status) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = result.msg;
                break;
            }
            console.log("checkData success!!");
            //数据库获取总条数
            try {
                let allNum = await UserInfoInstance.getAllNumFromDB();
                page_info.page_total = allNum;
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }

            //数据库获取数据
            try {
                dataRows = await UserInfoInstance.getUserInfoFromDB()
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
            page_info: page_info,
            subMsg: subMsg,
            data  : dataRows
        }
        //返回操作
        res.json(result);
        next();
    })()
});