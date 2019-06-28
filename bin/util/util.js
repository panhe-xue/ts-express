"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 除0以外的false值
function isFalseExZero(data) {
    if (data === 0) {
        return false;
    }
    else {
        if (!data) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.isFalseExZero = isFalseExZero;
/**
 * 日期转化为字符串
 */
function formatDate(date) {
    date = new Date(date);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = minute < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
exports.formatDate = formatDate;
;
/**
 * 生成一个任意范围的随机数
 */
function getRandomNumber(beginN, endN) {
    return Math.random() * (endN - beginN) + beginN;
}
exports.getRandomNumber = getRandomNumber;
;
//# sourceMappingURL=util.js.map