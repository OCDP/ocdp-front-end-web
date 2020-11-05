/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Models {
  namespace LogEx {
    type LogicOperator = "and" | "or";

    type UnaryOperator =
      | "!!"
      | "is_true"
      | "is_false"
      | "is_number"
      | "is_string"
      | "is_date"
      | "is_object"
      | "is_array";

    type BinaryOperator =
      | ">"
      | ">="
      | "<"
      | "<="
      | "=="
      | "!="
      | "in"
      | "includes";

    type Operator = LogicOperator | UnaryOperator | BinaryOperator;

    type Children = string | number | boolean | LogEx;
  }

  interface LogEx {
    operator: LogEx.Operator;
    left?: LogEx.Children;
    right?: LogEx.Children;
  }
}
