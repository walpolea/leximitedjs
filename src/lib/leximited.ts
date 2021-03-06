////////////////////////////////////////////////////////////////////
//leximitedjs
//author: Andrew Walpole
//GNU GENERAL PUBLIC LICENSE
////////////////////////////////////////////////////////////////////
//encode a regular string/number to a leximited string/number
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

////////////////////////////////////////////////////////////////////
//specifically encode a string/number to a leximited number
const toLeximitedInt = (n: string | number): number => {
  return Number(toLeximited(n));
};

////////////////////////////////////////////////////////////////////
//specifically encode a string/number to a leximited string
const toLeximitedStr = (n: string | number): string => {
  return String(toLeximited(n, true));
};

////////////////////////////////////////////////////////////////////
//decode a leximited string/number to a regular string/number
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
  const possibleLength: number = Number(numStr[0]);

  //is a smallish lex?
  if (possibleLength < 9) {
    const actualNumberAsString: string = numStr.slice(1);

    //check if proper smallish lex
    if (possibleLength === actualNumberAsString.length) {
      //the actual length equals the prepended length, so it is
      return asString ? actualNumberAsString : Number(actualNumberAsString);
    } else {
      throw new SyntaxError(`Syntax Error: ${n} is not a properly leximited ${typeof n}`);
    }
  } else if (possibleLength === 9) {
    //deal with a big one
    const secondNumber = Number(numStr[1]);
    const lexLength: number = Number(numStr.slice(1, 2 + secondNumber));
    const actualNumberAsString: string = numStr.slice(2 + secondNumber);

    //check if proper smallish lex
    if (fromLeximited(lexLength) === actualNumberAsString.length) {
      //the actual length equals the prepended length, so it is
      return asString ? actualNumberAsString : Number(actualNumberAsString);
    } else {
      throw new SyntaxError(`Syntax Error: ${n} is not a properly leximited ${typeof n}`);
    }
  } else {
    //what is this? negative number maybe?
    throw new SyntaxError(`Syntax Error: ${n} is not a properly leximited ${typeof n}`);
  }
};

////////////////////////////////////////////////////////////////////
//specifically decode a leximited string/number to a number
const fromLeximitedInt = (n: string | number): number => {
  return Number(fromLeximited(n));
};

////////////////////////////////////////////////////////////////////
//specifically decode a leximited string/number to a string
const fromLeximitedStr = (n: string | number): string => {
  return String(fromLeximited(n, true));
};

export { toLeximited, toLeximitedInt, toLeximitedStr, fromLeximited, fromLeximitedInt, fromLeximitedStr };
