"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Test_1 = require("../dao/Test");
var CMD = Test_1.default.a;
var router = express();
router.get('/test', function (req, res, next) {
    var ip = req.headers['x-forwarded-for-pound'] || req.headers['x-forwarded-for'] || '127.0.0.1';
    res.json({
        ip: ip,
        cmd: CMD || 'test'
    });
    next();
});
exports.default = router;
//# sourceMappingURL=Test.js.map