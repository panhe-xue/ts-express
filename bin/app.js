"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Test_1 = require("./router/Test");
var app = express();
app.use('/node', Test_1.default);
var port = +process.env.PORT || 8000;
app.listen(port);
//# sourceMappingURL=app.js.map