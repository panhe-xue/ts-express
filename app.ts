"use strict"
//设置默认环境
!process.env.NODE_ENV && (process.env.NODE_ENV = 'development')
import * as compression from "compression";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import ACAO from "./middleware/Acao";
import LoginCheck from "./middleware/LoginCheck";
import Privilege from "./middleware/Privilege";
import * as errorHandler from "errorhandler";
import * as http from "http";
//import * as favicon from "express-favicon";
import Routes from "./router/route";
import * as path from "path";
import * as express from "express";
import * as FileUpload from "express-fileupload";
import MS from "./util/ms";

let ms = MS;

class App {
  constructor () {
    this.init()
  }
  init() {
      let app: express.Express = express();

      // 禁止在返回头里面返回 poweredBy 字段
      app.disable("x-powered-by");
      app.use(compression());

      //日志中间件 打印到文件和控制台中
      const accessLog = ms.fs.createWriteStream("../access.log", {
        flags: "a"
      });
      app.use(logger("dev"));
      app.use(logger("combined", { stream: accessLog }));

      //解析post请求
      app.use(bodyParser.json({ limit: "100mb" }));
      app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
      app.use(cookieParser());
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
      app.use(express.static(path.join(__dirname, "/public/dist"), {
          maxAge: "3600000",
          index: "index.html"
        }));

      /**业务路由 */
        new Routes(app);
      /**业务路由 */

      // catch 404 and forward to error handler
      if (app.get("env") === "development") {
        app.use(errorHandler({ log: true }));
      } else if (app.get("env") === "production") {
        app.use(errorHandler());
      }

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
  }
}

export default App