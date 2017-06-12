import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
    public token: string;
    private serverUrl = 'localhost:3000';

    constructor(private http: Http) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.token = user && user.token;
    }

    login(account: string, password: string): Observable<boolean> {
        return this.http.post(this.serverUrl + '/login', JSON.stringify({ account: account, password: password }))
            .map((respose: Response) => {
                let token = respose.json() && respose.json().token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('currentUser', JSON.stringify({ user: account, token: this.token }));
                    return true;
                } else {
                    return false;
                }
            })
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
