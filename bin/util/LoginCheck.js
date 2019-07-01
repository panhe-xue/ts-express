"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RetStatus_1 = require("./RetStatus");
var ms_1 = require("./ms");
var LoginCheck = /** @class */ (function () {
    function LoginCheck() {
    }
    LoginCheck.prototype.handler = function (req, res, next) {
        var cookie = req.cookies.isLogin;
        var uri = req.url;
        //处理登陆情况
        if (ms_1.default.loginIgnore || cookie || uri == "/login") { //不处理登陆
            
        }
        else { //处理登陆
            res.json({
                ret: -2,
                msg: RetStatus_1.RetMsg.ERR_FORBIDDEN
            });
            return;
        }
    };
    return LoginCheck;
}());
exports.default = LoginCheck;
//# sourceMappingURL=LoginCheck.js.map