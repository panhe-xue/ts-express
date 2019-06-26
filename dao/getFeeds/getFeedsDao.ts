import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 人员信息类
 */
export class GetFeedsDao{
    /**
     * 表名
     */
    static TABLE_NAME = "feeds";
    static TABLE_NAME_USER_BRANDS = "user_brands";

    constructor() {
    }
    /**
     * 获取已经订阅的brands总数
     * @return Array 数据
     */
    async getHasSubscribeFeeds(openid: string, pageBegin: number, pageNum: number) {
        let sql = `
        select A.* from ${GetFeedsDao.TABLE_NAME} A
        left join ${GetFeedsDao.TABLE_NAME_USER_BRANDS} B
        on A.brands_id = B.brands_id
        where B.openid = ? and B.status = 1 order by A.create_time desc limit ?, ?;
        `;
        sql = mysql.format(sql, [openid, +pageBegin, +pageNum]);
        console.info("getHasSubscribeFeeds user from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}

export default GetFeedsDao;
