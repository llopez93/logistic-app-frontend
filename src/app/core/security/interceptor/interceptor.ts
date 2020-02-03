import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from '../../service/snackbar.service';
import {environment} from "../../../../environments/environment";
import {ErrorHandlingHttpParams} from "../../service/generic.service";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router,
                private snackbarService: SnackbarService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.isPublicURL(req.url)){
          if (this.authService.isLoggedIn()) {
            req = req.clone({
              setHeaders: {
                Authorization : this.authService.getToken()
              }
            });
          } else {
            this.router.navigate(['login']);
            return of(null);
          }
        }

        //TODO hacer esto en otro lado
        if(req.body != null){
          req = req.clone({
            setHeaders: {
              "Content-Type": "application/json",
            }
          });
        }

        if(req.params instanceof ErrorHandlingHttpParams) {
          return next.handle(req).pipe(catchError((req.params as ErrorHandlingHttpParams).onError));
        }

        return next.handle(req).pipe(catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
                switch (err.status) {
                    case 401:
                        this.snackbarService.show({title: `Sin autorización`, type: 'error'});
                        this.router.navigate(['login']);
                        break;
                    case 403:
                        this.snackbarService.show({
                            title: "Permisos Insuficientes",
                            body: `Usted no posee los permisos necesarios para realizar la acción solicitada.
                            Si desea contar con dichos permisos póngase en contacto con el administrador del sistema`,
                            type: 'error'});
                        break;
                    case 404:
                        this.snackbarService.show({
                          title: "Error 404",
                          type: 'error'});
                        break;
                    default:
                        console.error(err);
                        this.snackbarService.show({title: "Se produjo un error inesperado", type: 'error'});
                        break;
                }
            }
            return of(err);
        }));

    }


    private isPublicURL(url :string): boolean {
      const path = url.substring(environment.backendHost.length);
      return path.startsWith("/auth") || path.startsWith("/ws") || path.startsWith("/public")
    }
}

