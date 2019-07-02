import * as express from "express";

import {RetCode, RetMsg} from "../../util/RetStatus";
import { GetFeedsDao } from "../../dao/getFeeds/getFeedsDao";
export  const route = express.Router();
import  UserLog from "../../dao/user/user_log";
import { isFalseExZero } from "../../util/util";
import ms from "../../util/ms";

//日志打印
const userLog = new UserLog();
const getFeedsDao = new GetFeedsDao();

// 我订阅的新品
route.post('/getHasSubscribeFeeds', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;
        let openid = req.body.openid;
        let pageBegin = req.body.pageBegin || 0;
        let pageNum = req.body.pageNum || 6;
        let numBegin = +pageBegin * +pageNum
        let data = {};
        do {
            //参数校验
            if(!openid) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = '缺少openid';
                break;
            }
            ms.log.info("checkData success!!");

            // 获取订阅feeds数
            try {
                data = await getFeedsDao.getHasSubscribeFeeds(openid, numBegin, pageNum);
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }

            ms.log.info("get User list FromDB success!!");
        } while (false)

        let result = {
            status: ret,
            msg   : msg,
            subMsg: subMsg,
            data  : data
        }
        //返回操作
        res.json(result);
    })()
});

// 喜欢接口
route.post('/userLove', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;
        let openid = req.body.openid;
        let feed_id = +req.body.feed_id;
        let data = {};
        do {
            //参数校验
            if(!openid || !feed_id) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = '缺少openid或者feed_id';
                break;
            }
            ms.log.info("checkData success!!");

            // 获取订阅feeds数
            try {
                var addResult = await getFeedsDao.addUserLove(openid, feed_id);
                if(addResult.length ===1 ) {
                    data = await getFeedsDao.userLove(feed_id, 1);
                }
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }

            ms.log.info("get User list FromDB success!!");
        } while (false)

        let result = {
            status: ret,
            msg   : msg,
            subMsg: subMsg,
            data  : data
        }
        //返回操作
        res.json(result);
    })()
});
// 取消喜欢接口
route.post('/userCancelLove', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;
        let openid = req.body.openid;
        let feed_id = +req.body.feed_id;
        let data = {};
        do {
            //参数校验
            if(!openid || !feed_id) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = '缺少openid或者feed_id';
                break;
            }
            ms.log.info("checkData success!!");

            // 获取订阅feeds数
            try {
                let delRes = await getFeedsDao.delUserLove(openid, feed_id);
                if(delRes.length === 1 ) {
                    data = await getFeedsDao.userLove(feed_id, 0);
                }
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }

            ms.log.info("get User list FromDB success!!");
        } while (false)

        let result = {
            status: ret,
            msg   : msg,
            subMsg: subMsg,
            data  : data
        }
        //返回操作
        res.json(result);
    })()
});

// 曝光接口
route.post('/userView', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        let ret:number = RetCode.SUC_OK;
        let msg: string = RetMsg.SUC_OK;
        let subMsg: string;
        let openid = req.body.openid;
        let feed_id:Array<number> = req.body.feed_id;
        ms.log.info(typeof feed_id, feed_id, '参数.........');
        let data = {};
        do {
            //参数校验
            if(!openid || !Array.isArray(feed_id) || feed_id.length === 0) {
                ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                subMsg = '缺少openid或者feed_id';
                break;
            }
            ms.log.info("checkData success!!");

            // 获取订阅feeds数
            try {
                let delRes = await getFeedsDao.addUserView(openid, feed_id);
            } catch (error) {
                ret = RetCode.ERR_SERVER_EXCEPTION;
                msg = RetMsg.ERR_SERVER_EXCEPTION;
                subMsg = error.message;
                break;
            }

            ms.log.info("get User list FromDB success!!");
        } while (false)

        let result = {
            status: ret,
            msg   : msg,
            subMsg: subMsg,
            data  : data
        }
        //返回操作
        res.json(result);
    })()
});

// 获取feedItem
route.post('/getFeedItem', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        try {
            let ret:number = RetCode.SUC_OK;
            let msg: string = RetMsg.SUC_OK;
            let subMsg: string;
            let openid: string = req.body.openid;
            let feed_id: number = req.body.feed_id;
            ms.log.info("getFeedItem arg:",feed_id);
            let data;
            do {
                //参数校验
                if(!feed_id || !openid) {
                    ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                    msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                    subMsg = '缺少feed_id或者openid';
                    break;
                }
                ms.log.info("checkData success!!");

                // 获取订阅feeds数
                let res = await Promise.all([getFeedsDao.getFeedItem(openid, feed_id), getFeedsDao.getFeedItemRotation(feed_id)]);
                if (res[0].length >= 1) {
                    data = res[0][0]
                } else {
                    ret = RetCode.ERR_SERVER_EXCEPTION;
                    msg = RetMsg.ERR_SERVER_EXCEPTION;
                    subMsg = '没有对应的feed';
                    break;
                }
                data.rotations = res[1];
                ms.log.info("get User list FromDB success!!");
            } while (false)

            let result = {
                status: ret,
                msg   : msg,
                subMsg: subMsg,
                data  : data
            }
            //返回操作
            res.json(result);
        } catch (error) {
            ms.log.error("get Feed Item error:", error.message);
            next(error);
        }
    })()
});