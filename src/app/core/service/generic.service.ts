import { Injectable } from '@angular/core';
import Entity from '../domain/entity';
import { environment } from 'src/environments/environment';
import { AuthService } from '../security/service/auth.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export abstract class GenericService<T extends Entity> {

    protected baseUrl: string = environment.backendHost + environment.backendApiPath;

    protected constructor(protected http: HttpClient) {}

    protected abstract getResourcePath(): string;

    public getAll(): Observable<T[]> {
        const url = this.baseUrl + this.getResourcePath() + '/all';
        return this.http.get<T[]>(url);
    }

    public get(id: number): Observable<T> {
        const url = this.baseUrl + this.getResourcePath() + '/' + id;
        return this.http.get<T>(url);
    }

    public create(t: T): Observable<T> {
        const url = this.baseUrl + this.getResourcePath();
        return this.http.post<T>(url, t);
    }

    public update(t: T): Observable<T> {
      const url = this.baseUrl + this.getResourcePath();
      return this.http.put<T>(url, t);
    }

    public delete(t: number | T): Observable<number> {
        const id = typeof t !== 'number' ? (t as T).id : t as number;
        const url = this.baseUrl + this.getResourcePath() + '/' + id;
        return this.http.delete<number>(url);
    }



}
