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
        select *  from ${NewUser.TABLE_NAME_LOG}
        where openid = ? and type = 0 order by login_time desc;
        `;
        let sql1 = `
        select *  from ${NewUser.TABLE_NAME_LOG}
        where openid = ? and type = 1 order by login_time desc;
        `;
        sql = mysql.format(sql, [openid]);
        console.info("is_new_user logs from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            if(rows.length <= 1 ) {
                return true
            } else {
                let rows1 = await ms.mysql["subscribe_to_new_thing"].execSql(mysql.format(sql1, [ openid ]));
                return (rows1[0].login_time || null)
            }
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}

export default NewUser;