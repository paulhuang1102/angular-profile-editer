import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class SavePageService {
    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });
    private serverUrl = 'http://localhost:3000';

    constructor(private http: Http) {
    }

    uploadAll(data): Observable<any> {
        return this.http.post(this.serverUrl + '/editor/save', data, this.jwt());
    }

    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers })
        }
    }

    uploadImage(formData, data): Observable<any> {
        let xhr = new XMLHttpRequest();
        let progress = 0;
        xhr.upload.onprogress = (event) => {
            progress = Math.round(event.loaded / event.total * 100);
        };
        xhr.open('POST', this.serverUrl + '/editor/upload', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token);
        xhr.send(formData);
        return this.uploadAll(data);
    }

    postData(formData, data, folderName): Observable<any> {
        this.http.post(this.serverUrl + '/editor/folder', { postName: folderName }, this.jwt()).subscribe(
            res => {
                return this.uploadImage(formData, data);
            },
            error => {
                return;
            }
        );
        return this.uploadImage(formData, data);
    }
}
