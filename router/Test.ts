import * as express from "express";
import Test from "../dao/Test";


export const route = express.Router();
route.get('/test', (req, res, next) => {
    const ip = req.headers['x-forwarded-for-pound'] || req.headers['x-forwarded-for'] || '127.0.0.1';
    res.json({
        ip: ip,
        cmd: 'test'
    });
    next();
});

