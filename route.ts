/**
 * 业务路由得所有集合地方 Routes类
 */
import * as Test from "./router/Test";
import * as Test2 from "./router/Test2";

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
        this.app.use("/node", Test.route);
        this.app.use("/node", Test2.route);
    }
 }

 export default Routes