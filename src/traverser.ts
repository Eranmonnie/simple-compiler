import { ASTNode, Visitor, Node } from "./types";


const traverser = (ast: ASTNode, visitor: Visitor): void => {
  const traverseArray = (array: Node[], parent: Node): void => {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  };

  const traverseNode = (node: Node, parent: Node | null): void => {
    const methods = visitor[node.type];

    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case "Program":
        traverseArray(node.body, node);
        break;
      case "CallExpression":
        traverseArray(node.params, node);
        break;
      case "NumberLiteral":
      case "StringLiteral":
        break;
      default:
        throw new TypeError(node.type);
    }

    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  };

  traverseNode(ast, null);
};

export default traverser;
