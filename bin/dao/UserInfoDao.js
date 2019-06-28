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
var ms_1 = require("../util/ms");
var mysql = require("mysql");
/**
 * 人员信息类
 */
var UserInfoDao = /** @class */ (function () {
    function UserInfoDao(type, type_content, pageBegin, pageSize) {
        this.type = type;
        this.type_content = type_content;
        this.pageBegin = +pageBegin;
        this.pageSize = +pageSize;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    UserInfoDao.prototype.checkData = function () {
        var status = true; //默认为正确的数据
        do {
            if (this.type != "all" && !this.type_content) {
                status = false;
                break;
            }
            if ((this.type == "age" || this.type == "id_card") && isNaN(this.type_content)) {
                status = false;
                break;
            }
            if (isNaN(this.pageBegin) || isNaN(this.pageSize) || this.pageSize < 1) {
                status = false;
                break;
            }
        } while (false);
        return status;
    };
    /**
     * 从数据库获取该用户信息
     * @return Array 数据
     */
    UserInfoDao.prototype.getUserInfoFromDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, whereSqlString, sql, rows, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        whereSqlString = '';
                        whereSqlString = this.getWhereSqlStr();
                        sql = "select * from " + UserInfoDao.TABLE_NAME + " " + whereSqlString + " limit ?,?;";
                        sql = mysql.format(sql, [this.pageBegin, this.pageSize]);
                        console.info("get user info from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["siping_public_security"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_1 = _a.sent();
                        console.log(sql, "error: ", error_1);
                        throw new Error(error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserInfoDao.prototype.getWhereSqlStr = function () {
        var resultString = "";
        do {
            if (this.type == 'all') {
                break;
            }
            if (this.type == "name" || this.type == "id_card") {
                resultString += "where " + this.type + " = " + mysql.escape(this.type_content);
                break;
            }
            if (this.type == 'age') {
                var date = new Date();
                var dateLimit = (date.getFullYear() - this.type_content) + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                resultString += "where date_birth >= " + mysql.escape(dateLimit);
                break;
            }
            if (this.type == 'unit') {
                var content = "%" + this.type_content + "%";
                resultString +=
                    "where job_simple_name LIKE " + mysql.escape(content) + " \n                or\n                job_full_name LIKE " + mysql.escape(content) + " \n                ";
                break;
            }
        } while (false);
        return resultString;
    };
    /**
     * 表名
     */
    UserInfoDao.TABLE_NAME = "user_info";
    return UserInfoDao;
}());
exports.UserInfoDao = UserInfoDao;
/**
 * 人员删除类
 */
var UserInfoDeleteDao = /** @class */ (function () {
    function UserInfoDeleteDao(id) {
        this.id = id;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    UserInfoDeleteDao.prototype.checkData = function () {
        var status = true; //默认为正确的数据
        do {
            if (isNaN(this.id) || this.id < 1) {
                status = false;
                break;
            }
        } while (false);
        return status;
    };
    /**
     * 从数据库获取该用户信息
     * @return Array 数据
     */
    UserInfoDeleteDao.prototype.doDel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, whereSqlString, sql, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        whereSqlString = '';
                        sql = "delete from " + UserInfoDeleteDao.TABLE_NAME + " where id = ?";
                        sql = mysql.format(sql, [this.id]);
                        console.info("get user info from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["siping_public_security"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_2 = _a.sent();
                        console.log(sql, "error: ", error_2);
                        throw new Error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 表名
     */
    UserInfoDeleteDao.TABLE_NAME = "user_info";
    return UserInfoDeleteDao;
}());
exports.UserInfoDeleteDao = UserInfoDeleteDao;
//# sourceMappingURL=UserInfoDao.js.map