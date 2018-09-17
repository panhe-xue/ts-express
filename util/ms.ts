import * as events from "events";
import * as express from "express";
import * as http from "http";
import * as fs from "fs";

export default {
  mysql      : {},
  events     : events,
  express    : express,
  http       : http,
  fs         : fs,
  loginIgnore: true, //设置是否校验登陆
};