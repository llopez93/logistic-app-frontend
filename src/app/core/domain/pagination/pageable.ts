export class Pageable {

  filters: Map<string, string> = new Map<string, string>();
  order: { field: string, type: "ASC" | "DESC" } = undefined;
  page = 0;
  size = 5;

  public hasFilters(): boolean {
    return this.filters.size > 0;
  }

  public hasOrder(): boolean {
    return this.order !== undefined;
  }

  public defaultOrder(): { field: string, type: "ASC" | "DESC" } {
    return {field: "id", type: "DESC"};
  }

  public addFilter(key: string, value: string): void {
    this.filters.set(key, value);
  }

  public removeFilter(key: string): void {
    this.filters.delete(key);
  }

  public parseFilters(): { key: string, value: string }[] {
    return Array.from(this.filters, ([k, v]) => {
      return {key: k, value: v};
    }).filter(filter => filter.value !== "");
  }


}
