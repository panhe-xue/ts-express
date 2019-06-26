import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 人员信息类
 */
export class GetBrandsDao{
    /**
     * 表名
     */
    static TABLE_NAME = "user_brands";
    static TABLE_NAME_BRANDS = "brands";

    constructor() {
    }
    /**
     * 获取已经订阅的brands总数
     * @return Array 数据
     */
    async getHasSubscribeBrandsCount(openid: string) {
        let sql = `
        select count(*) as count from ${GetBrandsDao.TABLE_NAME} A
        left join ${GetBrandsDao.TABLE_NAME_BRANDS} B
        on A.brands_id = B.id
        where A.openid = ? and A.status = 1 order by A.create_time desc;
        `;
        sql = mysql.format(sql, [openid]);
        console.info("getHasSubscribeBrandsCount user from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows[0].count;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }

    /**
     *
     * @return Array 数据
     */
    async getHasSubscribeBrands(openid: string) {
        let sql = `
        select B.* from ${GetBrandsDao.TABLE_NAME} A
        left join ${GetBrandsDao.TABLE_NAME_BRANDS} B
        on A.brands_id = B.id
        where A.openid = ? and A.status = 1 order by A.create_time desc;`;
        sql = mysql.format(sql, [ openid ]);
        console.info("getHasSubscribeBrands 获取已经订阅brands数 from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
    /**
     * 获取没有订阅数据
     * @param openid
     * @param pageNum
     */
    async getNotSubscribeBrands(openid: string, pageBegin: number, pageNum: number) {
        let sql = `
        select * from ${GetBrandsDao.TABLE_NAME_BRANDS}
        where status = 1 and id not in (
            select brands_id as id from ${GetBrandsDao.TABLE_NAME} where openid = ? and status = 1
        )
        order by create_time desc limit ?, ?;`;
        sql = mysql.format(sql, [openid, +pageBegin, +pageNum]);
        console.info("getNotSubscribeBrands 获取没有订阅的brands详情数据 from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
    /**
     * 获取没有订阅总数
     * @param openid
     * @param pageNum
     */
    async getNotSubscribeBrandsCount(openid: string) {
        let sql = `
        select count(*) as count from ${GetBrandsDao.TABLE_NAME_BRANDS}
        where status = 1 and id not in (
            select brands_id as id from ${GetBrandsDao.TABLE_NAME} where openid = ?
        )
        order by create_time desc;`;
        sql = mysql.format(sql, [openid]);
        console.info("getNotSubscribeBrands 获取没有订阅的brands总数数 from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows[0].count;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
    /**
     * 统计新增卡片总数
     * @param openid
     * @param data
     */
    async getNewAddBrands(data: any, lastTime: any) {
        let whereStr = ''
        if(data.new_user === 0 && lastTime !== null) {
            whereStr += ' and create_time >= ' + lastTime
        }
        let sql = `
            select * from ${GetBrandsDao.TABLE_NAME_BRANDS} where 1=1 ${whereStr}
            order by create_time desc;
        `;
        console.info("getNewAddBrands 获取新增标签数据 from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}

export default GetBrandsDao;
