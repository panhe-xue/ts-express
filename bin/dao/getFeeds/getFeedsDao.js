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
var util_1 = require("../../util/util");
/**
 * 人员信息类
 */
var GetFeedsDao = /** @class */ (function () {
    function GetFeedsDao() {
    }
    /**
     * 获取已经订阅的brands总数
     * @return Array 数据
     */
    GetFeedsDao.prototype.getHasSubscribeFeeds = function (openid, pageBegin, pageNum) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n            select a1.*, if(b1.id, 1, 0) as loved from\n                (\n                select A.*, C.logo as logo from " + GetFeedsDao.TABLE_NAME + " A\n                left join " + GetFeedsDao.TABLE_NAME_USER_BRANDS + " B\n                on A.brands_id = B.brands_id\n                left join " + GetFeedsDao.TABLE_NAME_BRANDS + " C\n                on A.brands_id = C.id\n                where B.openid = ? and B.status = 1 order by A.create_time desc limit ?, ?\n                ) as a1\n                left join\n                ( SELECT * FROM " + GetFeedsDao.TABLE_NAME_USER_LOVE + " WHERE openid = ?) AS b1\n                ON a1.id = b1.feed_id\n        ";
                        sql = mysql.format(sql, [openid, +pageBegin, +pageNum, openid]);
                        ms_1.default.log.info("getHasSubscribeFeeds user from db sql:", sql);
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
     * 标签自增love数据
     * @return Array 数据
     */
    GetFeedsDao.prototype.userLove = function (feed_id, type) {
        return __awaiter(this, void 0, void 0, function () {
            var ty, sql, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ty = type === 0 ? '-' : '+';
                        sql = "\n            update " + GetFeedsDao.TABLE_NAME + " set love_num = love_num " + ty + " 1\n            where id = ?\n        ";
                        sql = mysql.format(sql, [feed_id]);
                        ms_1.default.log.info("userLove商品喜欢数增加 user from db sql:", sql);
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
     * 插入love数据
     * @return Array 数据
     */
    GetFeedsDao.prototype.addUserLove = function (openid, feed_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n            insert into " + GetFeedsDao.TABLE_NAME_USER_LOVE + " (openid, feed_id, create_time) values (?, ?, now())\n        ";
                        sql = mysql.format(sql, [openid, feed_id]);
                        ms_1.default.log.info("adduserLove插入喜欢表 user from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_3 = _a.sent();
                        ms_1.default.log.error(sql, "error: ", error_3);
                        throw new Error(error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 删除love数据
     * @return Array 数据
     */
    GetFeedsDao.prototype.delUserLove = function (openid, feed_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n            delete from " + GetFeedsDao.TABLE_NAME_USER_LOVE + " where\n            openid = ? and feed_id = ?\n        ";
                        sql = mysql.format(sql, [openid, feed_id]);
                        ms_1.default.log.info("deluserLove商品用户取消 user from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_4 = _a.sent();
                        ms_1.default.log.error(sql, "error: ", error_4);
                        throw new Error(error_4);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 增加view数据
     * @return Array 数据
     */
    GetFeedsDao.prototype.addUserView = function (openid, feed_id) {
        return __awaiter(this, void 0, void 0, function () {
            var randomNum, ids, sql, rows, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        randomNum = Math.floor(util_1.getRandomNumber(5, 20));
                        ids = feed_id.join(',');
                        sql = "\n            update " + GetFeedsDao.TABLE_NAME + " set view_num = view_num + " + randomNum + "\n            where id in (" + ids + ")\n        ";
                        sql = mysql.format(sql, [feed_id]);
                        ms_1.default.log.info("userLove商品喜欢数增加 user from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_5 = _a.sent();
                        ms_1.default.log.error(sql, "error: ", error_5);
                        throw new Error(error_5);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取单个feed数据
     * @return Array 数据
     */
    GetFeedsDao.prototype.getFeedItem = function (openid, feed_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n        select a1.*, if(b1.id, 1, 0) as loved from\n        (\n        select\n            A.id as id,\n            A.name  as feed_name,\n            A.title as feed_title,\n            A.desc as feed_desc,\n            A.view_num as feed_view_num,\n            A.love_num as feed_love_num,\n            A.innovations as feed_innovations,\n            A.feed_intrd as feed_intrd,\n            date_format(A.create_time, \"%Y-%m-%d\") as create_time,\n            B.name        as brand_name,\n            B.title       as brand_title,\n            B.desc        as brand_desc,\n            B.logo        as brand_logo\n        from " + GetFeedsDao.TABLE_NAME + " A\n        left join " + GetFeedsDao.TABLE_NAME_BRANDS + " B\n        on A.brands_id = B.id\n        where B.status = 1 and A.status = 1 and A.id = ?\n        ) as a1\n        left join\n        ( SELECT * FROM " + GetFeedsDao.TABLE_NAME_USER_LOVE + " WHERE openid = ? and feed_id = ?) AS b1\n        ON a1.id = b1.feed_id\n        ";
                        sql = mysql.format(sql, [feed_id, openid, feed_id]);
                        ms_1.default.log.info("getFeedItem获取单个feed的数据 from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_6 = _a.sent();
                        ms_1.default.log.error(sql, "error: ", error_6);
                        throw new Error(error_6);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取单个feed的轮播图
     * @return Array 数据
     */
    GetFeedsDao.prototype.getFeedItemRotation = function (feed_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n        select * from " + GetFeedsDao.TABLE_NAME_ROTATION_CHART + "\n        where feed_id = ? order by create_time desc limit 10;\n        ";
                        sql = mysql.format(sql, [feed_id]);
                        ms_1.default.log.info("getFeedItemRotation获取单个feed的轮播图 from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_7 = _a.sent();
                        ms_1.default.log.error(sql, "error: ", error_7);
                        throw new Error(error_7);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取feeditem的小程序码
     * @return Array 数据
     */
    GetFeedsDao.prototype.getFeedItemWxaCode = function (feed_id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n        select wxacode from " + GetFeedsDao.TABLE_NAME + "\n        where id = ?;\n        ";
                        sql = mysql.format(sql, [feed_id]);
                        ms_1.default.log.info("getFeedItemWxaCode获取单个feed的小程序码 from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_8 = _a.sent();
                        ms_1.default.log.error(sql, "error: ", error_8);
                        throw new Error(error_8);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 插入小程序码路径到数据库
     * @return Array 数据
     */
    GetFeedsDao.prototype.insertWxaCodePath = function (feed_id, path) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\n        update " + GetFeedsDao.TABLE_NAME + "\n        set wxacode = ?\n        where id = ?;\n        ";
                        sql = mysql.format(sql, [path, feed_id]);
                        ms_1.default.log.info("getFeedItemWxaCode获取单个feed的小程序码 from db sql:", sql);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["subscribe_to_new_thing"].execSql(sql)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_9 = _a.sent();
                        ms_1.default.log.error(sql, "error: ", error_9);
                        throw new Error(error_9);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 表名
     */
    GetFeedsDao.TABLE_NAME = "feeds";
    GetFeedsDao.TABLE_NAME_USER_BRANDS = "user_brands";
    GetFeedsDao.TABLE_NAME_BRANDS = "brands";
    GetFeedsDao.TABLE_NAME_USER_LOVE = "user_love";
    GetFeedsDao.TABLE_NAME_ROTATION_CHART = "feeds_rotation_chart";
    return GetFeedsDao;
}());
exports.GetFeedsDao = GetFeedsDao;
exports.default = GetFeedsDao;
//# sourceMappingURL=getFeedsDao.js.map