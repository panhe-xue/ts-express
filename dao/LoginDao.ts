import ms from "../util/ms";
import * as mysql from "mysql";
/**
 * 登陆类
 */
class LoginDao{
    public username: string;
    public password: number;
    /**
     * 表名
     */
    static TABLE_NAME = "account";
    static TABLE_NAME_MSG = "user_info";

    constructor(user: string, pass: number) {
        this.username = user;
        this.password = pass;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    checkData(): Boolean {
        let status = true; //默认为正确的数据
        if(!this.username) {
            status = false;
            return status;
        }
        if(!this.password) {
            status = false
            return
        }
        return status
    }
    /**
     * 从数据库获取该用户信息
     * @return Array 数据
     */
    async getUserFromDB() {
        let result: any[] = [];

        let sql = `select username, password from ${LoginDao.TABLE_NAME} where username = ?`;
        sql = mysql.format(sql, [this.username]);
        console.info("get user from db sql:", sql);

        try {
            result = await ms.mysql["siping_public_security"].execSql(sql);
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
        return result
    }
}

export default LoginDao;