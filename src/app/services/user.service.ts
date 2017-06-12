import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { User } from "../models/user.model";

@Injectable()
export class UserService {
    private serverUrl = 'localhost:3000';
    constructor(private http: Http, private authService: AuthService) {
    }

    getUser(): Observable<User> {

        let headers = new Headers({ 'Authorization': 'Bearer ' + this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.serverUrl + '/user', options)
            .map((response: Response) => response.json());
    }

}
