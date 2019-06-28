"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ACAO = /** @class */ (function () {
    function ACAO() {
    }
    ACAO.prototype.handler = function (req, res, next) {
        var origin = req.header("origin");
        var clientIp = req.headers["x-forwarded-for-pound"] || req.headers["x-forwarded-for"] || (req.connection && req.connection.remoteAddress) || (req.socket && req.socket.remoteAddress);
        console.log("request " + req.url + " origin: " + origin + " ip: " + clientIp);
        // 如果是白名单里面的host, 则返回acao等头
        if (origin) { ///^(?:http:\/\/)?([A-Za-z0-9][A-Za-z0-9_]*\.)*(qq|pengyou|qzone|3gqq)\.com$/.test(origin)
            res.header("Access-Control-Allow-Origin", origin);
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
            res.header("Access-Control-Allow-Headers", [
                "Origin",
                "No-Cache",
                "X-Requested-With",
                "If-Modified-Since",
                "Authorization",
                "Content-Length",
                "Pragma",
                "Last-Modified",
                "Cache-Control",
                "Expires",
                "Content-Type",
                "Content-Method",
                "X-E4M-With"
            ].join());
            res.header("Timing-Allow-Origin", origin);
        }
        else {
            origin && res.header("Timing-Allow-Origin", origin);
        }
        next();
    };
    return ACAO;
}());
exports.default = ACAO;
//# sourceMappingURL=Acao.js.map