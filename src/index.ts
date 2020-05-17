import { toLeximited, fromLeximited } from "./leximited";

[0, 1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 20, 99, 100, 99999999, 100000000, "hello", "1w2o3ro4l5d", "0007", "12345"].forEach((n) => {
  console.log(toLeximited(n));
});

export default {
  toLeximited,
  fromLeximited,
};
