// 除0以外的false值
export function isFalseExZero(data: any) {
    if(data === 0) {
        return false
    } else {
        if(!data) {
            return true
        } else {
            return false
        }
    }
}

/**
 * 日期转化为字符串
 */
export function formatDate (date: Date) : string {
    date = new Date(date);
    var y = date.getFullYear();
    let m:any = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d:any = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    var minute:any = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second :any = date.getSeconds();
    second = minute < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;
};