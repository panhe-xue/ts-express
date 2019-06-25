import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 登陆类
 */
class NewUser{
    /**
     * 表名
     */
    static TABLE_NAME_LOG = "user_logs";
    static TABLE_NAME_USER = "user";

    constructor() {
    }
    /**
     * 是否为新用户接口
     * @openid: string
     * @return boolean|date
     */
    async is_new_user(openid: string) {

        let sql = `
        select *  from ${NewUser.TABLE_NAME_LOG} A
        left join ${NewUser.TABLE_NAME_USER} B
        ON A.open_id = B.id
        where B.openid = ? order by login_time desc
        `;
        sql = mysql.format(sql, [openid]);
        console.info("is_new_user logs from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            if(rows.length <= 1 ) {
                return true
            } else {
                return rows[0].login_time
            }
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}

export default NewUser;