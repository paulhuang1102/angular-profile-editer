import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}