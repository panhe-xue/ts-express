import * as events from "events";
import * as express from "express";
import * as http from "http";
import * as fs from "fs";
import log from "./logger";
import * as path from "path";

export default {
  mysql      : {},
  events     : events,
  express    : express,
  http       : http,
  fs         : fs,
  loginIgnore: true, //设置是否忽略校验登陆
  log: log,
  path: path
};