# leximitedjs

Library for converting numbers or strings to and from Leximited Notation

[Learn more about Leximited Notation](https://github.com/elenasa/ULAM/wiki/Appendix-D:-Leximited-Format)

# Installation

`npm install leximitedjs`

# Usage

module:

`import { toLeximited } from 'leximitedjs';`

or node.js:

`const Leximited = require("leximitedjs")`

### Encode a string or number to leximited format

- `toLeximited( input:string|number , asString:boolean = false ):number|string`
- `toLeximitedInt( input:string|number ):number`
- `toLeximitedStr( input:string|number ):string`

### Decode a string or number from leximited format

- `fromLeximited( input:string|number , asString:boolean = false ):number|string`
- `fromLeximitedInt( input:string|number ):number`
- `fromLeximitedStr( input:string|number ):string`
