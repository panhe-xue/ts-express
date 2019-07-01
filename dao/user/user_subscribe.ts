import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 登陆类
 */
class UserSubscribe{
    /**
     * 表名
     */
    static TABLE_NAME = "user_brands";
    static TABLE_NAME_LOG = "user_logs";
    static TABLE_NAME_USER = "user";

    constructor() {
    }
    /**
     * 订阅信息
     * @return Array 数据
     */
    async subscribeBrands(openid: string, brands_id: number) {
        let sql = `insert into ${UserSubscribe.TABLE_NAME} (openid, brands_id, status, create_time) value (?, ?, 1, now())`;
        sql = mysql.format(sql, [openid, brands_id]);

        ms.log.info("insertLog logs from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            ms.log.error(sql , "error: ", error);
            throw new Error(error);
        }
    }
}

export default UserSubscribe;