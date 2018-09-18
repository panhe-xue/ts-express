"use strict";

import * as express from "express";
import IMiddleware from "../interface/interface";

class ACAO implements IMiddleware {
  handler(req: express.Request, res: express.Response, next: Function) {
    var origin = req.header("origin");
    const clientIp = req.headers["x-forwarded-for-pound"] || req.headers["x-forwarded-for"] || (req.connection && req.connection.remoteAddress) || (req.socket && req.socket.remoteAddress);
    console.log(`request ${req.url} origin: ${origin} ip: ${clientIp}`);
    // 如果是白名单里面的host, 则返回acao等头
    if (origin) { ///^(?:http:\/\/)?([A-Za-z0-9][A-Za-z0-9_]*\.)*(qq|pengyou|qzone|3gqq)\.com$/.test(origin)
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header("Access-Control-Allow-Headers",[
          "Origin",
          "No-Cache",
          "X-Requested-With",
          "If-Modified-Since",
          "Authorization",
          "Content-Length",
          "Pragma",
          "Last-Modified",
          "Cache-Control",
          "Expires",
          "Content-Type",
          "Content-Method",
          "X-E4M-With"
        ].join()
      );
      res.header("Timing-Allow-Origin", origin);
    } else {
      origin && res.header("Timing-Allow-Origin", origin);
    }
    next();
  }
}

export default ACAO;
