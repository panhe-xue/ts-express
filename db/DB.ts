import * as mysql from "mysql";
import {RetCode, RetMsg} from "../util/RetStatus";
import { isArray } from "util";
abstract class DbBase {
    public options;
    public Pool;
    constructor(options) {
        this.options = options
        this.options.charset         = options.charset || 'UTF8_GENERAL_CI';
        this.options.connectionLimit = options.connectionLimit || 100;
        this.options.queueLimit      = options.queueLimit || 10000;
    }
    abstract connectDB()
    abstract execSql(sql:string, cb:any)
    abstract convertRows(sql: string): any
}

/**数据库类 */
class DB extends DbBase{
    constructor (options) {
        super(options);
        this.connectDB();
    }
    /**链接数据库 */
    connectDB() {
        try {
            this.Pool = mysql.createPool(this.options);
        } catch (error) {
            console.error("connect DB error", error);
            throw new Error("connect DB error!!");
        }
    }

    /**
     * 执行sql
     * @return
     */
    public execSql(sqlString: string, values: any[]) {
        var self = this;
        let conn;

        if(!self.Pool) {
            self.connectDB();
        }
        if(self.Pool._close) {
            throw Error("db connection pool closed");
        }
        return new Promise((resolve, reject) => {
            self.Pool.getConnection(function(err, conn) {
                if(err) {
                    reject(err);
                    return
                }
                if(!conn) {
                    console.error("sorry connect database fail!!");
                    reject(err);
                    return
                }

                if(values && Array.isArray(values)) {
                    conn.query(sqlString, [values], (err, rows) => {
                        if(err) {
                            console.error(`${sqlString} err:`,err);
                            reject(err);
                            return
                        }
                        conn.release();
                        resolve(self.convertRows(rows));
                    });
                }else{
                    conn.query(sqlString, (err, rows) => {
                        if(err) {
                            console.error(`${sqlString} err:`,err);
                            reject(err);
                            return
                        }
                        conn.release();
                        resolve(self.convertRows(rows));
                    });
                }
            })
        })
    }
    convertRows(rows: any) {
        if(!(rows instanceof Array)) {
            return [rows]
        }

        if(rows[0] && (rows[rows.length -1] instanceof Array)) {
            return rows[rows.length - 1]
        }
        return rows
    }
}

export default DB