import { httpGet, httpSaveFile, httpPost } from "../util/request";
import GlobalData from "../config/globalData";
import ms from "../util/ms";

/**
 * 获取调用凭据access_token
 */
export async function getAccessToken() {
    const options ={
        url: GlobalData.autoGetAccessTokenUrl,
        data: {
            grant_type: "client_credential",
            appid: GlobalData.appData.appId,
            secret: GlobalData.appData.appSecret
        }
    }
    try {
        const res = await httpGet(options);
        return JSON.parse(res)
    } catch (error) {
        ms.log.error("getAccessToken data 获取调用凭据错误error:", error.message, error)
        throw new Error(error);
    }
}

/**
 * 获取调用凭据access_token
 */
export async function getWxaCode(wxacodePath: string, path: string, width?: number, auto_color?: boolean, line_color?: string, is_hyaline?: boolean) {
    let accessTokenRes = await getAccessToken();
    let access_token = accessTokenRes.access_token;
    let res;
    (!auto_color && line_color) && (line_color = JSON.parse(line_color))
    let line_color_default = { "r": 0, "g": 0, "b": 0}
    const options ={
        url: GlobalData.wxacodeUrl + "?access_token=" + access_token,
        data: {
            path: path,
            width: width || 280,
            auto_color: auto_color || false,
            line_color: line_color ||{ r: 0, g: 0, b: 0 },
            is_hyaline: is_hyaline || false
        }
    }

    try {
        res = await httpSaveFile(options, wxacodePath);
    } catch (error) {
        ms.log.error("getAccessToken data 获取微信小程序码错误error:", error.message, error)
        throw new Error(error);
        return false
    }
    return res
}