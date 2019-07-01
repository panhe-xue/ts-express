"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events = require("events");
var express = require("express");
var http = require("http");
var fs = require("fs");
var logger_1 = require("./logger");
exports.default = {
    mysql: {},
    events: events,
    express: express,
    http: http,
    fs: fs,
    loginIgnore: true,
    log: logger_1.default
};
//# sourceMappingURL=ms.js.map