import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 人员增加类
 */
export class AddUserInfoDao{
    public params: any;
    /**
     * 表名
     */
    static TABLE_NAME = "user_info";

    constructor(params: any) {
        this.params = params;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    checkData(): Boolean {
        let status = true; //默认为正确的数据
        do {
            if(isNaN(this.params) || this.params < 1) {
                status = false
                break;
            }
        } while (false)

        return status
    }
    /**
     * 从数据库获取该用户信息
     * @return Array 数据
     */
    async doAdd() {
        let result: any[] = [];

        let whereSqlString: string = '';
        let sql = `insert into ${AddUserInfoDao.TABLE_NAME} values ?`;
        sql = mysql.format(sql, [this.params]);
        console.info("get user info from db sql:", sql);

        try {
            let rows = await ms.mysql["siping_public_security"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}