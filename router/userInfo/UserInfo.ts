import * as express from "express";

import {RetCode, RetMsg} from "../../util/RetStatus";
import {UserInfoDao, UserInfoDeleteDao} from "../../dao/UserInfoDao";
export  const route = express.Router();

route.post('/useradmin/userlist', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let dataRows; //数据库用户情况
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string = RetMsg.SUC_OK;

        let type = req.query.type; //筛选条件
        let type_content = req.query.type_content; //刷选内容

        //分页参数
        let page_size = req.query.page_size;
        let page_now = req.query.page_now;
        let limitBegin = (page_now-1)*page_size; //分页的开始

        console.log('user info params:', req.query, req.query, type, type_content, page_size, page_now);
        do {
            var UserInfoInstance = new UserInfoDao(type, type_content, limitBegin, page_size);
            //参数校验
            if(!UserInfoInstance.checkData()) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = "参数出错";
                break;
            }
            console.log("checkData success!!");
            
            //数据库获取数据
            try {
                dataRows = await UserInfoInstance.getUserInfoFromDB()
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }
            console.log("getUserFromDB success!!");    
        } while (false)

        let result = {
            status: ret,
            msg   : msg,
            subMsg: subMsg,
            data  : dataRows
        }
        //返回操作
        res.json(result);
        next();
    })()
});

route.get('/useradmin/delete', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let dataRows; //数据库用户情况
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string = RetMsg.SUC_OK;

        let id = req.query.id; //筛选条件
     

        console.log('user login params:', id);
        do {
            var UserInfoDelInstance = new UserInfoDeleteDao(id);
            //参数校验
            if(!UserInfoDelInstance.checkData()) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = "参数出错";
                break;
            }
            console.log("checkData success!!");
            
            //数据库获取数据
            try {
                dataRows = await UserInfoDelInstance.doDel()
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }
            console.log("getUserFromDB success!!");    
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