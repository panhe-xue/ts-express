import * as mysql from "mysql";
import {RetCode, RetMsg} from "../util/RetStatus";
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
    public async execSql(sqlString: string, cb:any) {
        var self = this;
        let conn;

        if(!self.Pool) {
            self.connectDB();
        }
        if(self.Pool._close) {
            throw Error("db connection pool closed");
        }
        
        self.Pool.getConnection(function(err, conn) {
            if(err) {
                throw new Error( err);
            }
            if(!conn) {
                console.error("sorry connect database fail!!")
                throw new Error("database connect error");
            }
            
            let sql = `${sqlString}`;
            try {
                conn.query(sql, (err, rows) => {
                    if(err) {
                        throw new Error( err);
                        return
                    }
                    cb(self.convertRows(rows));
                });    
            } catch (error) {
                console.log("query sql err:", error);
                throw new Error("sql err");
            }
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