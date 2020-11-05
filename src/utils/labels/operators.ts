type ValuesOperator = Exclude<
  Models.LogEx.Operator,
  Models.LogEx.LogicOperator
>;

export const logicOperators: Record<Models.LogEx.LogicOperator, string> = {
  and: "E",
  or: "OU",
};

export const unaryOperators: Record<Models.LogEx.UnaryOperator, string> = {
  "!!": "EXISTE?",
  is_true: "É VERDADEIRO?",
  is_false: "É FALSO?",
  is_number: "É UM NÚMERO?",
  is_string: "É UM TEXTO?",
  is_date: "É UMA DATA?",
  is_object: "É UM OBJETO?",
  is_array: "É UMA LISTA?",
};

const operators: Record<ValuesOperator, string> = {
  ...unaryOperators,
  in: "ESTÁ CONTIDO EM",
  includes: "CONTÉM",
  "==": "É IGUAL A",
  "!=": "É DIFERENTE DE",
  "<": "É MENOR QUE",
  "<=": "É MENOR OU IGUAL A",
  ">": "É MAIOR QUE",
  ">=": "É MAIOR OU IGUAL A",
};

export default operators;
