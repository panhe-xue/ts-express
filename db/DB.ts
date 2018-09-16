import * as mysql from "mysql";

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
    abstract execSql(sql:string): any
}

/**数据库类 */
class DB extends DbBase{
    constructor (options) {
        super(options);
    }
    /**链接数据库 */
    connectDB() {
        try {
            this.Pool = mysql.createPool(this.options);
        } catch (error) {
            throw new Error("connect DB error!!")
        }
    }

    /**执行sql */
    execSql(sqlString: string, callback) {
        var self = this;
        if(!self.Pool) {
            self.connectDB();
        }
        if(self.Pool._close) {
            throw Error("db connection pool closed");
            return
        }
        self.Pool.getConnection(function(err, con) {
            if(err) {
                throw new Error(err);
                return
            }
            let sql = `use ${self.options.database};${sqlString}`;
            con.query(sql, (err2, rows) => {

            });
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