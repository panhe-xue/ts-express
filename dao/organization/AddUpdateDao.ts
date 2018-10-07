import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 人员增加类
 */
export class AddUpdateDao{
    public params: any;
    /**
     * 表名
     */
    static TABLE_NAME = "user_info";
    static INSERT_FEILD: any[] = [
        "unit_serial_number", "unit_full_name", "unit_simple_name", "unit_name",
        "unit_affiliation", "unit_nature_type", "unit_level", "uint_administrative_divsion", 
        "unit_location_level", "name_of_superior_unit", "superior_unit_code", 
        "head_of_unit", "unit_establishment_approval_time", "unit_establishment_approval_number", 
        "unit_revoke_approval_time", "unit_revokes_approval_number", "unit_revokes_name_of_authority", 
        "registerd_capital", "unit_department_police_type", "unit_encode", "unit_code", 
        "cancel_logo", "poclie_station_type", "poclie_manage_number", "unit_catergory", 
        "level_num", "police_number", "civil_code", "Corporate identity", "registration_authority", 
        "job_range", "fund_sources", "establish_approval_name", "update_time_authority"
    ]
    constructor(params: any) {
        this.params = params;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    checkData(): Object {
        let self = this;
        let status = true; //默认为正确的数据
        let msg;
        do {
            //单位名称
            let unit_name = self.params.unit_name;
            //单位序号
            let unit_serial_number = self.params.unit_serial_number;
            //单位编码
            let unit_encode = self.params.unit_encode;
            //单位级别
            let unit_level = self.params.unit_level;

            if(!unit_serial_number) {
                status = false;
                msg = "单位序号必填";
                break;
            }
            if(!unit_name) {
                status = false;
                msg = "单位名称必填";
                break;
            }
            if(!unit_encode) {
                status = false;
                msg = "单位编码必填";
                break;
            }
            if(!unit_level) {
                status = false;
                msg = "单位级别必填";
                break;
            }
        } while (false)

        return {
            status: status,
            msg: msg
        }
    }
    /**
     * 从数据库获取该用户信息
     * @return Array 数据
     */
    async doAdd() {
        let result: any[] = [];

        let whereSqlString: string = '';
        let sql = `replace into ${AddUpdateDao.TABLE_NAME} (${AddUpdateDao.INSERT_FEILD.join(',')}) values (?)`;
        console.info("get user info from db sql:", sql);
        let values: any[] = AddUpdateDao.INSERT_FEILD.map(item => (this.params[item] || '0'));
        try {
            let rows = await ms.mysql["siping_public_security"].execSql(sql, values);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}
/**
 * 数据转换工具
 */
export class TurnTool{
    static TABLE_NAME = "user_info";
    static INSERT_FEILD_MAP = {
        "unit_serial_number" : "单位序列号",
        "unit_full_name" : "单位全称", 
        "unit_simple_name" :  "单位简称",
        "unit_name" : "单位名称",
        "unit_affiliation" : "单位隶属关系",
        "unit_nature_type" : "单位性质类别",
        "unit_level" : "单位级别",
        "uint_administrative_divsion" :"单位所在政区", 
        "unit_location_level" : "单位所在层级", 
        "name_of_superior_unit" : "上级单位名称", 
        "superior_unit_code" : "上级单位代码", 
        "head_of_unit" : "单位负责人",
        "unit_establishment_approval_time" : "单位成立批准时间", 
        "unit_establishment_approval_number" : "单位成立批准文号",
        "unit_revoke_approval_time" : "单位撤消批准时间", 
        "unit_revokes_approval_number" : "单位撤消批准文号",
        "unit_revokes_name_of_authority" : "单位撤消批准机关名称",
        "registerd_capital" : "注册资金", 
        "unit_department_police_type" : "单位所属部门与警种", 
        "unit_encode" : "单位编码",
        "unit_code" : "单位代码" ,
        "cancel_logo" : "撤销标识",
        "poclie_station_type" : "派出所类型",
        "poclie_manage_number" : "派出所管理户数",
        "unit_catergory" : "单位类别",
        "level_num" : "单位层次",
        "police_number" :"派出所人数", 
        "civil_code" : "公务员系统编码",
        "Corporate identity" : "法人单位标识",
        "registration_authority" : "登记管理机关",
        "job_range" : "业务范围",
        "fund_sources" : "经费来源" ,
        "establish_approval_name" : "单位成立批准机关名称",
        "update_time_authority" : "机构更新时间"
    }
    static INSERT_FEILD: any[] = [
        "unit_serial_number", "unit_full_name", "unit_simple_name", "unit_name",
        "unit_affiliation", "unit_nature_type", "unit_level", "uint_administrative_divsion", 
        "unit_location_level", "name_of_superior_unit", "superior_unit_code", 
        "head_of_unit", "unit_establishment_approval_time", "unit_establishment_approval_number", 
        "unit_revoke_approval_time", "unit_revokes_approval_number", "unit_revokes_name_of_authority", 
        "registerd_capital", "unit_department_police_type", "unit_encode", "unit_code", 
        "cancel_logo", "poclie_station_type", "poclie_manage_number", "unit_catergory", 
        "level_num", "police_number", "civil_code", "Corporate identity", "registration_authority", 
        "job_range", "fund_sources", "establish_approval_name", "update_time_authority",
    ]
    public data;
    constructor(data) {
        this.data = data;
    }
    doTurn(): any[] {
        console.log(TurnTool.INSERT_FEILD.length, '这是源的长度');
        let result:any = [];

        this.data.map((rowsData) => {
            let rowItem:any = [];
            rowItem = TurnTool.INSERT_FEILD.map((item) => {
                let key = TurnTool.INSERT_FEILD_MAP[item];
                return (rowsData[key] || '0')
            })
            result.push(rowItem);
        })
        return result;
    }
    /**
     * 批量插入操作
     */
    async doAddAll(params) {
        let result: any[] = [];

        let whereSqlString: string = '';

        let sql = `insert into ${TurnTool.TABLE_NAME} (${TurnTool.INSERT_FEILD.join(',')}) values ?`;

        console.info("get user info from db sql:", sql);
        try {
            let rows = await ms.mysql["siping_public_security"].execSql(sql, params);
            return rows;
        } catch (error) {
            //console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}