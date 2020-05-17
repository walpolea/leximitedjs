// const numericals: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const toLeximited = (n: number | string, asString: boolean = false): number | string => {
  //string?
  if (isNaN(+n)) {
    const str: string = String(n);
    if (str.length < 9) {
      return `${str.length}${n}`;
    } else {
      return `9${toLeximited(str.length)}${str}`;
    }
  }

  //if it's a number as a string, get rid of leading zeros
  if (typeof n === "string") {
    while (n.indexOf("0") === 0) {
      n = n.slice(1);
    }
  }

  const len: number = String(n).length;
  const num: number = Number(n);

  //no negatives, no floating point numbers... positive integers only!
  if (num < 0 || String(n).indexOf(".") !== -1) {
    throw new RangeError(`RangeError: ${num} cannot be leximited. Only Non-Negative Integers can be leximited`);
  }

  //smallish number
  if (num < 100000000) {
    return asString ? `${len}${num}` : Number(`${len}${num}`);
  }

  //larger number
  return asString ? `9${toLeximited(len)}${num}` : Number(`9${toLeximited(len)}${num}`);
};

const toLeximitedInt = (n: string | number): number => {
  return Number(toLeximited(n));
};

const toLeximitedStr = (n: string | number): string => {
  return String(toLeximited(n, true));
};

//TODO: make it work right
const fromLeximited = (n: number | string, asString: boolean = false): number | string => {
  //string?
  if (isNaN(+n)) {
    if (String(n)[0] !== "9") {
      return String(n).slice(1);
    } else {
      //do something harder
    }
  }

  const numStr: string = String(n);
  const len = numStr.length;

  //is a smallish lex?
  if (Number(numStr[0]) < 9) {
    //check if proper smallish lex
    if (Number(numStr[0]) === numStr.slice(1).length) {
      return asString ? numStr.slice(1) : Number(numStr.slice(1));
    } else {
      throw new SyntaxError(`Syntax Error: ${n} is not a properly leximited ${typeof n}`);
    }
  } else if (Number(numStr[0]) === 9) {
    //deal with a big one

    return "something for now";
  } else {
    //what is this? negative number maybe?
    throw new SyntaxError(`Syntax Error: ${n} is not a properly leximited ${typeof n}`);
  }
};

const fromLeximitedInt = (n: string | number): number => {
  return Number(fromLeximited(n));
};

const fromLeximitedStr = (n: string | number): string => {
  return String(fromLeximited(n, true));
};

export { toLeximited, toLeximitedInt, toLeximitedStr, fromLeximited, fromLeximitedInt, fromLeximitedStr };
