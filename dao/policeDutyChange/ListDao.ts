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
    public current_word_uint; //单位名称 
    public present_post; //职务 
    public logo_of_change; //套改标识 
    public the_highest_degree; //学位
    public education; //学历
    /**
     * 表名
     */
    static TABLE_NAME = "police_duty_change_information_set";

    constructor(content: any, pageBegin:number, pageSize:number) {
        this.content = content;
        this.pageBegin = +pageBegin;
        this.pageSize = +pageSize;

        this.name               = this.content.name;  
        this.current_word_uint  = this.content.unit;
        this.present_post       = this.content.job;
        this.logo_of_change     = this.content.marking;
        this.the_highest_degree = this.content.degree;
        this.education          = this.content.education;
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
                msg = "姓名不能为空"
                break;
            }
            if(!this.current_word_uint) {
                status = false;
                msg = "单位名称不能为空"
                break;
            }
            if(this.present_post == undefined) {
                status = false
                msg = "职务不能为空"
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

        let name = `%${this.name}%`;
        let current_word_uint = `%${this.current_word_uint}%`;
        let present_post = `%${this.present_post}%`;
        let logo_of_change = `%${this.logo_of_change}%`;
        let the_highest_degree = `%${this.the_highest_degree}%`;
        let education = `%${this.education}%`;
        
        resultString += `where name LIKE ${mysql.escape(name)} 
        and current_word_uint LIKE ${mysql.escape(current_word_uint)}
        and present_post LIKE ${mysql.escape(present_post)}
        and logo_of_change LIKE ${mysql.escape(logo_of_change)}
        and the_highest_degree LIKE ${mysql.escape(the_highest_degree)}
        and education LIKE ${mysql.escape(education)}
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




