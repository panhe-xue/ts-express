import * as express from "express";

import {RetCode, RetMsg} from "../../util/RetStatus";
export  const route = express.Router();
import { isFalseExZero } from "../../util/util";
import ms from "../../util/ms";
import { getWxaCode } from "../../lib/GetWxDatas";
import globalData from "../../config/globalData";
import GetFeedsDao from "../../dao/getFeeds/getFeedsDao";
let getFeedDao = new GetFeedsDao()
// 获取小程序码
// path: string, width?: number, auto_color?: boolean, line_color?: object, is_hyaline?: boolean
route.post('/getWxaCode', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        try {
            let ret:number = RetCode.SUC_OK;
            let msg: string = RetMsg.SUC_OK;
            let subMsg: string;
            let feed_id: number = req.body.feed_id;
            let path: string = req.body.path;
            let width: number = req.body.width;
            let auto_color: boolean = req.body.auto_color;
            let line_color: string = req.body.line_color;
            let is_hyaline: boolean = req.body.is_hyaline;
            ms.log.info("getFeedItem arg:",req.body);
            let data;
            do {
                //参数校验
                if(!path || !feed_id) {
                    ret = RetCode.ERR_CLIENT_PARAMS_ERR;
                    msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
                    subMsg = '缺少feed_id或者feed_id';
                    break;
                }
                ms.log.info("获取小程序码 getWxaCode checkData success!!");
                let wxacodeRes = await getFeedDao.getFeedItemWxaCode(feed_id);
                ms.log.info("数据库获取小程序码 getWxaCode result:", wxacodeRes);
                if(wxacodeRes.length === 1 && wxacodeRes[0].wxacode) {
                    data = wxacodeRes[0].wxacode
                    break;
                }
                let basePathObj = process.env.NODE_ENV === "development" ? globalData.dev : globalData.prod;

                let wxacodePath = ms.path.join(basePathObj.wxacodePath , "feedid" + feed_id + ".jpeg");
                let dataBasePath = basePathObj.databasePath + "feedid" + feed_id + ".jpeg";
                ms.log.info("生成的路径参数", wxacodePath, dataBasePath);

                // 获取图片并保存 插入数据库

                let res_buffer = await getWxaCode(wxacodePath, path, +width, auto_color, line_color, is_hyaline);
                ms.log.info(res_buffer, "结果.........");
                if(res_buffer) {
                    await getFeedDao.insertWxaCodePath(feed_id, dataBasePath);
                    data = dataBasePath;
                    break;
                }

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
            ms.log.error("get getWxaCode error:", error.message);
            next(error);
        }
    })()
});