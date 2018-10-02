import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 人员信息类
 */
export class ListDao{
    public type: string;
    public type_content: any;
    public pageBegin: number;
    public pageSize:number;
    /**
     * 表名
     */
    static TABLE_NAME = "organization";

    constructor(type: string, type_content: any, pageBegin:number, pageSize:number) {
        this.type = type;
        this.type_content = type_content;
        this.pageBegin = +pageBegin;
        this.pageSize = +pageSize;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    checkData(): Boolean {
        let status = true; //默认为正确的数据
        do {
            if(this.type != "all" && !this.type_content) {
                status = false;
                break;
            }
            if((this.type == "age" || this.type == "id_card") && isNaN(this.type_content)) {
                status = false;
                break;
            }
            if(isNaN(this.pageBegin)  || isNaN(this.pageSize) || this.pageSize < 1) {
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
        do{
            if(this.type == 'all') {
                break
            }
            if(this.type == "name" || this.type == "id_card") {
                let content = `%${this.type_content}%`;
                resultString += `where ${this.type} LIKE ${mysql.escape(content)}`;
                break
            }
            if(this.type == 'age') {
                let date = new Date();
                let dateLimit = `${(date.getFullYear() - this.type_content)}-${date.getMonth() + 1}-${date.getDate()}`;
                resultString += `where date_birth >= ${mysql.escape(dateLimit)}`;
                break;
            }
            if(this.type == 'unit') {
                let content = `%${this.type_content}%`;

                resultString +=
                `where work_unit_code LIKE ${mysql.escape(content)} 
                or
                work_unit_code LIKE ${mysql.escape(content)} 
                `;
                break;
            }
        }while(false)
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




