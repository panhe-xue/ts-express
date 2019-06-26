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