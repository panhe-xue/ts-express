/**
 * 业务路由得所有集合地方 Routes类
 */
import * as Login from "./router/Login";

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
        this.app.use("/node", Login.route);
    }
 }

 export default Routes