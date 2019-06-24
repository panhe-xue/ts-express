/**
 * 业务路由得所有集合地方 Routes类
 */
import * as Login from "./login/Login";

//路由引入文件
// import * as policeDutyChangeList from "./policeDutyChange/List";

 class Routes {
    public app;
    constructor(app) {
        this.app = app;
        this.init()
    }
    init() {
        /**
         * 挂载路由
         */
        this.app.use(Login.route);
    }
 }

 export default Routes