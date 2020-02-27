import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.evaluate(route, state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.evaluate(childRoute, state);
  }

  private evaluate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //TODO: Revisar seguridad
    if (this.authService.isLoggedIn()) {
      //if (route.data && route.data.fx && (route.data.fx as string[]).some(fx => fx === "User.UPDATE")) {
        return true;
      //}
    }
    this.router.navigate(['login']);
    console.log("No esta logeado");
    return false;
  }

}
