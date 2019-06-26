import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 登陆类
 */
class UserLog{
    /**
     * 表名
     */
    static TABLE_NAME = "user_logs";

    constructor() {
    }
    /**
     * 从数据库获取该用户信息
     * @return Array 数据
     */
    async insertLog(openid: string, type: number) {
        let result: any[] = [];

        let sql = `insert into ${UserLog.TABLE_NAME} (openid, type, login_time) value (?, ?, now())`;
        sql = mysql.format(sql, [openid, type]);
        console.info("insertLog logs from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}

export default UserLog;