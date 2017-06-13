import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { User } from "../models/user.model";

@Injectable()
export class UserService {
    private serverUrl = 'http://localhost:3000';

    constructor(private http: Http, private authService: AuthService) {
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers })
        }
    }

    getUser(userId) {
        return this.http.get(this.serverUrl + '/users/' + userId, this.jwt()).map((response: Response) => response.json());
    }

    createUser(user: User) {
        return this.http.post(this.serverUrl + '/users/signup', user, this.jwt())
    }

}
