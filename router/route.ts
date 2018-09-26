/**
 * 业务路由得所有集合地方 Routes类
 */
import * as Login from "./login/Login";
import * as GetUserInfo from "./userInfo/GetUserInfo";
import * as AddUserInfo from "./userInfo/AddUserInfo";

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
        this.app.use(GetUserInfo.route);
        this.app.use(AddUserInfo.route);
    }
 }

 export default Routes