import * as express from "express";
import Test from "../dao/Test";

export const route = express.Router();
route.get("/", (req, res, next) => {
    res.redirect('index.html');
    next();
});


