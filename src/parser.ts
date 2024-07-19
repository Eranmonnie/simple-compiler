import { ASTNode, Token, Node } from "./types";

const parser = (tokens: Token[]): ASTNode => {
  let current = 0;

  const walk = (): Node => {
    let token = tokens[current];

    if (token.type === "number") {
      current++;
      return { type: "NumberLiteral", value: token.value };
    }

    if (token.type === "string") {
      current++;
      return { type: "StringLiteral", value: token.value };
    }

    if (token.type === "parenthesis" && token.value === "(") {
      token = tokens[++current];

      const node: Node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };

      token = tokens[++current];

      while (token.type !== "parenthesis" || (token.type === "parenthesis" && token.value !== ")")) {
        node.params.push(walk());
        token = tokens[current];
      }

      current++;
      return node;
    }

    throw new TypeError(token.type);
  };

  const ast: ASTNode = {
    type: "Program",
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
};

export default parser;
