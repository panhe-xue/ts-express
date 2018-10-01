import * as express from "express";

import {RetCode, RetMsg} from "../../util/RetStatus";
import {AddUpdateUserInfoDao} from "../../dao/userinfo/AddUpdateUserInfoDao";
export  const route = express.Router();

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
            //let filename = req.files;
            //console.log("测试", filename);
        }

        console.log('user info params:', req.body.id_card);
        console.log('数据....');
        do {
            var UserInfoInstance = new AddUpdateUserInfoDao(params);
            //参数校验
            let checkDataRes:any = UserInfoInstance.checkData();
            console.log(checkDataRes, '数据....');
            if(!checkDataRes.status) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = checkDataRes.msg;
                break;
            }
            console.log("checkData success!!");
            //数据插入数据库
            try {
                msg = await UserInfoInstance.doAdd();
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }
            console.log("add data to user_info success!!");
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