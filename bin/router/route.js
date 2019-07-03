"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 业务路由得所有集合地方 Routes类
 */
var Login = require("./login/Login");
var GetBrands = require("./getBrands/GetBrands");
var SetBrands = require("./getBrands/SetBrands");
var Index = require("./index/index");
var GetFeeds = require("./getFeeds/GetFeeds");
var GetWxData = require("./getWxData/GetWxData");
//路由引入文件
// import * as policeDutyChangeList from "./policeDutyChange/List";
var Routes = /** @class */ (function () {
    function Routes(app) {
        this.app = app;
        this.init();
    }
    Routes.prototype.init = function () {
        /**
         * 挂载路由
         */
        this.app.use(Login.route);
        this.app.use(GetBrands.route);
        this.app.use(SetBrands.route);
        this.app.use(Index.route);
        this.app.use(GetFeeds.route);
        this.app.use(GetWxData.route);
    };
    return Routes;
}());
exports.default = Routes;
//# sourceMappingURL=route.js.map