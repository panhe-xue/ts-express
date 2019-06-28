"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ms_1 = require("../../util/ms");
/**
 * 人员增加类
 */
var AddUpdateUserInfoDao = /** @class */ (function () {
    function AddUpdateUserInfoDao(params) {
        this.params = params;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    AddUpdateUserInfoDao.prototype.checkData = function () {
        var self = this;
        var status = true; //默认为正确的数据
        var msg;
        do {
            //身份证号码
            var id_card = self.params.id_card;
            //性别
            var sex = self.params.sex;
            //姓名
            var name = self.params.name;
            //出身日期
            var date_birth = self.params.date_birth;
            if (!id_card) {
                status = false;
                msg = "身份证号码必填";
                break;
            }
            if (!name) {
                status = false;
                msg = "姓名必填";
                break;
            }
            if (!sex) {
                status = false;
                msg = "性别必填";
                break;
            }
            if (!date_birth) {
                status = false;
                msg = "出生日期必填";
                break;
            }
        } while (false);
        return {
            status: status,
            msg: msg
        };
    };
    /**
     * 从数据库获取该用户信息
     * @return Array 数据
     */
    AddUpdateUserInfoDao.prototype.doAdd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, whereSqlString, sql, values, rows, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        whereSqlString = '';
                        sql = "replace into " + AddUpdateUserInfoDao.TABLE_NAME + " (" + AddUpdateUserInfoDao.INSERT_FEILD.join(',') + ") values (?)";
                        console.info("get user info from db sql:", sql);
                        values = AddUpdateUserInfoDao.INSERT_FEILD.map(function (item) { return (_this.params[item] || '0'); });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["siping_public_security"].execSql(sql, values)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_1 = _a.sent();
                        console.log(sql, "error: ", error_1);
                        throw new Error(error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 表名
     */
    AddUpdateUserInfoDao.TABLE_NAME = "user_info";
    AddUpdateUserInfoDao.INSERT_FEILD = [
        "id_card", "name", "sex", "work_unit_code", "job_simple_name", "job_full_name",
        "date_birth", "date_participation", "date_public_work", "nation", "police_number",
        "state_personnel", "blood_type", "police_library_logo", "category_personnel",
        "native_place", "native_heath", "birthplace", "nature_household_registration",
        "location_residence_registration", "identity", "marital_status", "secret_marking",
        "health", "address_residence_registration", "grass_roots_work_experience_time",
        "correction_value_service_age", "length_schooling_should_of_police", "political_outlook",
        "date_organization", "compile_unit_code", "unit_compilation", "personnel_departments_and_police_categories",
        "management_category", "expertise", "summary_rewards", "annual_review", "remarks", "personnel_post",
        "logo_management_cadres", "is_management_cadre", "img_url"
    ];
    return AddUpdateUserInfoDao;
}());
exports.AddUpdateUserInfoDao = AddUpdateUserInfoDao;
/**
 * 数据转换工具
 */
var TurnTool = /** @class */ (function () {
    function TurnTool(data) {
        this.data = data;
    }
    TurnTool.prototype.doTurn = function () {
        console.log(TurnTool.INSERT_FEILD.length, '这是源的长度');
        var result = [];
        this.data.map(function (rowsData) {
            var rowItem = [];
            rowItem = TurnTool.INSERT_FEILD.map(function (item) {
                var key = TurnTool.INSERT_FEILD_MAP[item];
                return (rowsData[key] || '0');
            });
            result.push(rowItem);
        });
        return result;
    };
    /**
     * 批量插入操作
     */
    TurnTool.prototype.doAddAll = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var result, whereSqlString, sql, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        whereSqlString = '';
                        sql = "insert into " + TurnTool.TABLE_NAME + " (" + TurnTool.INSERT_FEILD.join(',') + ") values ?";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, ms_1.default.mysql["siping_public_security"].execSql(sql, params)];
                    case 2:
                        rows = _a.sent();
                        return [2 /*return*/, rows];
                    case 3:
                        error_2 = _a.sent();
                        //console.log(sql , "error: ", error);
                        throw new Error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TurnTool.TABLE_NAME = "user_info";
    TurnTool.INSERT_FEILD_MAP = {
        "id_card": "居民身份号码",
        "name": "姓名",
        "sex": "性别",
        "work_unit_code": "工作单位代码",
        "job_simple_name": "职务简称",
        "job_full_name": "职务全称",
        "date_birth": "出生日期",
        "date_participation": "参加工作日期",
        "date_public_work": "参加公安工作日期",
        "nation": "民族",
        "police_number": "警号",
        "state_personnel": "人员状态",
        "blood_type": "血型",
        "police_library_logo": "警员库标志",
        "category_personnel": "人员类别",
        "native_place": "籍贯",
        "native_heath": "出生地",
        "birthplace": "成长地",
        "nature_household_registration": "户口性质",
        "location_residence_registration": "户籍所在地名称",
        "identity": "个人身份",
        "marital_status": "婚姻状况",
        "secret_marking": "涉密标志",
        "health": "健康状况",
        "address_residence_registration": "户籍所在地详址",
        "grass_roots_work_experience_time": "基层工作经历时间",
        "correction_value_service_age": "工龄计算校正值",
        "length_schooling_should_of_police": "警衔应加学制年限",
        "political_outlook": "政治面貌",
        "date_organization": "参加组织日期",
        "compile_unit_code": "单位代码",
        "unit_compilation": "关系所在单位",
        "personnel_departments_and_police_categories": "人员所属部门和警种",
        "management_category": "管理类别",
        "expertise": "专长",
        "summary_rewards": "奖励综述",
        "annual_review": "年度考核综述",
        "remarks": "备注",
        "personnel_post": "人员工作岗位",
        "logo_management_cadres": "协管干部标识",
        "is_management_cadre": "是否是协管干部",
        "img_url": "人员照片",
    };
    TurnTool.INSERT_FEILD = [
        "id_card", "name", "sex", "work_unit_code", "job_simple_name", "job_full_name",
        "date_birth", "date_participation", "date_public_work", "nation", "police_number",
        "state_personnel", "blood_type", "police_library_logo", "category_personnel",
        "native_place", "native_heath", "birthplace", "nature_household_registration",
        "location_residence_registration", "identity", "marital_status", "secret_marking",
        "health", "address_residence_registration", "grass_roots_work_experience_time",
        "correction_value_service_age", "length_schooling_should_of_police", "political_outlook",
        "date_organization", "compile_unit_code", "unit_compilation", "personnel_departments_and_police_categories",
        "management_category", "expertise", "summary_rewards", "annual_review", "remarks", "personnel_post",
        "logo_management_cadres", "is_management_cadre", "img_url"
    ];
    return TurnTool;
}());
exports.TurnTool = TurnTool;
//# sourceMappingURL=AddUpdateUserInfoDao.js.map