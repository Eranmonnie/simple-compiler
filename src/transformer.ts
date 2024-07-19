import traverser from "./traverser";
import { ASTNode, Node } from "./types";

const transformer = (ast: ASTNode): ASTNode => {
  const newAst: ASTNode = {
    type: "Program",
    body: [],
  };

  (ast as any)._context = newAst.body; 

  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent?._context.push({
          type: "NumberLiteral",
          value: node.value,
        });
      },
    },
    StringLiteral: {
      enter(node, parent) {
        parent?._context.push({
          type: "StringLiteral",
          value: node.value,
        });
      },
    },
    CallExpression: {
      enter(node, parent) {
        let expression: Node = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: node.name,
          },
          arguments: [],
        };
        node._context = expression.arguments;

        if (parent?.type !== "CallExpression") {
          expression = {
            type: "ExpressionStatement",
            expression,
          };
        }
        parent?._context.push(expression);
      },
    },
  });

  return newAst;
};

export default transformer;
