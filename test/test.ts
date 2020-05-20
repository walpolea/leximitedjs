import { toLeximitedInt, toLeximitedStr, fromLeximitedInt, fromLeximitedStr } from "../src/lib/leximited";

function runTests(toCases: any[], fromCases: any[]) {
  const resultsTo = toCases.map((test) => {
    return { ...test, ...testToLeximited(test) };
  });

  console.table(resultsTo);

  const resultsFrom = fromCases.map((test) => {
    return { ...test, ...testFromLeximited(test) };
  });

  console.table(resultsFrom);
}

function testToLeximited({ input, expectedOutputAsNumber, expectedOutputAsString }): any {
  let asNumber: boolean = true;
  let asString: boolean = true;
  let numResult: number, strResult: string;

  if (expectedOutputAsNumber != null) {
    try {
      numResult = toLeximitedInt(input);
      asNumber = numResult === expectedOutputAsNumber;
    } catch (error) {
      console.log(error);
      numResult = -1;
      asNumber = false;
    }
  }

  if (expectedOutputAsString != null) {
    try {
      strResult = toLeximitedStr(input);
      asString = strResult === expectedOutputAsString;
    } catch (error) {
      console.log(error);
      strResult = "ERROR";
      asString = false;
    }
  }

  return {
    passed: asNumber && asString,
    outputAsNumber: numResult,
    outputAsString: strResult,
  };
}

function testFromLeximited({ input, expectedOutputAsNumber, expectedOutputAsString }): any {
  let asNumber: boolean = true;
  let asString: boolean = true;
  let numResult: number, strResult: string;

  if (expectedOutputAsNumber != null) {
    try {
      numResult = fromLeximitedInt(input);
      asNumber = numResult === expectedOutputAsNumber;
    } catch (error) {
      console.log(error);
      numResult = -1;
      asNumber = false;
    }
  }

  if (expectedOutputAsString != null) {
    try {
      strResult = fromLeximitedStr(input);
      asString = strResult === expectedOutputAsString;
    } catch (error) {
      console.log(error);
      strResult = "ERROR";
      asString = false;
    }
  }

  return {
    passed: asNumber && asString,
    outputAsNumber: numResult,
    outputAsString: strResult,
  };
}

const testToCases: any[] = [
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

const testFromCases: any[] = [
  {
    input: "210",
    expectedOutputAsNumber: 10,
    expectedOutputAsString: "10",
  },
  {
    input: 899999999,
    expectedOutputAsNumber: 99999999,
    expectedOutputAsString: "99999999",
  },
  {
    input: "919100000000",
    expectedOutputAsNumber: 100000000,
    expectedOutputAsString: "100000000",
  },
  {
    input: 919100000000,
    expectedOutputAsNumber: 100000000,
    expectedOutputAsString: "100000000",
  },
  {
    input: "10",
    expectedOutputAsNumber: 0,
    expectedOutputAsString: "0",
  },
  {
    input: "9222mary had a little lamb",
    expectedOutputAsString: "mary had a little lamb",
  },
];

runTests(testToCases, testFromCases);

921500000000000000;
921499999999999999;
