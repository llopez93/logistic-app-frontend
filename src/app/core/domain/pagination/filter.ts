import {Operators} from "./operators";

export class Filter {
  field = "";
  operator: Operators = Operators.EQUAL;
  value = "";

  constructor(field: string, operator: Operators, value: string) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  public buildFilter(): string {
    return  this.value && this.value !== '' ? this.field + "||" + this.operator + "||" + this.value : '';
  }

  public buildParam(): { [p: string]: string } {
    return {filter: this.field + "||" + this.operator + "||" + this.value};
  }

}
