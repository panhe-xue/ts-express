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
     * 从获取brands总数
     * @return Array 数据
     */
    async getAllBrands(openid: string) {
        let sql = `select count(*) as count from ${GetBrandsDao.TABLE_NAME} where openid = ? and status = 1`;
        sql = mysql.format(sql, [openid]);
        console.info("getAllBrands user from db sql:", sql);

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
    async getAllNumFromDB(openid: string) {
        let result = {
            hasSubscribe: [],
            toSubscribe: []
        }
        let sql = `select brands_id from ${GetBrandsDao.TABLE_NAME} where openid = ?;`;
        let sql1 = `select * from ${GetBrandsDao.TABLE_NAME_BRANDS} order by create_time desc;`;
        sql = mysql.format(sql, [ openid ]);
        console.info("get user info from db sql:", sql);

        try {
            let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
            let res = await Promise.all([ms.mysql["subscribe_to_new_thing"].execSql(sql1), ms.mysql["subscribe_to_new_thing"].execSql(sql)]);
            let allBrands = res[0];
            let doneBrands = res[1];
            let doneArr = doneBrands.reduce((all, item, index) => {
                all.push(item.brands_id)
                return all
            }, []);
            allBrands.map((item) => {
                if(doneArr.indexOf(item.id) > -1) {
                    result.hasSubscribe.push(item)
                } else {
                    result.toSubscribe.push(item)
                }
            })
            return result;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}

export default GetBrandsDao;
