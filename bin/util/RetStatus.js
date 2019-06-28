"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 请求返回码
 *
 * @enum {number}
 */
var RetCode;
(function (RetCode) {
    /**
     * 服务器执行异常
     */
    RetCode[RetCode["ERR_SERVER_EXCEPTION"] = -500] = "ERR_SERVER_EXCEPTION";
    /**
     * 参数错误
     */
    RetCode[RetCode["ERR_CLIENT_PARAMS_ERR"] = -400] = "ERR_CLIENT_PARAMS_ERR";
    /**
     * 数据重复
     */
    RetCode[RetCode["ERR_DATA_REPEAT"] = -401] = "ERR_DATA_REPEAT";
    /**
     * 数据重复
     */
    RetCode[RetCode["ERR_PRIVILEGE"] = -402] = "ERR_PRIVILEGE";
    /**
     * 请求成功
     */
    RetCode[RetCode["SUC_OK"] = 0] = "SUC_OK";
})(RetCode = exports.RetCode || (exports.RetCode = {}));
/**
 * 请求返回信息
 *
 * @export
 * @class RetMsg
 */
var RetMsg = /** @class */ (function () {
    function RetMsg() {
    }
    /**
     * 请求成功
     *
     * @static
     */
    RetMsg.SUC_OK = "success";
    /**
     * 服务器执行异常
     *
     * @static
     */
    RetMsg.ERR_SERVER_EXCEPTION = "服务器错误";
    /**
     * 参数错误
     *
     * @static
     */
    RetMsg.ERR_CLIENT_PARAMS_ERR = "参数错误";
    /**
     * 数据重复
     * @static
     */
    RetMsg.ERR_DATA_REPEAT = "数据重复";
    /**
     * 数据互斥
     * @static
     */
    RetMsg.ERR_DATA_BMUTEX = "数据在黑名单中已存在,请先删除！";
    /**
     * 数据互斥
     * @static
     */
    RetMsg.ERR_DATA_WMUTEX = "数据在白名单中已存在,请先删除！";
    /**
     * 验证失败
     *
     * @static
     */
    RetMsg.ERR_FORBIDDEN = "获取身份信息失败，请重新登陆！";
    /**
     * 验证失败
     *
     * @static
     */
    RetMsg.ERR_PRIVILEGE = "权限验证失败，请重新操作！";
    return RetMsg;
}());
exports.RetMsg = RetMsg;
//# sourceMappingURL=RetStatus.js.map