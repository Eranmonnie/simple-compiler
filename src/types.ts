export interface Token {
    type: string;
    value: string;
  }
  
  export interface Node {
    type: string;
    [key: string]: any;
  }
  
  export interface ASTNode {
    type: string;
    body: Node[];
   
  }
  
  export interface Visitor {
    [key: string]: {
      enter?: (node: Node, parent: Node | null) => void;
      exit?: (node: Node, parent: Node | null) => void;
    };
  }
  