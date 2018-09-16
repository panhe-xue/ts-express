"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.add = function (b) {
        return Test.a + b;
    };
    Test.a = 2;
    return Test;
}());
exports.default = Test;
//# sourceMappingURL=Test.js.map