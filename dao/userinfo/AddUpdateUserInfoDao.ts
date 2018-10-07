import ms from "../../util/ms";
import * as mysql from "mysql";
/**
 * 人员增加类
 */
export class AddUpdateUserInfoDao{
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
        let sql = `replace into ${AddUpdateUserInfoDao.TABLE_NAME} (${AddUpdateUserInfoDao.INSERT_FEILD.join(',')}) values (?)`;
        console.info("get user info from db sql:", sql);
        let values: any[] = AddUpdateUserInfoDao.INSERT_FEILD.map(item => (this.params[item] || '0'));
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
        "id_card":"居民身份号码" ,
        "name": "姓名",
        "sex":"性别" ,
        "work_unit_code":"工作单位代码" ,
        "job_simple_name":"职务简称",
        "job_full_name":"职务全称" ,
        "date_birth":"出生日期" ,
        "date_participation":"参加工作日期" ,
        "date_public_work":"参加公安工作日期" ,
        "nation":"民族" ,
        "police_number":"警号" ,
        "state_personnel":"人员状态"  ,
        "blood_type": "血型" ,
        "police_library_logo":"警员库标志",
        "category_personnel":"人员类别" ,
        "native_place": "籍贯" ,
        "native_heath":"出生地" ,
        "birthplace":"成长地" ,
        "nature_household_registration":"户口性质" ,
        "location_residence_registration":"户籍所在地名称" ,
        "identity":"个人身份" ,
        "marital_status":"婚姻状况" ,
        "secret_marking":"涉密标志" ,
        "health":"健康状况" ,
        "address_residence_registration":"户籍所在地详址" ,
        "grass_roots_work_experience_time":"基层工作经历时间" ,
        "correction_value_service_age":"工龄计算校正值" ,
        "length_schooling_should_of_police":"警衔应加学制年限" ,
        "political_outlook":"政治面貌" ,
        "date_organization":"参加组织日期" ,
        "compile_unit_code":"单位代码" ,
        "unit_compilation":"关系所在单位" ,
        "personnel_departments_and_police_categories":"人员所属部门和警种" ,
        "management_category":"管理类别" ,
        "expertise":"专长" ,
        "summary_rewards":"奖励综述" ,
        "annual_review":"年度考核综述" ,
        "remarks":"备注" ,
        "personnel_post":"人员工作岗位" ,
        "logo_management_cadres":"协管干部标识" ,
        "is_management_cadre":"是否是协管干部",
        "img_url":"人员照片",
    }
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

        //console.info("get user info from db sql:", sql);
        try {
            let rows = await ms.mysql["siping_public_security"].execSql(sql, params);
            return rows;
        } catch (error) {
            //console.log(sql , "error: ", error);
            throw new Error(error);
        }
    }
}