"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
exports.route = express.Router();
exports.route.get('/test', function (req, res, next) {
    var ip = req.headers['x-forwarded-for-pound'] || req.headers['x-forwarded-for'] || '127.0.0.1';
    res.json({
        ip: ip,
        cmd: 'test'
    });
    
});
//# sourceMappingURL=Test.js.map