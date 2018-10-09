import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 人员信息类
 */
export class ListDao{
    public content: any;
    public pageBegin: number;
    public pageSize:number;

    public name ;//姓名 
    public unit; //单位名称 
    public job; //职务 
    public marking; //套改标识 
    public degree; //学位
    public education; //学历
    /**
     * 表名
     */
    static TABLE_NAME = "organization";

    constructor(content: any, pageBegin:number, pageSize:number) {
        this.content = content;
        this.pageBegin = +pageBegin;
        this.pageSize = +pageSize;

        this.name = this.content.name;  
        this.unit = this.content.unit;
        this.job = this.content.job;
        this.marking = this.content.marking;
        this.degree = this.content.degree;
        this.education = this.content.education;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    checkData(): any {
        let status = true; //默认为正确的数据
        let msg = '';

        do {
            if(!this.name) {
                status = false;
                msg = "单位名称不能为空"
                break;
            }
            if(!this.unit) {
                status = false;
                msg = "单位性质类别不能为空"
                break;
            }
            if(this.job == undefined) {
                status = false
                msg = "是否包含下级机构不能为空"
                break;
            }
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
        let unit_name = `%${this.name}%`;
        let unit_nature_type = `%${this.job}%`;
        let unit_include = `${this.name}`;
        
        resultString += `where unit_name LIKE ${mysql.escape(unit_name)} 
        and unit_nature_type LIKE ${mysql.escape(unit_nature_type)}
        and unit_include = ${mysql.escape(unit_nature_type)}
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




