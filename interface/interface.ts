"use strict";
import * as express from "express";

interface IMiddleware {
  handler: express.RequestHandler;
}

export default IMiddleware;
