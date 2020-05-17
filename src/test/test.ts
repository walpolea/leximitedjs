import { toLeximitedInt, toLeximitedStr } from "../lib/leximited";

function runTests(cases: any[]) {
  const results = cases.map((test) => {
    return { ...test, ...testToLeximited(test) };
  });

  console.table(results);
}

function testToLeximited({ input, expectedOutputAsNumber, expectedOutputAsString }): any {
  let asNumber: boolean = true;
  let asString: boolean = true;
  let numResult, strResult;

  if (expectedOutputAsNumber != null) {
    try {
      numResult = toLeximitedInt(input);
      asNumber = numResult === expectedOutputAsNumber;
    } catch (error) {
      console.log(error);
      asNumber = false;
    }
  }

  if (expectedOutputAsString != null) {
    try {
      strResult = toLeximitedStr(input);
      asString = strResult === expectedOutputAsString;
    } catch (error) {
      console.log(error);
      asString = false;
    }
  }

  return {
    passed: asNumber && asString,
    outputAsNumber: numResult,
    outputAsString: strResult,
  };
}

const testCases = [
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
    input: 99999999999999,
    expectedOutputAsNumber: 921499999999999999,
    expectedOutputAsString: "921499999999999999",
  },
  {
    input: "0007",
    expectedOutputAsNumber: 17,
    expectedOutputAsString: "17",
  },
  {
    input: "-2",
    expectedOutputAsNumber: undefined,
    expectedOutputAsString: undefined,
  },
  {
    input: "mary had a little lamb",
    expectedOutputAsString: "9222mary had a little lamb",
  },
];

runTests(testCases);

921500000000000000;
921499999999999999;
