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
var GetBrandsDao = /** @class */ (function () {
    function GetBrandsDao() {
    }
    /**
     * 获取已经订阅的brands总数
     * @return Array 数据
     */
    GetBrandsDao.prototype.getHasSubscribeBrandsCount = function (openid) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n        select count(*) as count from " + GetBrandsDao.TABLE_NAME + " A\n        left join " + GetBrandsDao.TABLE_NAME_BRANDS + " B\n        on A.brands_id = B.id\n        where A.openid = ? and A.status = 1 order by A.create_time desc;\n        ";
                        sql = mysql.format(sql, [openid]);
                        console.info("getHasSubscribeBrandsCount user from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        console.log(rows, '测试...............');
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
    /**
     *
     * @return Array 数据
     */
    GetBrandsDao.prototype.getHasSubscribeBrands = function (openid) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n        select B.* from " + GetBrandsDao.TABLE_NAME + " A\n        left join " + GetBrandsDao.TABLE_NAME_BRANDS + " B\n        on A.brands_id = B.id\n        where A.openid = ? and A.status = 1 order by A.create_time desc;";
                        sql = mysql.format(sql, [openid]);
                        console.info("getHasSubscribeBrands 获取已经订阅brands数 from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
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
     * 获取没有订阅数据
     * @param openid
     * @param pageNum
     */
    GetBrandsDao.prototype.getNotSubscribeBrands = function (openid, pageBegin, pageNum) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n        select * from " + GetBrandsDao.TABLE_NAME_BRANDS + "\n        where status = 1 and id not in (\n            select brands_id as id from " + GetBrandsDao.TABLE_NAME + " where openid = ? and status = 1\n        )\n        order by create_time desc limit ?, ?;";
                        sql = mysql.format(sql, [openid, +pageBegin, +pageNum]);
                        console.info("getNotSubscribeBrands 获取没有订阅的brands详情数据 from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_3 = _a.sent();
                        console.log(sql, "error: ", error_3);
                        throw new Error(error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取没有订阅总数
     * @param openid
     * @param pageNum
     */
    GetBrandsDao.prototype.getNotSubscribeBrandsCount = function (openid) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n        select count(*) as count from " + GetBrandsDao.TABLE_NAME_BRANDS + "\n        where status = 1 and id not in (\n            select brands_id as id from " + GetBrandsDao.TABLE_NAME + " where openid = ? and status = 1\n        )\n        order by create_time desc;";
                        sql = mysql.format(sql, [openid]);
                        console.info("getNotSubscribeBrands 获取没有订阅的brands总数 from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows[0].count];
                    case 3:
                        error_4 = _a.sent();
                        console.log(sql, "error: ", error_4);
                        throw new Error(error_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 统计新增卡片总数
     * @param openid
     * @param data
     */
    GetBrandsDao.prototype.getNewAddBrands = function (data, lastTime) {
        return __awaiter(this, void 0, void 0, function () {
            var whereStr, sql, rows, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        whereStr = '';
                        if (data.new_user === 0 && lastTime !== null) {
                            whereStr += ' and create_time >= "' + lastTime.toString() + '" ';
                        }
                        sql = "\n            select * from " + GetBrandsDao.TABLE_NAME_BRANDS + " where 1=1 " + whereStr + "\n            order by create_time desc;\n        ";
                        console.info("getNewAddBrands 获取新增标签数据 from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_5 = _a.sent();
                        console.log(sql, "error: ", error_5);
                        throw new Error(error_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取已经订阅的feeds更新总数
     * @return Array 数据
     */
    GetBrandsDao.prototype.getSubscribeFeedsUpdateNum = function (data, openid, lastTime) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, sql1, res_row, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = { count: 0, brands: [] };
                        sql = "\n        select count(*) as count from " + GetBrandsDao.TABLE_NAME_FEEDS + " A\n        left join " + GetBrandsDao.TABLE_NAME + " B\n        on A.brands_id = B.brands_id\n        where B.openid = ? and B.status = 1 and A.create_time >= \"" + lastTime + "\"\n        order by A.create_time desc\n        ";
                        sql = mysql.format(sql, [openid]);
                        console.info("getHasSubscribeFeeds获取更新的feed总量 user from db sql:", sql);
                        sql1 = "\n            select D.name as name from (\n                select  A.brands_id as brands_id  from " + GetBrandsDao.TABLE_NAME_FEEDS + " A\n                left join " + GetBrandsDao.TABLE_NAME + " B\n                on A.brands_id = B.brands_id\n                where B.openid = ? and B.status = 1 and A.create_time >= \"" + lastTime + "\"\n                order by A.create_time desc\n            ) as C\n            left join " + GetBrandsDao.TABLE_NAME_BRANDS + " D\n            on C.brands_id = D.id\n            group by C.brands_id limit 0, 3;\n                ";
                        sql1 = mysql.format(sql1, [openid]);
                        console.info("getHasSubscribeFeedsBrands 获取更新feed对应的brand名字 user from db sql:", sql1);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, Promise.all([
                                ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql),
                                ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql1)
                            ])];
                    case 2:
                        res_row = _a.sent();
                        result.count = res_row[0][0].count;
                        result.brands = res_row[1].slice(0, 3);
                        return [2 /*return*/, result];
                    case 3:
                        error_6 = _a.sent();
                        console.log(sql, "error: ", error_6);
                        throw new Error(error_6);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 表名
     */
    GetBrandsDao.TABLE_NAME = "user_brands";
    GetBrandsDao.TABLE_NAME_BRANDS = "brands";
    GetBrandsDao.TABLE_NAME_FEEDS = "feeds";
    return GetBrandsDao;
}());
exports.GetBrandsDao = GetBrandsDao;
exports.default = GetBrandsDao;
//# sourceMappingURL=GetBrandsDao.js.map