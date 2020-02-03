import {PaginationPropertySort} from './pagination.property.sort';

export class PaginationPage<T> {

  content: T[];
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: Array<PaginationPropertySort>;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number; // Numero de pagina

  constructor(json: any) {
    Object.assign(this,  json);
  }
}
