/// <reference path="../../typings/index.d.ts" />

import * as express from "express";
import * as path from "path";
import {RetCode, RetMsg} from "../../util/RetStatus";
import {AddUpdateUserInfoDao, TurnTool} from "../../dao/userinfo/AddUpdateUserInfoDao";
import * as XLSX from 'xlsx';
export const route = express.Router();

route.post('/useradmin/:doType', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let dataRows; //数据库用户情况
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;
        let doType = req.params.doType;
        let params = {};
        if (doType == "addByForm" || doType == "edit") {
            params = req.body;
        }
        else {
            params = {}
        }

        //console.log('user info params:', req.body.id_card);
        do {
            var UserInfoInstance = new AddUpdateUserInfoDao(params);
            //参数校验
            let checkDataRes:any = UserInfoInstance.checkData();
            if(!checkDataRes.status) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = checkDataRes.msg;
                break;
            }
            //console.log("checkData success!!");
            //数据插入数据库
            try {
                msg = await UserInfoInstance.doAdd();
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }
            //console.log("add data to user_info success!!");
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





route.post('/useradminUpload/addByFile', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let dataRows; //数据库用户情况
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;
        let params:any = [];

        let fileData = req.files.usernames["data"];
        let workbook =  XLSX.read(fileData);
        
        // 获取 Excel 中所有表名
        const sheetNames = workbook.SheetNames;
        // 根据表名获取对应某张表
        const worksheet = workbook.Sheets[sheetNames[0]];
        let data = XLSX.utils.sheet_to_json(worksheet);
        let turnToolInstance = new TurnTool(data); 
        params = turnToolInstance.doTurn();
        // console.log(params[0].length, "数据的测试");
        // console.log("到这里");return
        do {
            //数据插入数据库
            try {
                msg = await turnToolInstance.doAddAll(params);
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }
            //console.log("add data to user_info success!!");
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
route.get('/a', (req, res, next) => {
    res.render('upload')
})