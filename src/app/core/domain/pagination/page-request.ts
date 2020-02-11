import {Filter} from "./filter";

export class PageRequest {

  //TODO: sumar los JOINs

  private filters: Filter[] = [];
  page: number = 0;
  limit: number = 10;

  constructor() {
  }

  public addFilter(filter: Filter): void {
    const f = this.filters.find(value => value.field === filter.field);
    if (f)
      f.value = filter.value;
    else
      this.filters.push(filter);
  }

  public removeFilter(field: string): void {
    const index = this.filters.findIndex(value => value.field === field);
    this.filters.slice(index, 1);
  }


  public buildRequestParamsFilters(): string {
    return this.filters.map(value => value.buildFilter()).join(",");
  }

}
