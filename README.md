
# Simple Compiler

A simple compiler built with TypeScript that processes a source code string through several stages: tokenization, parsing, transformation, and code generation. This project demonstrates basic compiler design principles using modern TypeScript features.

## Features

- **Tokenizer**: Breaks the input string into tokens.
- **Parser**: Converts tokens into an Abstract Syntax Tree (AST).
- **Transformer**: Transforms the AST into a new format.
- **Code Generator**: Converts the transformed AST into executable code.
- **TypeScript Integration**: The entire project is written in TypeScript.

## Project Structure
```
simple-compiler/
├── src/
│   ├── tokenizer.ts
│   ├── parser.ts
│   ├── transformer.ts
│   ├── traverser.ts
│   ├── codeGenerator.ts
│   ├── test.ts
│   ├── types.ts
│   └── compiler.ts
├── dist/
│   ├── tokenizer.js
│   ├── parser.js
│   ├── transformer.js
│   ├── traverser.js
│   ├── codeGenerator.js
│   ├── test.js
│   ├── types.js
│   └── compiler.js
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── node_modules/

```


### Files

- **`src/tokenizer.ts`**: Defines the tokenizer function that splits the input into tokens.
- **`src/parser.ts`**: Contains the parser function that generates an AST from tokens.
- **`src/transformer.ts`**: Includes the transformer function that converts the AST to a new format.
- **`src/codeGenerator.ts`**: Implements the code generator that outputs the final code.
- **`src/compiler.ts`**: Entry point for running the compiler logic.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Eranmonnie/simple-compiler.git
   
   cd simple-compiler
   ```
2. **Install Dependencies**
   ```
   npm install
   ```
   
3. **Compile TypeScript files into JavaScript**
    ```
    npm run start
    ```

### Sample Input and Output

**Input:**

```
// create a new file file.ts
import compiler from './compiler';

const input = "(add 2 (subtract 4 2))";
const output = compiler(input);
console.log(output);

```

### Detailed Explanation
1. **Tokenizer**
The tokenizer function splits the input string into tokens, which are small units of meaning. For example, the input (add 2 (subtract 4 2)) would be tokenized into:

```
[
  { "type": "parenthesis", "value": "(" },
  { "type": "name", "value": "add" },
  { "type": "number", "value": "2" },
  { "type": "parenthesis", "value": "(" },
  { "type": "name", "value": "subtract" },
  { "type": "number", "value": "4" },
  { "type": "number", "value": "2" },
  { "type": "parenthesis", "value": ")" },
  { "type": "parenthesis", "value": ")" }
]
```
2. **Parser**
The parser function converts the tokens into an Abstract Syntax Tree (AST). For the given input, the resulting AST might look like this:

```
{
  "type": "Program",
  "body": [
    {
      "type": "CallExpression",
      "name": "add",
      "params": [
        { "type": "NumberLiteral", "value": "2" },
        {
          "type": "CallExpression",
          "name": "subtract",
          "params": [
            { "type": "NumberLiteral", "value": "4" },
            { "type": "NumberLiteral", "value": "2" }
          ]
        }
      ]
    }
  ]
}
```
3. **Transformer**
The transformer function modifies the AST to a new format. The transformed AST will be structured differently, incorporating identifiers and expression statements:

```
{
  "type": "Program",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": { "type": "Identifier", "name": "add" },
        "arguments": [
          { "type": "NumberLiteral", "value": "2" },
          {
            "type": "CallExpression",
            "callee": { "type": "Identifier", "name": "subtract" },
            "arguments": [
              { "type": "NumberLiteral", "value": "4" },
              { "type": "NumberLiteral", "value": "2" }
            ]
          }
        ]
      }
    }
  ]
}
```
4. **Code Generator**
The code generator function converts the transformed AST into executable code. For the transformed AST, the code generator will produce:

```
add(2, subtract(4, 2));
```
  
