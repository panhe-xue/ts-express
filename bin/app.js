"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//设置默认环境
!process.env.NODE_ENV && (process.env.NODE_ENV = 'development');
var compression = require("compression");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var Acao_1 = require("./util/Acao");
var LoginCheck_1 = require("./util/LoginCheck");
var errorHandler = require("errorhandler");
//import * as favicon from "express-favicon";
var route_1 = require("./route");
var path = require("path");
var express = require("express");
var ms_1 = require("./util/ms");
var ms = ms_1.default;
var App = /** @class */ (function () {
    function App() {
        this.init();
    }
    App.prototype.init = function () {
        var app = express();
        // 禁止在返回头里面返回 poweredBy 字段
        app.disable("x-powered-by");
        app.use(compression());
        //日志中间件 打印到文件和控制台中
        var accessLog = ms.fs.createWriteStream("../access.log", {
            flags: "a"
        });
        app.use(logger("dev"));
        app.use(logger("combined", { stream: accessLog }));
        //解析post请求
        app.use(bodyParser.json({ limit: "100mb" }));
        app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
        app.use(cookieParser());
        //app.use(ms.express.methodOverride());
        //app.use(favicon(path.join(__dirname, "./public/images/favicon.ico")));
        app.set("views", "./views");
        app.set("view engine", "jade");
        app.set("view options", { layout: false });
        //返回ACAO的头
        app.use(new Acao_1.default().handler);
        //登陆校验
        app.use(new LoginCheck_1.default().handler);
        // 关键代码， 设置web文件路由
        app.use(express.static(path.join(__dirname, "/public"), {
            maxAge: "3600000",
            index: "index.html"
        }));
        /**业务路由 */
        new route_1.default(app);
        /**业务路由 */
        // catch 404 and forward to error handler
        if (app.get("env") === "development") {
            app.use(errorHandler({ log: true }));
        }
        else if (app.get("env") === "production") {
            app.use(errorHandler());
        }
        if (module.parent) {
            console.log("Nodejs server start arguments " + process.env.IP + ":" + process.env.PORT);
            // 关键代码， 设置本地监听域名和端口号
            app.set("host", process.env.IP || "localhost");
            app.set("port", process.env.PORT || 8000);
            // 关键代码， 启动服务
            var server_1 = app.listen(app.get("port"), app.get("host"), function () {
                var address = server_1.address();
                console.log("Express server listening on port:" + app.get("port"));
            });
        }
        process.on("uncaughtException", function (err) {
            console.log("uncaughtException: " + err.stack);
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map