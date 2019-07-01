"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//设置默认环境
!process.env.NODE_ENV && (process.env.NODE_ENV = 'development');
var createError = require("http-errors");
var compression = require("compression");
// import * as logger from "morgan";
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var LoginCheck_1 = require("./middleware/LoginCheck");
var Privilege_1 = require("./middleware/Privilege");
// import * as favicon from "express-favicon";
var route_1 = require("./router/route");
var path = require("path");
var express = require("express");
var FileUpload = require("express-fileupload");
var ms_1 = require("./util/ms");
var connectRedis = require("connect-redis");
var log4js = require('./config/log');
var logger = log4js.getLogger();
var RedisStore = connectRedis(session);
var App = /** @class */ (function () {
    function App() {
        this.init();
    }
    App.prototype.init = function () {
        var app = express();
        log4js.useLogger(app, logger); //这样会自动记录每次请求信息，放在其他use上面*/
        // 禁止在返回头里面返回 poweredBy 字段
        app.disable("x-powered-by");
        app.use(compression());
        //解析post请求
        app.use(bodyParser.json({ limit: "100mb" }));
        app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
        app.use(cookieParser());
        // session 内存
        app.use(session({
            secret: 'new-things',
            resave: true,
            saveUninitialized: false,
            store: new RedisStore({
                host: '127.0.0.1',
                port: 6379
            })
        }));
        app.use(FileUpload());
        //app.use(ms.express.methodOverride());
        //app.use(favicon(path.join(__dirname, "./public/images/favicon.ico")));
        app.set("view engine", "jade");
        app.set("views", "./views");
        app.set("view options", { layout: false });
        //返回ACAO的头
        // app.use(new ACAO().handler);
        //登陆校验
        app.use(new LoginCheck_1.default().handler);
        //权限校验
        app.use(new Privilege_1.default().handler);
        // 关键代码， 设置web文件路由
        app.use(express.static(path.join(__dirname, "/public"), {
            maxAge: "3600000",
            index: "index.html"
        }));
        /**业务路由 */
        new route_1.default(app);
        /**业务路由 */
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            next(createError(404));
        });
        // error handler
        app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.json({
                error: err,
                status: err.status || 500
            });
        });
        if (module.parent) {
            ms_1.default.log.info("Nodejs server start arguments " + process.env.IP + ":" + process.env.PORT);
            // 关键代码， 设置本地监听域名和端口号
            app.set("host", process.env.IP || "localhost");
            app.set("port", process.env.PORT || 8000);
            // 关键代码， 启动服务
            var server_1 = app.listen(app.get("port"), app.get("host"), function () {
                var address = server_1.address();
                ms_1.default.log.info("Express server listening on port:" + app.get("port"));
            });
        }
        process.on("uncaughtException", function (err) {
            ms_1.default.log.info("uncaughtException: " + err.stack);
        });
        process.on('unhandledRejection', function (err) {
            ms_1.default.log.info('promise unhandledRejection:', err);
            process.exit(1);
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map