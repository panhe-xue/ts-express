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
var LoginDao_1 = require("../../dao/login/LoginDao");
var user_subscribe_1 = require("../../dao/user/user_subscribe");
var request_1 = require("../../util/request");
var globalData_1 = require("../../config/globalData");
exports.route = express.Router();
var LoginInstance = new LoginDao_1.default();
var ms_1 = require("../../util/ms");
// 用户订阅
var userSubscribe = new user_subscribe_1.default();
exports.route.post('/login', function (req, res, next) {
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, msg, subMsg, data, code, options, user, error_1, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ret = RetStatus_1.RetCode.SUC_OK;
                    msg = RetStatus_1.RetMsg.SUC_OK;
                    subMsg = RetStatus_1.RetMsg.SUC_OK;
                    code = req.body.code;
                    ms_1.default.log.info('user login request args.........:', code);
                    _a.label = 1;
                case 1:
                    if (!LoginInstance.checkData(code)) {
                        ret = RetStatus_1.RetCode.ERR_CLIENT_PARAMS_ERR;
                        msg = RetStatus_1.RetMsg.ERR_CLIENT_PARAMS_ERR;
                        subMsg = '缺少code';
                        return [3 /*break*/, 9];
                    }
                    options = {
                        url: globalData_1.default.code2SessionUrl,
                        data: {
                            appid: globalData_1.default.appData.appId,
                            secret: globalData_1.default.appData.appSecret,
                            js_code: code
                        }
                    };
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, , 8]);
                    return [4 /*yield*/, request_1.httpGet(options)];
                case 3:
                    //获取openid
                    data = _a.sent();
                    data = JSON.parse(data);
                    if (data.errcode) {
                        ret = RetStatus_1.RetCode.ERR_SERVER_EXCEPTION;
                        msg = RetStatus_1.RetMsg.ERR_SERVER_EXCEPTION;
                        subMsg = data.errmsg;
                        return [3 /*break*/, 9];
                    }
                    return [4 /*yield*/, LoginInstance.getOpenid(data.openid)];
                case 4:
                    user = _a.sent();
                    if (!(user.length === 0)) return [3 /*break*/, 6];
                    // 新用户插入用户表
                    // 产生一条登录日志
                    // 默认订阅--新生事物(默认id=1)
                    return [4 /*yield*/, Promise.all([LoginInstance.InsertOpenid(data.openid), userSubscribe.subscribeBrands(data.openid, 1)])];
                case 5:
                    // 新用户插入用户表
                    // 产生一条登录日志
                    // 默认订阅--新生事物(默认id=1)
                    _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    ret = RetStatus_1.RetCode.ERR_SERVER_EXCEPTION;
                    msg = RetStatus_1.RetMsg.ERR_SERVER_EXCEPTION;
                    subMsg = error_1;
                    return [3 /*break*/, 8];
                case 8:
                    if (false) return [3 /*break*/, 1];
                    _a.label = 9;
                case 9:
                    result = {
                        status: ret,
                        msg: msg,
                        subMsg: subMsg,
                        openid: (data && data.openid) || ''
                    };
                    //返回操作
                    res.json(result);
                    return [2 /*return*/];
            }
        });
    }); })();
});
//# sourceMappingURL=Login.js.map