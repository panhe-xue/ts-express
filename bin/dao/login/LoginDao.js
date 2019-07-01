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
Object.defineProperty(exports, "__esModule", { value: true });
var ms_1 = require("../../util/ms");
var mysql = require("mysql");
/**
 * 登陆类
 */
var LoginDao = /** @class */ (function () {
    function LoginDao() {
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    LoginDao.prototype.checkData = function (code) {
        var status = true; //默认为正确的数据
        if (!code) {
            status = false;
            return status;
        }
        return status;
    };
    /**
     * 从数据库获取该用户信息
     * @return Array 数据
     */
    LoginDao.prototype.getOpenid = function (openid) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, rows, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        sql = "select * from " + LoginDao.TABLE_NAME + " where openid = ?";
                        sql = mysql.format(sql, [openid]);
                        ms_1.default.log.info("get user from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_1 = _a.sent();
                        ms_1.default.log.error(sql, "error: ", error_1);
                        throw new Error(error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 登录授权插入openid
     * @return Array 数据
     */
    LoginDao.prototype.InsertOpenid = function (openid) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        sql = "insert into " + LoginDao.TABLE_NAME + " (openid, create_time) values (?, now());";
                        sql = mysql.format(sql, [openid]);
                        ms_1.default.log.info("insert openid from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_2 = _a.sent();
                        ms_1.default.log.error(sql, "error: ", error_2);
                        throw new Error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 表名
     */
    LoginDao.TABLE_NAME = "user";
    return LoginDao;
}());
exports.default = LoginDao;
//# sourceMappingURL=LoginDao.js.map