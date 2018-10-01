import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 人员增加类
 */
export class AddUserInfoDao{
    public params: any;
    /**
     * 表名
     */
    static TABLE_NAME = "user_info";
    static INSERT_FEILD: any[] = [
        `id_card` , `name`, `sex`, `work_unit_code`, `job_simple_name`, `job_full_name`, 
        `date_birth`, `date_participation`, `date_public_work`, `nation`, `police_number`, 
        `state_personnel` , `blood_type`, `police_library_logo`, `category_personnel`, 
        `native_place`, `native_heath`, `birthplace`, `nature_household_registration`, 
        `location_residence_registration`, `identity`, `marital_status`, `secret_marking`, 
        `health`, `address_residence_registration`, `grass_roots_work_experience_time`, 
        `correction_value_service_age`, `length_schooling_should_of_police`, `political_outlook`, 
        `date_organization`, `compile_unit_code`, `unit_compilation`, `personnel_departments_and_police_categories`, 
        `management_category`, `expertise`, `summary_rewards`, `annual_review`, `remarks`, `personnel_post`, 
        `logo_management_cadres`, `is_management_cadre`, `img_url`
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
            //身份证号码
            let id_card = self.params.id_card;
            //性别
            let sex = self.params.sex;

            //姓名
            let name = self.params.name;
            //出身日期
            let date_birth = self.params.date_birth;
            if(!id_card) {
                status = false;
                msg = "身份证号码必填";
                break;
            }
            if(!name) {
                status = false;
                msg = "姓名必填";
                break;
            }
            if(!sex) {
                status = false;
                msg = "性别必填";
                break;
            }
            if(!date_birth) {
                status = false;
                msg = "出生日期必填";
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
        let sql = `repalce into ${AddUserInfoDao.TABLE_NAME} (${AddUserInfoDao.INSERT_FEILD.join(',')}) values (?)`;
        console.info("get user info from db sql:", sql);
        let values: any[] = AddUserInfoDao.INSERT_FEILD.map(item => (this.params[item] || '0'));
        try {
            let rows = await ms.mysql["siping_public_security"].execSql(sql, values);
            return rows;
        } catch (error) {
            console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}