import ms from "../../util/ms";
import * as mysql from "mysql";
import { getRandomNumber } from "../../util/util";
/**
 * 人员信息类
 */
export class GetFeedsDao{
    /**
     * 表名
     */
    static TABLE_NAME = "feeds";
    static TABLE_NAME_USER_BRANDS = "user_brands";
    static TABLE_NAME_BRANDS = "brands";
    static TABLE_NAME_USER_LOVE = "user_love";

    constructor() {
    }
    /**
     * 获取已经订阅的brands总数
     * @return Array 数据
     */
    async getHasSubscribeFeeds(openid: string, pageBegin: number, pageNum: number) {
        let sql = `
            select a1.*, if(b1.id, 1, 0) as loved from
                (
                select A.*, C.logo as logo from ${GetFeedsDao.TABLE_NAME} A
                left join ${GetFeedsDao.TABLE_NAME_USER_BRANDS} B
                on A.brands_id = B.brands_id
                left join ${GetFeedsDao.TABLE_NAME_BRANDS} C
                on A.brands_id = C.id
                where B.openid = ? and B.status = 1 order by A.create_time desc limit ?, ?
                ) as a1
                left join
                ( SELECT * FROM ${GetFeedsDao.TABLE_NAME_USER_LOVE} WHERE openid = ?) AS b1
                ON a1.id = b1.feed_id
        `;
        sql = mysql.format(sql, [openid, +pageBegin, +pageNum, openid]);
        console.info("getHasSubscribeFeeds user from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
    /**
     * 标签自增love数据
     * @return Array 数据
     */
    async userLove(feed_id: number, type: number) {
        let ty = type === 0 ? '-' : '+'
        let sql = `
            update ${GetFeedsDao.TABLE_NAME} set love_num = love_num ${ty} 1
            where id = ?
        `;
        sql = mysql.format(sql, [feed_id]);
        console.info("userLove商品喜欢数增加 user from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
    /**
     * 插入love数据
     * @return Array 数据
     */
    async addUserLove(openid: string, feed_id: number) {
        let sql = `
            insert into ${GetFeedsDao.TABLE_NAME_USER_LOVE} (openid, feed_id, create_time) values (?, ?, now())
        `;
        sql = mysql.format(sql, [openid, feed_id]);
        console.info("adduserLove插入喜欢表 user from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
    /**
     * 删除love数据
     * @return Array 数据
     */
    async delUserLove(openid: string, feed_id: number) {
        let sql = `
            delete from ${GetFeedsDao.TABLE_NAME_USER_LOVE} where
            openid = ? and feed_id = ?
        `;
        sql = mysql.format(sql, [openid, feed_id]);
        console.info("deluserLove商品用户取消 user from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
    /**
     * 增加view数据
     * @return Array 数据
     */
    async addUserView(openid: string, feed_id: Array<number>) {
        let randomNum = Math.floor(getRandomNumber(5, 20));
        let ids = feed_id.join(',');
        let sql = `
            update ${GetFeedsDao.TABLE_NAME} set view_num = view_num + ${randomNum}
            where id in (${ids})
        `;
        sql = mysql.format(sql, [feed_id]);
        console.info("userLove商品喜欢数增加 user from db sql:", sql);

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
