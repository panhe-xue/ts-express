/**
 * 请求返回码
 *
 * @enum {number}
 */
export enum RetCode {
  /**
   * 服务器执行异常
   */
  ERR_SERVER_EXCEPTION = -500,
  /**
   * 参数错误
   */
  ERR_CLIENT_PARAMS_ERR = -400,
  
  /**
   * 数据重复
   */
  ERR_DATA_REPEAT = -401,

  /**
   * 请求成功
   */
  SUC_OK = 0
}

/**
 * 请求返回信息
 *
 * @export
 * @class RetMsg
 */
export class RetMsg {
  /**
   * 请求成功
   *
   * @static
   */
  static SUC_OK = "ok";

  /**
   * 服务器执行异常
   *
   * @static
   */
  static ERR_SERVER_EXCEPTION = "服务器错误";
  /**
   * 参数错误
   *
   * @static
   */
  static ERR_CLIENT_PARAMS_ERR = "参数错误";

  /**
   * 数据重复
   * @static
   */
  static ERR_DATA_REPEAT = "数据重复";
  /**
   * 数据互斥
   * @static
   */
  static ERR_DATA_BMUTEX = "数据在黑名单中已存在,请先删除！";
  /**
   * 数据互斥
   * @static
   */
  static ERR_DATA_WMUTEX = "数据在白名单中已存在,请先删除！";

  /**
   * Tof验证失败
   *
   * @static
   */
  static ERR_FORBIDDEN = "获取身份信息失败，请重新登陆！";
}
