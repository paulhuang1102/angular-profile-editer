import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class SavePageService {
    private serverUrl = 'http://localhost:3000';

    constructor(private http: Http, private router: Router) {
    }
    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers })
        }
    }

    uploadImage(formData) {
        let xhr = new XMLHttpRequest();
        let progress = 0;
        xhr.upload.onprogress = (event) => {
            progress = Math.round(event.loaded / event.total * 100);
        };
        xhr.open('POST', this.serverUrl + '/editor/upload', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token);
        xhr.send(formData);
        return false;
    }

    postData(formData, data, folderName): Observable<any> {

        return this.http.post(this.serverUrl + '/editor/folder', { postName: folderName }, this.jwt()).map((response: Response) => {
            this.uploadImage(formData);
            return this.http.post(this.serverUrl + '/editor/save', data, this.jwt());
        }).concatAll();

    }

}
