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
 * 人员信息类
 */
var ListDao = /** @class */ (function () {
    function ListDao(content, pageBegin, pageSize) {
        this.content = content;
        this.pageBegin = +pageBegin;
        this.pageSize = +pageSize;
        this.name = this.content.name;
        this.current_word_uint = this.content.unit;
        this.present_post = this.content.job;
        this.logo_of_change = this.content.marking;
        this.the_highest_degree = this.content.degree;
        this.education = this.content.education;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    ListDao.prototype.checkData = function () {
        var status = true; //默认为正确的数据
        var msg = '';
        do {
            if (!this.name) {
                status = false;
                msg = "姓名不能为空";
                break;
            }
            if (!this.current_word_uint) {
                status = false;
                msg = "单位名称不能为空";
                break;
            }
            if (this.present_post == undefined) {
                status = false;
                msg = "职务不能为空";
                break;
            }
        } while (false);
        return {
            status: status,
            msg: msg
        };
    };
    /**
     * 从数据库获取该用户信息
     * @return Array 数据
     */
    ListDao.prototype.getUserInfoFromDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var whereSqlString, sql, rows, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        whereSqlString = '';
                        whereSqlString = this.getWhereSqlStr();
                        sql = "select * from " + ListDao.TABLE_NAME + " " + whereSqlString + " limit ?,?;";
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
    ListDao.prototype.getWhereSqlStr = function () {
        var resultString = "";
        var name = "%" + this.name + "%";
        var current_word_uint = "%" + this.current_word_uint + "%";
        var present_post = "%" + this.present_post + "%";
        var logo_of_change = "%" + this.logo_of_change + "%";
        var the_highest_degree = "%" + this.the_highest_degree + "%";
        var education = "%" + this.education + "%";
        resultString += "where name LIKE " + mysql.escape(name) + " \n        and current_word_uint LIKE " + mysql.escape(current_word_uint) + "\n        and present_post LIKE " + mysql.escape(present_post) + "\n        and logo_of_change LIKE " + mysql.escape(logo_of_change) + "\n        and the_highest_degree LIKE " + mysql.escape(the_highest_degree) + "\n        and education LIKE " + mysql.escape(education) + "\n        ";
        return resultString;
    };
    /**
     * 从数据库获取总条数
     * @return Array 数据
     */
    ListDao.prototype.getAllNumFromDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var whereSqlString, sql, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        whereSqlString = '';
                        whereSqlString = this.getWhereSqlStr();
                        sql = "select count(*) as c from " + ListDao.TABLE_NAME + " " + whereSqlString + ";";
                        sql = mysql.format(sql, [this.pageBegin, this.pageSize]);
                        console.info("get user info from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["siping_public_security"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows[0].c];
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
    ListDao.TABLE_NAME = "police_duty_change_information_set";
    return ListDao;
}());
exports.ListDao = ListDao;
//# sourceMappingURL=ListDao.js.map