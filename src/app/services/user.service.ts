import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { User } from "../models/user.model";

@Injectable()
export class UserService {
    private serverUrl = 'http://localhost:3000';

    constructor(private http: Http) {
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser['token'] });
            return new RequestOptions({ headers: headers })
        }
    }

    getUser(userId: string) {
        return this.http.post(this.serverUrl + '/users/profile', { 'userId': userId }, this.jwt()).map((response: Response) => response.json());
    }

    createUser(user: User) {
        return this.http.post(this.serverUrl + '/users/signup', user, this.jwt())
    }

}
