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
var AddUserInfoDao = /** @class */ (function () {
    function AddUserInfoDao(params) {
        this.params = params;
    }
    /**
     * 检查数据的正确性
     * @return boolean 是否正确
     */
    AddUserInfoDao.prototype.checkData = function () {
        var self = this;
        var status = true; //默认为正确的数据
        var msg;
        do {
            //身份证号码
            var id_card = self.params.id_card;
            //姓名
            var username = self.params.username;
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
            if (!username) {
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
    AddUserInfoDao.prototype.doAdd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, whereSqlString, sql, values, rows, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        whereSqlString = '';
                        sql = "insert into " + AddUserInfoDao.TABLE_NAME + " (" + AddUserInfoDao.INSERT_FEILD.join(',') + ") values (?)";
                        console.info("get user info from db sql:", sql);
                        values = AddUserInfoDao.INSERT_FEILD.map(function (item) { return (_this.params[item] || '0'); });
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
    AddUserInfoDao.TABLE_NAME = "user_info";
    AddUserInfoDao.INSERT_FEILD = [
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
    return AddUserInfoDao;
}());
exports.AddUserInfoDao = AddUserInfoDao;
//# sourceMappingURL=AddUserInfoDao.js.map