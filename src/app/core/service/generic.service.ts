import {Injectable} from '@angular/core';
import Entity from '../domain/entity';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from "rxjs/operators";
import {PaginationPage} from "../domain/requests/pagination-page";
import {PageRequest} from "../domain/pagination/page-request";
import {PageResponse} from "../domain/pagination/page-response";


@Injectable()
export abstract class GenericService<T extends Entity> {

  protected baseUrl: string = environment.backendHost + environment.backendApiPath;

  public constructor(protected http: HttpClient) {
  }

  protected abstract getResourcePath(): string;

  protected abstract valueToEntity(o: any): T;

  protected mapToEntityArray = (o: any): T[] => {
    try {
      return (o as []).map(x => this.valueToEntity(x));
    } catch (e) {
      return [];
    }
  }

  protected mapToPaginationPage = (o: any): PaginationPage<T> => {
    const page = new PaginationPage<T>(o);
    page.content = page.content.map(x => this.valueToEntity(x));
    return page;
  };

  public getAll(): Observable<T[]> {
    const url = this.baseUrl + this.getResourcePath() + '/all';
    return this.doRequest({url, method: "GET", map: this.mapToEntityArray});
  }

  public get(id: number): Observable<T> {
    const url = this.baseUrl + this.getResourcePath() + '/' + id;
    return this.doRequest({url, method: "GET", map: this.valueToEntity});
  }

  public create(t: T): Observable<T> {
    const url = this.baseUrl + this.getResourcePath();
    return this.doRequest({url, method: "POST", options: {body: t}, map: this.valueToEntity});
  }

  public update(t: T): Observable<T> {
    const url = this.baseUrl + this.getResourcePath();
    return this.doRequest({url, method: "PUT", options: {body: t}, map: this.valueToEntity});

  }

  public delete(t: number | T): Observable<number> {
    const id = typeof t !== 'number' ? (t as T).id : t as number;
    const url = this.baseUrl + this.getResourcePath() + '/' + id;
    return this.doRequest({url, method: "DELETE"});

  }

  /*

   public getPage(args: {
    page?: number, size?: number,
    requestParams?: { [param: string]: string | string[] },
    urlSegment?: string
  }): Observable<PaginationPage<T>> {
    let url = "";
    if (args.urlSegment)
      url = this.baseUrl + this.getResourcePath() + args.urlSegment;
    else
      url = this.baseUrl + this.getResourcePath();

    args.page = args.page == null ? 0 : args.page;
    args.size = args.size == null ? 10 : args.size;
    args.requestParams = args.requestParams == null ? {} : args.requestParams;
    args.requestParams.page = args.page.toString();
    args.requestParams.size = args.size.toString();
    return this.doRequest({
      url,
      method: "GET",
      options: {
        params: args.requestParams
      },
      map: this.mapToPaginationPage
    });
  }

   */

  public getPage(page: PageRequest): Observable<PageResponse<T>> {

    const url = this.baseUrl + this.getResourcePath();
    var params: HttpParams = new HttpParams();
    params = params.set("filter", page.buildRequestParamsFilters());
    params = params.set("page", page.page.toString());
    params = params.set("limit", page.limit.toString());
    return this.doRequest({
      url,
      method: "GET",
      options: {
        params: params
      }
      // map: this.mapToPaginationPage
    });
  }


  protected doRequest(args: {
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    options?: RequestOptions,
    map?: (any) => any,
    errorHandler?: (error: HttpErrorResponse) => Observable<any>
  }): Observable<any> {

    /*si no tiene response type, ponele json por defecto*/
    if (args.options == null || args.options.responseType == null)
      args.options = {...args.options, responseType: 'json'} as RequestOptions;

    /* si pasas un error handler, se lo agrego a los params */
    if (args.errorHandler) {
      if (args.options == null)
        args.options = {};
      args.options.params = new ErrorHandlingHttpParams({...args.options.params, onError: args.errorHandler});
    }

    const response = this.http.request(args.method, args.url, args.options);
    return args.map ? response.pipe(map(args.map)) : response;
  }

}

export type RequestOptions = {
  body?: any;
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  params?: HttpParams | ErrorHandlingHttpParams | {
    [param: string]: string | string[];
  };
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';

};

export class ErrorHandlingHttpParams extends HttpParams {
  onError: (error: HttpErrorResponse) => Observable<any>;

  constructor(o: Partial<ErrorHandlingHttpParams>) {
    super();
    Object.assign(this, o);
  }
}
