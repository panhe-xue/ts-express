import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 登陆类
 */
class LoginDao{
    /**
     * 表名
     */
    static TABLE_NAME = "user";

    constructor() {
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    checkData(code: string): Boolean {
        let status = true; //默认为正确的数据
        if(!code) {
            status = false;
            return status;
        }
        return status
    }
    /**
     * 从数据库获取该用户信息
     * @return Array 数据
     */
    async getOpenid(openid: string) {
        let result: any[] = [];

        let sql = `select * from ${LoginDao.TABLE_NAME} where openid = ?`;
        sql = mysql.format(sql, [openid]);
        ms.log.info("get user from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            ms.log.error(sql , "error: ", error);
            throw new Error(error);
        }
    }
    /**
     * 登录授权插入openid
     * @return Array 数据
     */
    public async InsertOpenid(openid: string) {
        let result: any[] = [];

        let sql = `insert into ${LoginDao.TABLE_NAME} (openid, create_time) values (?, now());`;
        sql = mysql.format(sql, [openid]);
        ms.log.info("insert openid from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            ms.log.error(sql , "error: ", error);
            throw new Error(error);
        }
    }
}

export default LoginDao;