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

    uploadAll(formData): Observable<any> {
        let xhr = new XMLHttpRequest();
        let progress = 0;
        xhr.upload.onprogress = (event) => {
            progress = Math.round(event.loaded / event.total * 100);
            console.log(progress)
        };

        xhr.open('POST', this.serverUrl + '/upload', true);
        xhr.send(formData);
        return this.http.post(this.serverUrl + '/save', this.options);
    }
}
