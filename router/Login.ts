import * as express from "express";

export  const route = express.Router();

route.get('/Login', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (async () => {
        do {
            console.log("登陆成功");
            break;  
        } while (true)
        res.send("ok");
        next();
    })()
});