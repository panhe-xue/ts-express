"use strict"
//设置默认环境
!process.env.NODE_ENV && (process.env.NODE_ENV = 'development');
import * as createError from "http-errors";
import * as compression from "compression";
// import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import ACAO from "./middleware/Acao";
import LoginCheck from "./middleware/LoginCheck";
import Privilege from "./middleware/Privilege";
import * as http from "http";
// import * as favicon from "express-favicon";
import Routes from "./router/route";
import * as path from "path";
import * as express from "express";
import * as FileUpload from "express-fileupload";
import MS from "./util/ms";
import * as connectRedis from "connect-redis";

var log4js = require('./config/log');
const logger = log4js.getLogger();

let RedisStore = connectRedis(session);
let ms = MS;

class App {
  constructor () {
    this.init()
  }
  init() {
      let app: express.Express = express();
      log4js.useLogger(app, logger) //这样会自动记录每次请求信息，放在其他use上面*/
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
      app.use(new LoginCheck().handler);

      //权限校验
      app.use(new Privilege().handler);

      // 关键代码， 设置web文件路由
      app.use(express.static(path.join(__dirname, "/public"), {
          maxAge: "3600000",
          index: "index.html"
        }));

      /**业务路由 */
        new Routes(app);
      /**业务路由 */

      // catch 404 and forward to error handler
      app.use(function(req, res, next) {
        next(createError(404));
      });

      // error handler
      app.use(function(err, req, res, next) {
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
        console.log(`Nodejs server start arguments ${process.env.IP}:${process.env.PORT}`);
        // 关键代码， 设置本地监听域名和端口号
        app.set("host", process.env.IP || "localhost");
        app.set("port", process.env.PORT || 8000);

        // 关键代码， 启动服务
        const server: http.Server = app.listen(
          app.get("port"),
          app.get("host"),
          () => {
            var address = server.address();
            console.log(`Express server listening on port:${app.get("port")}`);
          }
        );
      }

      process.on("uncaughtException", function(err) {
        console.log("uncaughtException: " + err.stack);
      });
      process.on('unhandledRejection', function(err) {
        console.log('promise unhandledRejection:', err);
        process.exit(1);
      })
  }
}

export default App