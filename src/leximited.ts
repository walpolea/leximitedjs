// const numericals: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const toLeximited = (n: number | string, asString: boolean = false): number | string => {
  //string?
  if (isNaN(+n)) {
    return `${String(n).length}${n}`;
  }

  //if it's a string number, get rid of leading zeros
  if (typeof n === "string") {
    while (n.indexOf("0") === 0) {
      n = n.slice(1);
    }
  }

  const len: number = String(n).length;
  const num: number = Number(n);

  //smallish number
  if (num < 100000000) {
    return asString ? `${len}${num}` : Number(`${len}${num}`);
  }

  //larger number
  return asString ? `9${toLeximited(len)}${num}` : Number(`9${toLeximited(len)}${num}`);
};

//TODO: make it work right
const fromLeximited = (n: number | string): number => {
  if (typeof n === "number") {
    n = n.toString();
  }

  const len = n.length;

  if (n.indexOf(len.toString()) !== 0) {
    throw `Error: ${n} is not a properly leximited ${typeof n}`;
  }

  return Number(n.slice(len));
};

export { toLeximited, fromLeximited };
