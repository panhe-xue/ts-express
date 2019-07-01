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
var new_user_1 = require("../../dao/user/new_user");
var GetBrandsDao_1 = require("../../dao/getBrands/GetBrandsDao");
var user_log_1 = require("../../dao/user/user_log");
var util_1 = require("../../util/util");
exports.route = express.Router();
var newUser = new new_user_1.default();
var getBrandsDao = new GetBrandsDao_1.default();
var userLog = new user_log_1.default();
exports.route.post('/index/load', function (req, res, next) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, msg, subMsg, data, lastLoginSubscribeTime, lastLoginIndexTime, openid, result_1, error_1, resData, error_2, temp, _a, _b, error_3, _c, error_4, result, error_5;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 21, , 22]);
                    ret = RetStatus_1.RetCode.SUC_OK;
                    msg = RetStatus_1.RetMsg.SUC_OK;
                    subMsg = void 0;
                    data = {
                        new_user: 0,
                        brands_num: 1,
                        add_brands_num: 0,
                        add_brands_res: null,
                        new_feed_res: null // 新增feed结果--新用户和订阅数为0时没有数据
                    };
                    lastLoginSubscribeTime = void 0;
                    lastLoginIndexTime = void 0;
                    openid = req.body.openid;
                    _d.label = 1;
                case 1:
                    //参数校验
                    if (!openid) {
                        ret = RetStatus_1.RetCode.ERR_CLIENT_PARAMS_ERR;
                        msg = RetStatus_1.RetMsg.ERR_CLIENT_PARAMS_ERR;
                        subMsg = '缺少openid';
                        return [3 /*break*/, 20];
                    }
                    // 插入一条日志
                    try {
                        userLog.insertLog(openid, 0);
                    }
                    catch (error) {
                        console.log(error);
                        ret = RetStatus_1.RetCode.ERR_SERVER_EXCEPTION;
                        msg = RetStatus_1.RetMsg.ERR_SERVER_EXCEPTION;
                    }
                    result_1 = void 0;
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, newUser.is_new_user(openid)];
                case 3:
                    result_1 = _d.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _d.sent();
                    console.log(error_1);
                    ret = RetStatus_1.RetCode.ERR_SERVER_EXCEPTION;
                    msg = RetStatus_1.RetMsg.ERR_SERVER_EXCEPTION;
                    return [3 /*break*/, 5];
                case 5:
                    if (result_1 === true) { // 新用户
                        data.new_user = 1;
                    }
                    else { //老用户
                        data.new_user = 0;
                        lastLoginSubscribeTime = (result_1.subscribeTime.length !== 0 && util_1.formatDate(result_1.subscribeTime[0].login_time)) || null;
                        lastLoginIndexTime = (result_1.indexTime.length !== 0 && util_1.formatDate(result_1.indexTime[0].login_time)) || null;
                    }
                    resData = void 0;
                    _d.label = 6;
                case 6:
                    _d.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, Promise.all([
                            getBrandsDao.getHasSubscribeBrandsCount(openid),
                            getBrandsDao.getNewAddBrands(data, lastLoginSubscribeTime)
                        ])];
                case 7:
                    resData = _d.sent();
                    return [3 /*break*/, 9];
                case 8:
                    error_2 = _d.sent();
                    console.log(error_2);
                    ret = RetStatus_1.RetCode.ERR_SERVER_EXCEPTION;
                    msg = RetStatus_1.RetMsg.ERR_SERVER_EXCEPTION;
                    return [3 /*break*/, 20];
                case 9:
                    // 订阅新品数
                    data.brands_num = resData[0][0].count || 0;
                    temp = {
                        count: 0,
                        data: null
                    };
                    // 新增卡片数
                    data.add_brands_num = resData[1].length === 0 ? 0 : resData[1].length;
                    if (!(data.add_brands_num !== 0)) return [3 /*break*/, 10];
                    data.add_brands_res = resData[1].slice(0, 6);
                    return [3 /*break*/, 14];
                case 10:
                    _d.trys.push([10, 13, , 14]);
                    _a = temp;
                    return [4 /*yield*/, getBrandsDao.getNotSubscribeBrandsCount(openid)];
                case 11:
                    _a.count = _d.sent();
                    _b = temp;
                    return [4 /*yield*/, getBrandsDao.getNotSubscribeBrands(openid, 0, 3)];
                case 12:
                    _b.data = _d.sent();
                    data.add_brands_res = temp;
                    return [3 /*break*/, 14];
                case 13:
                    error_3 = _d.sent();
                    console.log(error_3);
                    ret = RetStatus_1.RetCode.ERR_SERVER_EXCEPTION;
                    msg = RetStatus_1.RetMsg.ERR_SERVER_EXCEPTION;
                    return [3 /*break*/, 14];
                case 14:
                    _d.trys.push([14, 17, , 18]);
                    if (!(data.brands_num !== 0 && data.new_user !== 1)) return [3 /*break*/, 16];
                    _c = data;
                    return [4 /*yield*/, getBrandsDao.getSubscribeFeedsUpdateNum(data, openid, lastLoginIndexTime)];
                case 15:
                    _c.new_feed_res = _d.sent();
                    _d.label = 16;
                case 16: return [3 /*break*/, 18];
                case 17:
                    error_4 = _d.sent();
                    console.log(error_4);
                    ret = RetStatus_1.RetCode.ERR_SERVER_EXCEPTION;
                    msg = RetStatus_1.RetMsg.ERR_SERVER_EXCEPTION;
                    return [3 /*break*/, 18];
                case 18:
                    console.log("index reload success!!");
                    _d.label = 19;
                case 19:
                    if (false) return [3 /*break*/, 1];
                    _d.label = 20;
                case 20:
                    result = {
                        status: ret,
                        msg: msg,
                        subMsg: subMsg,
                        data: data
                    };
                    //返回操作
                    res.json(result);
                    return [3 /*break*/, 22];
                case 21:
                    error_5 = _d.sent();
                    console.log(error_5, '...');
                    res.json({ error: error_5.message, status: 500 });
                    return [3 /*break*/, 22];
                case 22: return [2 /*return*/];
            }
        });
    }); })();
});
//# sourceMappingURL=index.js.map