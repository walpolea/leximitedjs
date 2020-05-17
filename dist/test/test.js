"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var leximited_1 = require("../lib/leximited");
function runTests(cases) {
    var results = cases.map(function (test) {
        return __assign(__assign({}, test), { passed: testToLeximited(test) });
    });
    console.table(results);
}
function testToLeximited(_a) {
    var input = _a.input, expectedOutputAsNumber = _a.expectedOutputAsNumber, expectedOutputAsString = _a.expectedOutputAsString;
    var asNumber = true;
    var asString = true;
    if (expectedOutputAsNumber != null) {
        try {
            var numResult = leximited_1.toLeximitedInt(input);
            asNumber = numResult === expectedOutputAsNumber;
        }
        catch (error) {
            console.log(error);
            asNumber = false;
        }
    }
    if (expectedOutputAsString != null) {
        try {
            asString = leximited_1.toLeximitedStr(input) === expectedOutputAsString;
        }
        catch (error) {
            console.log(error);
            asString = false;
        }
    }
    return asNumber && asString;
}
var testCases = [
    {
        input: 0,
        expectedOutputAsNumber: 10,
        expectedOutputAsString: "10",
    },
    {
        input: 10,
        expectedOutputAsNumber: 210,
        expectedOutputAsString: "210",
    },
    {
        input: 999,
        expectedOutputAsNumber: 3999,
        expectedOutputAsString: "3999",
    },
    {
        input: 99999999,
        expectedOutputAsNumber: 899999999,
        expectedOutputAsString: "899999999",
    },
    {
        input: 100000000,
        expectedOutputAsNumber: 919100000000,
        expectedOutputAsString: "919100000000",
    },
    {
        input: "0007",
        expectedOutputAsNumber: 17,
        expectedOutputAsString: "17",
    },
    {
        input: "-2",
        expectedOutputAsNumber: false,
        expectedOutputAsString: "false",
    },
];
runTests(testCases);
