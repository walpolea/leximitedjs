"use strict";
// const numericals: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
exports.__esModule = true;
exports.fromLeximitedStr = exports.fromLeximitedInt = exports.fromLeximited = exports.toLeximitedStr = exports.toLeximitedInt = exports.toLeximited = void 0;
var toLeximited = function (n, asString) {
    if (asString === void 0) { asString = false; }
    //string?
    if (isNaN(+n)) {
        var str = String(n);
        if (str.length < 9) {
            return "" + str.length + n;
        }
        else {
            return "9" + toLeximited(str.length) + str;
        }
    }
    //if it's a number as a string, get rid of leading zeros
    if (typeof n === "string") {
        while (n.indexOf("0") === 0) {
            n = n.slice(1);
        }
    }
    var len = String(n).length;
    var num = Number(n);
    //no negatives, no floating point numbers... positive integers only!
    if (num < 0 || String(n).indexOf(".") !== -1) {
        throw new RangeError("RangeError: " + num + " cannot be leximited. Only Non-Negative Integers can be leximited");
    }
    //smallish number
    if (num < 100000000) {
        return asString ? "" + len + num : Number("" + len + num);
    }
    //larger number
    return asString ? "9" + toLeximited(len) + num : Number("9" + toLeximited(len) + num);
};
exports.toLeximited = toLeximited;
var toLeximitedInt = function (n) {
    return Number(toLeximited(n));
};
exports.toLeximitedInt = toLeximitedInt;
var toLeximitedStr = function (n) {
    return String(toLeximited(n, true));
};
exports.toLeximitedStr = toLeximitedStr;
//TODO: make it work right
var fromLeximited = function (n, asString) {
    if (asString === void 0) { asString = false; }
    //string?
    if (isNaN(+n)) {
        if (String(n)[0] !== "9") {
            return String(n).slice(1);
        }
        else {
            //do something harder
        }
    }
    var numStr = String(n);
    var possibleLength = Number(numStr[0]);
    //is a smallish lex?
    if (possibleLength < 9) {
        var actualNumberAsString = numStr.slice(1);
        //check if proper smallish lex
        if (possibleLength === actualNumberAsString.length) {
            //the actual length equals the prepended length, so it is
            return asString ? actualNumberAsString : Number(actualNumberAsString);
        }
        else {
            throw new SyntaxError("Syntax Error: " + n + " is not a properly leximited " + typeof n);
        }
    }
    else if (possibleLength === 9) {
        //deal with a big one
        var secondNumber = Number(numStr[1]);
        var lexLength = Number(numStr.slice(1, 2 + secondNumber));
        var actualNumberAsString = numStr.slice(2 + secondNumber);
        //check if proper smallish lex
        if (fromLeximited(lexLength) === actualNumberAsString.length) {
            //the actual length equals the prepended length, so it is
            return asString ? actualNumberAsString : Number(actualNumberAsString);
        }
        else {
            throw new SyntaxError("Syntax Error: " + n + " is not a properly leximited " + typeof n);
        }
    }
    else {
        //what is this? negative number maybe?
        throw new SyntaxError("Syntax Error: " + n + " is not a properly leximited " + typeof n);
    }
};
exports.fromLeximited = fromLeximited;
var fromLeximitedInt = function (n) {
    return Number(fromLeximited(n));
};
exports.fromLeximitedInt = fromLeximitedInt;
var fromLeximitedStr = function (n) {
    return String(fromLeximited(n, true));
};
exports.fromLeximitedStr = fromLeximitedStr;
