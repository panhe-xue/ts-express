/// <reference path="./typings/index.d.ts" />

import * as events from "events";
import MS from "./util/ms";
import InitDB from "./db/DB";
import DataBaseOptions from "./db/DataBaseOptions";

ms = MS;
class Main {
    /**
     * 程序的开始
     */
    begin() {
        let self = this;
        console.log('server starting.......................');

        //事件发射器
        let initEmitter = new events.EventEmitter();
        initEmitter
        .once("begin", self.initDbs)
        .once("initServer", self.initServer)
        .emit("begin", initEmitter)
    }
    /**
     * 初始化数据库
     */
    async initDbs(emitter) {
        let optionsArray = DataBaseOptions;
        for(let i = 0; i < optionsArray.length; i++) {
            let options = optionsArray[i];
            ms.mysql[options.database] = await new InitDB(options);
        }
        emitter("initServer");
    }
    /**
     * 初始化服务
     */
    initServer() {

    }
}

new Main().begin()