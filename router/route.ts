/**
 * 业务路由得所有集合地方 Routes类
 */
import * as Login from "./login/Login";

import * as GetUserInfo from "./userInfo/GetUserInfo";
import * as AddUserInfo from "./userInfo/AddUpdateUserInfo";
//机构
import * as OrganizationList from "./organization/List";
import * as OrganizationAddUpdate from "./organization/AddUpdate";
import * as OrganizationDelete from "./organization/Delete";

//警员职务信息
import * as policeDutyChangeList from "./policeDutyChange/List";
import * as policeDutyChangeAddUpdate from "./policeDutyChange/AddUpdate";
import * as policeDutyChangeDelete from "./policeDutyChange/Delete";

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
        // this.app.use(AddUserInfo.route);
        // this.app.use(OrganizationList.route);
        // this.app.use(OrganizationAddUpdate.route);
        // this.app.use(OrganizationDelete.route);
        // this.app.use(policeDutyChangeList.route);
        // this.app.use(policeDutyChangeAddUpdate.route);
        // this.app.use(policeDutyChangeDelete.route);
    }
 }

 export default Routes