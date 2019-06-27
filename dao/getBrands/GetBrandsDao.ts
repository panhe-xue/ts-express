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
    static TABLE_NAME_FEEDS = "feeds";

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
            select brands_id as id from ${GetBrandsDao.TABLE_NAME} where openid = ? and status = 1
        )
        order by create_time desc;`;
        sql = mysql.format(sql, [openid]);
        console.info("getNotSubscribeBrands 获取没有订阅的brands总数 from db sql:", sql);

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
            whereStr += ' and create_time >= "' + lastTime.toString() + '" ';
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
    /**
     * 获取已经订阅的feeds更新总数
     * @return Array 数据
     */
    async getSubscribeFeedsUpdateNum(data: any, openid: string, lastTime: any) {
        let result = { count: 0, brands: [] };

        // 获取更新feed的数量
        let sql = `
        select count(*) as count from ${GetBrandsDao.TABLE_NAME_FEEDS} A
        left join ${GetBrandsDao.TABLE_NAME} B
        on A.brands_id = B.brands_id
        where B.openid = ? and B.status = 1 and A.create_time >= "${lastTime}"
        order by A.create_time desc
        `;
        sql = mysql.format(sql, [openid]);
        console.info("getHasSubscribeFeeds获取更新的feed总量 user from db sql:", sql);

        // 获取更新feed对应的brands数量
        let sql1 = `
            select D.name as name from (
                select  A.brands_id as brands_id  from ${GetBrandsDao.TABLE_NAME_FEEDS} A
                left join ${GetBrandsDao.TABLE_NAME} B
                on A.brands_id = B.brands_id
                where B.openid = ? and B.status = 1 and A.create_time >= "${lastTime}"
                order by A.create_time desc
            ) as C
            left join ${GetBrandsDao.TABLE_NAME_BRANDS} D
            on C.brands_id = D.id
            group by C.brands_id limit 0, 3;
                `;
        sql1 = mysql.format(sql1, [openid]);
        console.info("getHasSubscribeFeedsBrands 获取更新feed对应的brand名字 user from db sql:", sql1);
        try {
            let res_row = await Promise.all([
                ms.mysql["subscribe_to_new_thing"].execSql(sql),
                ms.mysql["subscribe_to_new_thing"].execSql(sql1)
            ]);

            result.count = res_row[0][0].count;
            result.brands = res_row[1].slice(0, 3);
            return result;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}

export default GetBrandsDao;
