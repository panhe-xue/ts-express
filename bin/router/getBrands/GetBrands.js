"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var RetStatus_1 = require("../../util/RetStatus");
var GetBrandsDao_1 = require("../../dao/getBrands/GetBrandsDao");
exports.route = express.Router();
var user_log_1 = require("../../dao/user/user_log");
var util_1 = require("../../util/util");
var ms_1 = require("../../util/ms");
//日志打印
var userLog = new user_log_1.default();
var getBrandsDao = new GetBrandsDao_1.GetBrandsDao();
exports.route.post('/getHasSubscribeBrands', function (req, res, next) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, msg, subMsg, openid, data, allNum, error_1, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ret = RetStatus_1.RetCode.SUC_OK;
                    msg = RetStatus_1.RetMsg.SUC_OK;
                    openid = req.body.openid;
                    data = {};
                    _a.label = 1;
                case 1:
                    //参数校验
                    if (!openid) {
                        ret = RetStatus_1.RetCode.ERR_CLIENT_PARAMS_ERR;
                        msg = RetStatus_1.RetMsg.ERR_CLIENT_PARAMS_ERR;
                        subMsg = '缺少openid';
                        return [3 /*break*/, 7];
                    }
                    ms_1.default.log.info("checkData success!!");
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, getBrandsDao.getHasSubscribeBrands(openid)];
                case 3:
                    allNum = _a.sent();
                    data = allNum;
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    ret = RetStatus_1.RetCode.ERR_SERVER_EXCEPTION;
                    msg = RetStatus_1.RetMsg.ERR_SERVER_EXCEPTION;
                    subMsg = error_1.message;
                    return [3 /*break*/, 7];
                case 5:
                    ms_1.default.log.info("get User list FromDB success!!");
                    _a.label = 6;
                case 6:
                    if (false) return [3 /*break*/, 1];
                    _a.label = 7;
                case 7:
                    result = {
                        status: ret,
                        msg: msg,
                        subMsg: subMsg,
                        data: data
                    };
                    //返回操作
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    }); })();
});
exports.route.post('/getNotSubscribeBrands', function (req, res, next) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, msg, subMsg, openid, pageBegin, pageNum, numBegin, data, error_2, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ret = RetStatus_1.RetCode.SUC_OK;
                    msg = RetStatus_1.RetMsg.SUC_OK;
                    openid = req.body.openid;
                    pageBegin = req.body.pageBegin || 0;
                    pageNum = req.body.pageNum || 18;
                    numBegin = +pageBegin * +pageNum;
                    data = [];
                    _a.label = 1;
                case 1:
                    //参数校验
                    if (!openid || util_1.isFalseExZero(pageBegin) || !pageNum) {
                        ret = RetStatus_1.RetCode.ERR_CLIENT_PARAMS_ERR;
                        msg = RetStatus_1.RetMsg.ERR_CLIENT_PARAMS_ERR;
                        subMsg = '缺少openid或者pageBegin或者pageNum';
                        return [3 /*break*/, 7];
                    }
                    ms_1.default.log.info("checkData success!!");
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    // 写日志
                    userLog.insertLog(openid, 1);
                    return [4 /*yield*/, getBrandsDao.getNotSubscribeBrands(openid, numBegin, pageNum)];
                case 3:
                    // 查找没有订阅的标签 从0--18
                    data = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    ret = RetStatus_1.RetCode.ERR_SERVER_EXCEPTION;
                    msg = RetStatus_1.RetMsg.ERR_SERVER_EXCEPTION;
                    subMsg = error_2.message;
                    return [3 /*break*/, 7];
                case 5:
                    ms_1.default.log.info("getNotSubscribeBrands 获取没有订阅数目 success!!");
                    _a.label = 6;
                case 6:
                    if (false) return [3 /*break*/, 1];
                    _a.label = 7;
                case 7:
                    result = {
                        status: ret,
                        msg: msg,
                        subMsg: subMsg,
                        data: data
                    };
                    //返回操作
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    }); })();
});
//# sourceMappingURL=GetBrands.js.map