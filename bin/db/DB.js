"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var DbBase = /** @class */ (function () {
    function DbBase(options) {
        this.options = options;
        this.options.charset = options.charset || 'UTF8_GENERAL_CI';
        this.options.connectionLimit = options.connectionLimit || 100;
        this.options.queueLimit = options.queueLimit || 10000;
    }
    return DbBase;
}());
/**数据库类 */
var DB = /** @class */ (function (_super) {
    __extends(DB, _super);
    function DB(options) {
        var _this = _super.call(this, options) || this;
        _this.connectDB();
        return _this;
    }
    /**链接数据库 */
    DB.prototype.connectDB = function () {
        try {
            this.Pool = mysql.createPool(this.options);
        }
        catch (error) {
            console.error("connect DB error", error);
            throw new Error("connect DB error!!");
        }
    };
    /**
     * 执行sql
     * @return
     */
    DB.prototype.execSql = function (sqlString, values) {
        var self = this;
        var conn;
        if (!self.Pool) {
            self.connectDB();
        }
        if (self.Pool._close) {
            throw Error("db connection pool closed");
        }
        return new Promise(function (resolve, reject) {
            self.Pool.getConnection(function (err, conn) {
                if (err) {
                    reject(err);
                    return;
                }
                if (!conn) {
                    console.error("sorry connect database fail!!");
                    reject(err);
                    return;
                }
                if (values && Array.isArray(values)) {
                    conn.query(sqlString, [values], function (err, rows) {
                        if (err) {
                            console.error(sqlString + " err:", err);
                            reject(err);
                            return;
                        }
                        conn.release();
                        resolve(self.convertRows(rows));
                    });
                }
                else {
                    conn.query(sqlString, function (err, rows) {
                        if (err) {
                            console.error(sqlString + " err:", err);
                            reject(err);
                            return;
                        }
                        conn.release();
                        resolve(self.convertRows(rows));
                    });
                }
            });
        });
    };
    DB.prototype.convertRows = function (rows) {
        if (!(rows instanceof Array)) {
            return [rows];
        }
        if (rows[0] && (rows[rows.length - 1] instanceof Array)) {
            return rows[rows.length - 1];
        }
        return rows;
    };
    return DB;
}(DbBase));
exports.default = DB;
//# sourceMappingURL=DB.js.map