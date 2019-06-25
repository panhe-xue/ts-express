import * as express from "express";

import {RetCode, RetMsg} from "../../util/RetStatus";
import  NewUser from "../../dao/user/new_user";
import  GetBrandsDao from "../../dao/getBrands/GetBrandsDao";
// import  UserLog from "../../dao/user/user_log";
export  const route = express.Router();

const newUser = new NewUser();
const getBrandsDao = new GetBrandsDao();
// const userLog = new UserLog();

route.get('/index/load', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;
        let data = {
            new_user: 0,
            brands_num: 1,
            add_brands: {
                has_new: 0, // 默认没有更新

            },
            add_feeds: []  //new: null
        };
        let openid = req.query.openid;
        do {
            //参数校验
            if(!openid) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = '缺少openid';
                break;
            }

            let result = await newUser.is_new_user(openid);
            if(result === true) { // 新用户
                data.new_user = 1;
                data.brands_num = 1;
            } else { //老用户
                data.brands_num = await getBrandsDao.getAllBrands(openid);
            }

            // //插入一条日志
            // await userLog.insertLog(openid);
            console.log("index reload success!!");
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

