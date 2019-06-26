import * as express from "express";

import {RetCode, RetMsg} from "../../util/RetStatus";
import SetBrandsDao  from "../../dao/getBrands/SetBrandsDao";
export  const route = express.Router();

const setBrandsDao = new SetBrandsDao();

// 订阅接口
route.post('/setNewSubscribeBrands', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;
        let openid = req.body.openid;
        let brand_id = +req.body.brand_id;
        do {
            //参数校验
            if(!openid || !brand_id) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = '缺少openid或者brands_id';
                break;
            }
            console.log("checkData success!!");

            // 获取订阅brands数
            try {
                let allNum = await setBrandsDao.getHasThisBrands(openid, brand_id);
                if(allNum.length === 0) {
                    await setBrandsDao.insertThisBrands(openid, brand_id);
                } else {
                    await setBrandsDao.updateThisBrands(openid, brand_id, 1);
                }
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }

            console.log("setNewSubscribeBrands 设置新标签品牌 success!!");
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

// 取消订阅接口
route.post('/delThisBrands', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;
        let openid = req.body.openid;
        let brand_id = +req.body.brand_id;
        do {
            //参数校验
            if(!openid || !brand_id) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = '缺少openid或者brands_id';
                break;
            }
            console.log("checkData success!!");

            // 取消订阅brands
            try {
                let allNum = await setBrandsDao.updateThisBrands(openid, brand_id, 0);
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }

            console.log("setNewSubscribeBrands 设置新标签品牌 success!!");
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