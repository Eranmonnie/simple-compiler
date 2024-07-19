import tokenizer from "./tokenizer";
import parser from "./parser";
import transformer from "./transformer";
import codeGenerator from "./codegenerator";

const compiler = (input: string): string => {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  const newAst = transformer(ast);
  const output = codeGenerator(newAst);

  return output;
};

export default compiler;
