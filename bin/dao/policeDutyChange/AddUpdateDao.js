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
var AddUpdateDao = /** @class */ (function () {
    function AddUpdateDao(params) {
        this.params = params;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    AddUpdateDao.prototype.checkData = function () {
        var status = true; //默认为正确的数据
        var msg = '';
        do {
            if (!this.params.unit_name) {
                status = false;
                msg = "单位名称不能为空";
                break;
            }
            if (!this.params.unit_nature_type) {
                status = false;
                msg = "单位性质类别不能为空";
                break;
            }
            if (this.params.unit_include == undefined) {
                status = false;
                msg = "是否包含下级机构不能为空";
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
    AddUpdateDao.prototype.doAdd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, whereSqlString, sql, values, rows, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        whereSqlString = '';
                        sql = "replace into " + AddUpdateDao.TABLE_NAME + " (" + AddUpdateDao.INSERT_FEILD.join(',') + ") values (?)";
                        console.info("get user info from db sql:", sql);
                        values = AddUpdateDao.INSERT_FEILD.map(function (item) { return (_this.params[item] || '0'); });
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
    AddUpdateDao.TABLE_NAME = "police_duty_change_information_set";
    AddUpdateDao.INSERT_FEILD = [
        "name", "sex", "birth_date", "native_place", "nation", "political_status",
        "id_card", "education", "graduate_school_and_major", "the_highest_degree",
        "degree_time", "begin_job_time", "current_word_uint", "present_post",
        "civil_service_registration_time", "job_salary", "current_job_level",
        "time_of_current_job_level", "county_level", "time_of_county_level",
        "qualification_for_police_technical_posts", "logo_of_military_transferred_cadres",
        "rank_of_military_transferred_cadres", "break_discipline_in_three_years",
        "introduce_of_break", "annual_assessment", "introduce_of_annual_assessment",
        "participate_in_the_reform", "not_particepate_explain", "reason_of_stop_change",
        "cancel_promote_introduce", "job_sequence", "job_after_change", "time_ater_change", "all_time_after_change",
        "continue_time_after_change", "is_promote", "job_of_promote", "logo_of_change"
    ];
    return AddUpdateDao;
}());
exports.AddUpdateDao = AddUpdateDao;
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
                        console.info("get user info from db sql:", sql);
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
        "unit_serial_number": "单位序列号",
        "unit_full_name": "单位全称",
        "unit_simple_name": "单位简称",
        "unit_name": "单位名称",
        "unit_affiliation": "单位隶属关系",
        "unit_nature_type": "单位性质类别",
        "unit_level": "单位级别",
        "uint_administrative_divsion": "单位所在政区",
        "unit_location_level": "单位所在层级",
        "name_of_superior_unit": "上级单位名称",
        "superior_unit_code": "上级单位代码",
        "head_of_unit": "单位负责人",
        "unit_establishment_approval_time": "单位成立批准时间",
        "unit_establishment_approval_number": "单位成立批准文号",
        "unit_revoke_approval_time": "单位撤消批准时间",
        "unit_revokes_approval_number": "单位撤消批准文号",
        "unit_revokes_name_of_authority": "单位撤消批准机关名称",
        "registerd_capital": "注册资金",
        "unit_department_police_type": "单位所属部门与警种",
        "unit_encode": "单位编码",
        "unit_code": "单位代码",
        "cancel_logo": "撤销标识",
        "poclie_station_type": "派出所类型",
        "poclie_manage_number": "派出所管理户数",
        "unit_catergory": "单位类别",
        "level_num": "单位层次",
        "police_number": "派出所人数",
        "civil_code": "公务员系统编码",
        "Corporate identity": "法人单位标识",
        "registration_authority": "登记管理机关",
        "job_range": "业务范围",
        "fund_sources": "经费来源",
        "establish_approval_name": "单位成立批准机关名称",
        "update_time_authority": "机构更新时间"
    };
    TurnTool.INSERT_FEILD = [
        "unit_serial_number", "unit_full_name", "unit_simple_name", "unit_name",
        "unit_affiliation", "unit_nature_type", "unit_level", "uint_administrative_divsion",
        "unit_location_level", "name_of_superior_unit", "superior_unit_code",
        "head_of_unit", "unit_establishment_approval_time", "unit_establishment_approval_number",
        "unit_revoke_approval_time", "unit_revokes_approval_number", "unit_revokes_name_of_authority",
        "registerd_capital", "unit_department_police_type", "unit_encode", "unit_code",
        "cancel_logo", "poclie_station_type", "poclie_manage_number", "unit_catergory",
        "level_num", "police_number", "civil_code", "Corporate identity", "registration_authority",
        "job_range", "fund_sources", "establish_approval_name", "update_time_authority",
    ];
    return TurnTool;
}());
exports.TurnTool = TurnTool;
//# sourceMappingURL=AddUpdateDao.js.map