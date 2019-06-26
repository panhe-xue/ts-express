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

    constructor() {
    }
    /**
     * 获取是否在库了有status为0的数据
     * @param openid 用户标识
     * @param brand_id 品牌id
     */
    async getHasThisBrands(openid: string, brand_id: number) {
        let sql = `
        select * from ${GetBrandsDao.TABLE_NAME}
        where status = 0 and openid = ? and brands_id = ?`;
        sql = mysql.format(sql, [openid, brand_id]);
        console.info("getNotSubscribeBrands 获取所有brands数 from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
    /**
     * 数据库插入这条数据
     * @param openid 用户标识
     * @param brand_id 品牌id
     */
    async insertThisBrands(openid: string, brand_id: number) {
        let sql = `
        insert into ${GetBrandsDao.TABLE_NAME} (openid, brands_id, status, create_time) values (?, ?, 1, now())`;

        sql = mysql.format(sql, [openid, brand_id]);
        console.info("insertThisBrands 插入该用户订阅品牌数据 from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
    /**
     * 更新订阅状态
     * @param openid 用户标识
     * @param brand_id 品牌id
     */
    async updateThisBrands(openid: string, brand_id: number, status: number) {
        let sql = `
        update ${GetBrandsDao.TABLE_NAME}
        set status = ?
        where  openid = ? and brands_id = ?`;
        sql = mysql.format(sql, [status, openid, brand_id]);
        console.info("updateThisBrands 更新该用户订阅品牌数据为订阅 from db sql:", sql);

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
