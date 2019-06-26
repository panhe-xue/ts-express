import * as express from "express";

import {RetCode, RetMsg} from "../../util/RetStatus";
import  NewUser from "../../dao/user/new_user";
import  GetBrandsDao from "../../dao/getBrands/GetBrandsDao";
import  UserLog from "../../dao/user/user_log";
export  const route = express.Router();

const newUser = new NewUser();
const getBrandsDao = new GetBrandsDao();
const userLog = new UserLog();

route.post('/index/load', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;
        let data = {
            new_user: 0,         // 0是老用户  1是新用户
            brands_num: 1,       // 栏1 订阅数
            add_brands_num: 0,   // 新增卡片数
            add_brands_res: null // 栏2  新增卡片为0 ？ 新增卡片数 ： 可订阅总数
        };
        let lastLoginSubscribeTime;  // 该用户最后一次登录标签订阅页时间
        let lastLoginIndexTime;  // 该用户最后一次登录首页时间
        let openid = req.body.openid;
        do {
            //参数校验
            if(!openid) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = '缺少openid';
                break;
            }

            let result;
            try {
                result = await newUser.is_new_user(openid);
            } catch (error) {
                console.log(error);
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
            }

            if(result === true) { // 新用户
                data.new_user = 1;
            } else { //老用户
                data.new_user = 0;
                lastLoginSubscribeTime = result.subscribeTime;
                lastLoginIndexTime = result.indexTime;
            }

            // 统计订阅新品总数
            // 统计新增卡片数
            // 获取更新feed总数
            let resData;
            try {
                resData = await Promise.all([
                    getBrandsDao.getHasSubscribeBrandsCount(openid),
                    getBrandsDao.getNewAddBrands(data, lastLoginSubscribeTime),
                    getBrandsDao.getSubscribeFeedsUpdateNum(data, openid, lastLoginIndexTime)
                ]);
            } catch (error) {
                console.log(error);
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
            }

            // 订阅新品数
            data.brands_num = resData[0];

            let temp = {
                count: 0,
                data: null
            }
            // 新增卡片数
            data.add_brands_num = resData[1].length === 0 ? 0 : resData[1].length;
            if(resData[1].length !== 0) {
                data.add_brands_res = resData[1].slice(0, 6);
            } else{
                try {
                    temp.count = await getBrandsDao.getNotSubscribeBrandsCount(openid);
                    temp.data = await getBrandsDao.getNotSubscribeBrands(openid, 0, 3);
                    data.add_brands_res = temp;
                } catch (error) {
                    console.log(error);
                    ret = RetCode.ERR_SERVER_EXCEPTION;
                    msg = RetMsg.ERR_SERVER_EXCEPTION;
                }
            }

            // //插入一条日志
            await userLog.insertLog(openid, 0);
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

