import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
    private serverUrl = 'http://localhost:3000';

    constructor(private http: Http) {
    }

    login(email: string, password: string): Observable<boolean> {
        return this.http.post(this.serverUrl + '/users/login', { email: email, password: password })
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return true;
                } else {
                    return false;
                }
            })
    }

    logout(): void {
        localStorage.removeItem('currentUser');
    }
}
