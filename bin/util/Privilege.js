"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Privilege = /** @class */ (function () {
    function Privilege() {
    }
    Privilege.prototype.handler = function (req, res, next) {
        var cookie = req.cookies.isLogin;
        next();
        /* var userId = req.session.userId || "";
        let uri = req.url;
        
        //处理权限情况
        acl.isAllowed(userId, req.path, '*')
        .then(allowed => {
            if(allowed) {
                next()
            }else {
                res.json({
                  ret: RetCode.ERR_PRIVILEGE,
                  msg: RetMsg.ERR_PRIVILEGE
                });
                return;
            }
        })
        .catch((e) => {
            res.json({
                ret: RetCode.ERR_PRIVILEGE,
                msg: RetMsg.ERR_PRIVILEGE,
                subMsg: e.message
            })
            return
        }) */
    };
    return Privilege;
}());
exports.default = Privilege;
//# sourceMappingURL=Privilege.js.map