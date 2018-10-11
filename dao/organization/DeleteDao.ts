import ms from "../../util/ms";
import * as mysql from "mysql";

/**
 * 人员删除类
 */
export class OrganizationDeleteDao{
    public id: number;
    /**
     * 表名
     */
    static TABLE_NAME = "origanization";

    constructor(id: number) {
        this.id = id;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    checkData(): Boolean {
        let status = true; //默认为正确的数据
        do {
            if(isNaN(this.id) || this.id < 1) {
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
    async doDel() {
        let result: any[] = [];

        let whereSqlString: string = '';
        let sql = `delete from ${OrganizationDeleteDao.TABLE_NAME} where id = ?`;
        sql = mysql.format(sql, [this.id]);
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




