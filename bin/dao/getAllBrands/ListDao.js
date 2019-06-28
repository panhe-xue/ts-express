// import ms from "../../util/ms";
// import * as mysql from "mysql";
// /**
//  * 人员信息类
//  */
// export class ListDao{
//     /**
//      * 表名
//      */
//     static TABLE_NAME = "user_brands";
//     static TABLE_NAME_USER = "user";
//     constructor() {
//     }
//     /**
//      * 检查数据的正确性
//      * @return boolean 是否正确
//      */
//     checkData(openid: string): any {
//         let status = true; //默认为正确的数据
//         let msg = '';
//         do {
//             if(!openid) {
//                 status = false;
//                 msg = "openid不能为空"
//                 break;
//             }
//         } while (false)
//         return {
//             status: status,
//             msg: msg
//         }
//     }
//     /**
//      * 从数据库获取该用户信息
//      * @return Array 数据
//      */
//     async getUserInfoFromDB() {
//         let whereSqlString: string = '';
//         whereSqlString = this.getWhereSqlStr();
//         let sql = `select * from ${ListDao.TABLE_NAME} ${whereSqlString} limit ?,?;`;
//         sql = mysql.format(sql, [this.pageBegin, this.pageSize]);
//         console.info("get user info from db sql:", sql);
//         try {
//             let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
//             return rows;
//         } catch (error) {
//             console.log(sql , "error: ", error);
//             throw new Error(error);
//         }
//     }
//     getWhereSqlStr() {
//         let resultString:string = "";
//         let unit_name = `%${this.unit_name}%`;
//         let unit_nature_type = `%${this.unit_nature_type}%`;
//         //let unit_include = `${this.unit_include}`;
//         // resultString += `where unit_name LIKE ${mysql.escape(unit_name)}
//         // and unit_nature_type LIKE ${mysql.escape(unit_nature_type)}
//         // and unit_include = ${mysql.escape(unit_nature_type)}
//         // `;
//         resultString += `where unit_name LIKE ${mysql.escape(unit_name)}
//         and unit_nature_type LIKE ${mysql.escape(unit_nature_type)}
//         `;
//         return resultString
//     }
//     /**
//      * 从数据库获取总条数
//      * @return Array 数据
//      */
//     async getAllNumFromDB() {
//         let whereSqlString: string = '';
//         whereSqlString = this.getWhereSqlStr();
//         let sql = `select count(*) as c from ${ListDao.TABLE_NAME} ${whereSqlString};`;
//         sql = mysql.format(sql, [this.pageBegin, this.pageSize]);
//         console.info("get user info from db sql:", sql);
//         try {
//             let rows = await ms.mysql["subscribe_to_new_thing"].execSql(sql);
//             return rows[0].c;
//         } catch (error) {
//             console.log(sql , "error: ", error);
//             throw new Error(error);
//         }
//     }
// }
//# sourceMappingURL=ListDao.js.map