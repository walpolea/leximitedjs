"use strict";
// const numericals: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromLeximited = exports.toLeximited = void 0;
var toLeximited = function (n, asString) {
    if (asString === void 0) { asString = false; }
    //string?
    if (isNaN(+n)) {
        return "" + String(n).length + n;
    }
    //if it's a string number, get rid of leading zeros
    if (typeof n === "string") {
        while (n.indexOf("0") === 0) {
            n = n.slice(1);
        }
    }
    var len = String(n).length;
    var num = Number(n);
    //smallish number
    if (num < 100000000) {
        return asString ? "" + len + num : Number("" + len + num);
    }
    //larger number
    return asString ? "9" + toLeximited(len) + num : Number("9" + toLeximited(len) + num);
};
exports.toLeximited = toLeximited;
//TODO: make it work right
var fromLeximited = function (n) {
    if (typeof n === "number") {
        n = n.toString();
    }
    var len = n.length;
    if (n.indexOf(len.toString()) !== 0) {
        throw "Error: " + n + " is not a properly leximited " + typeof n;
    }
    return Number(n.slice(len));
};
exports.fromLeximited = fromLeximited;
