import { Token } from "./types";


const tokenizer = (input: string): Token[] => {
  let current = 0;
  const tokens: Token[] = [];

  while (current < input.length) {
    let character = input[current];

    if (character === "(") {
      tokens.push({ type: "parenthesis", value: "(" });
      current++;
      continue;
    }

    if (character === ")") {
      tokens.push({ type: "parenthesis", value: ")" });
      current++;
      continue;
    }

    const whiteSpace = /\s/;
    if (whiteSpace.test(character)) {
      current++;
      continue;
    }

    const number = /[0-9]/;
    if (number.test(character)) {
      let value = "";
      while (number.test(character)) {
        value += character;
        character = input[++current];
      }
      tokens.push({ type: "number", value });
      continue;
    }

    if (character === '"') {
      let value = "";
      character = input[++current];
      while (character !== '"') {
        value += character;
        character = input[++current];
      }
      character = input[++current];
      tokens.push({ type: "string", value });
      continue;
    }

    const letters = /[a-z]/i;
    if (letters.test(character)) {
      let value = "";
      while (letters.test(character)) {
        value += character;
        character = input[++current];
      }
      tokens.push({ type: "name", value });
      continue;
    }

    throw new TypeError("I don't know what this character is: " + character);
  }

  return tokens;
};

export default tokenizer;
