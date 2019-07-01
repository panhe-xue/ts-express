// import * as express from "express";
// import {RetCode, RetMsg} from "../../util/RetStatus";
// import { ListDao } from "../../dao/getAllBrands/ListDao";
// export  const route = express.Router();
// const listDat = new ListDao()
// route.get('/organization/list', (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     (async () => {
//         let ret:number = RetCode.SUC_OK;
//         let msg: string = RetMsg.SUC_OK;
//         let subMsg: string;
//         let openid = req.query.openid;
//         do {
//             let result = lsitDao.checkData();
//             //参数校验
//             if(!result.status) {
//                 ret = RetCode.ERR_CLIENT_PARAMS_ERR;
//                 msg = RetMsg.ERR_CLIENT_PARAMS_ERR;
//                 subMsg = result.msg;
//                 break;
//             }
//             console.log("checkData success!!");
//             //数据库获取总条数
//             try {
//                 // let allNum = await UserInfoInstance.getAllNumFromDB();
//             } catch (error) {
//                 ret = RetCode.ERR_SERVER_EXCEPTION;
//                 msg = RetMsg.ERR_SERVER_EXCEPTION;
//                 subMsg = error.message;
//                 break;
//             }
//             //数据库获取数据
//             try {
//                 //dataRows = await UserInfoInstance.getUserInfoFromDB()
//             } catch (error) {
//                 ret = RetCode.ERR_SERVER_EXCEPTION;
//                 msg = RetMsg.ERR_SERVER_EXCEPTION;
//                 subMsg = error.message;
//                 break;
//             }
//             console.log("get User list FromDB success!!");
//         } while (false)
//         let result = {
//             status: ret,
//             msg   : msg,
//             subMsg: subMsg,
//             data  : dataRows
//         }
//         //返回操作
//         res.json(result);
//         
//     })()
// });
//# sourceMappingURL=List.js.map