import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (isPlatformBrowser(this.platformId)) {
            if (localStorage.getItem('currentUser')) {
                return true;
            }
            console.log(localStorage.getItem('currentUser'));
            this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
            return false;
        }

    }
}