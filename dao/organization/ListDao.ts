import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 人员信息类
 */
export class ListDao{
    public content: any;
    public pageBegin: number;
    public pageSize:number;

    public unit_name ;//单位名称 
    public unit_nature_type; //单位性质类别 
    //public unit_include; //是否包含下级机构（true & false）
    /**
     * 表名
     */
    static TABLE_NAME = "origanization";

    constructor(content: any, pageBegin:number, pageSize:number) {
        this.pageBegin = +pageBegin;
        this.pageSize = +pageSize;

        this.unit_name = content.unit_name || '';  
        this.unit_nature_type = content.unit_type || '';
        //this.unit_include = this.content.unit_include;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    checkData(): any {
        let status = true; //默认为正确的数据
        let msg = '';

        do {
            if(!this.unit_name) {
                status = false;
                msg = "单位名称不能为空"
                break;
            }
            if(!this.unit_nature_type) {
                status = false;
                msg = "单位性质类别不能为空"
                break;
            }
            // if(this.unit_include == undefined) {
            //     status = false
            //     msg = "是否包含下级机构不能为空"
            //     break;
            // }
        } while (false)

        return {
            status: status,
            msg: msg
        }
    }
    /**
     * 从数据库获取该用户信息
     * @return Array 数据
     */
    async getUserInfoFromDB() {

        let whereSqlString: string = '';
        whereSqlString = this.getWhereSqlStr();
        let sql = `select * from ${ListDao.TABLE_NAME} ${whereSqlString} limit ?,?;`;
        sql = mysql.format(sql, [this.pageBegin, this.pageSize]);
        console.info("get user info from db sql:", sql);

        try {
            let rows = await ms.mysql["siping_public_security"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
    getWhereSqlStr() {
        let resultString:string = "";
        let unit_name = `%${this.unit_name}%`;
        let unit_nature_type = `%${this.unit_nature_type}%`;
        //let unit_include = `${this.unit_include}`;
        
        // resultString += `where unit_name LIKE ${mysql.escape(unit_name)} 
        // and unit_nature_type LIKE ${mysql.escape(unit_nature_type)}
        // and unit_include = ${mysql.escape(unit_nature_type)}
        // `;
        resultString += `where unit_name LIKE ${mysql.escape(unit_name)} 
        and unit_nature_type LIKE ${mysql.escape(unit_nature_type)}
        `;
        return resultString
    }

    /**
     * 从数据库获取总条数
     * @return Array 数据
     */
    async getAllNumFromDB() {
        let whereSqlString: string = '';
        whereSqlString = this.getWhereSqlStr();
        let sql = `select count(*) as c from ${ListDao.TABLE_NAME} ${whereSqlString};`;
        sql = mysql.format(sql, [this.pageBegin, this.pageSize]);
        console.info("get user info from db sql:", sql);

        try {
            let rows = await ms.mysql["siping_public_security"].execSql(sql);
            return rows[0].c;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}




