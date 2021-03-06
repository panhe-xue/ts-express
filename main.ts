"use strict";

import ms from "./util/ms";
import InitDB from "./db/DB";
import DataBaseOptions from "./db/DataBaseOptions";
import App from "./app";

class Main {
    /**
     * 程序的开始
     */
    begin() {
        let self = this;
        ms.log.info('server starting.......................');

        //事件发射器
        let initEmitter = new ms.events.EventEmitter();
        initEmitter
        .once("begin", self.initDbs)
        .once("initServer", self.initServer)
        .emit("begin", initEmitter)
    }
    /**
     * 初始化数据库
     */
    async initDbs(emitter) {
        let optionsArray = (process.env.NODE_ENV || 'development') === 'development' ?  DataBaseOptions.dev : DataBaseOptions.pro;
        ms.log.info("mysql options，数据库配置文件:", optionsArray);
        for(let i = 0; i < optionsArray.length; i++) {
            let options = optionsArray[i];
            ms.mysql[options.database] = await new InitDB(options);
        }

        ms.log.info("init database end!!!!");
        emitter.emit("initServer");
    }
    /**
     * 初始化服务
     */
    initServer() {
        new App();
    }
}

new Main().begin()