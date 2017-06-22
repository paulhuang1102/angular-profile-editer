import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

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

    uploadImage(formData, data, id) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.serverUrl + '/editor/upload/' + data.userId + '_' + id, true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token);
        xhr.send(formData);
        return true;
    }

    saveData(formData, data): Observable<any> {
        return this.http.post(this.serverUrl + '/editor/save', data, this.jwt()).map((response: Response) => {
            this.uploadImage(formData, data, response.json());
        });
    }

    getPost(postId): Observable<any> {
        return this.http.post(this.serverUrl + '/editor/' + postId, {}, this.jwt()).map((response: Response) => response.json());
    }

    putPost(formData, postId, newPost, removeItems): Observable<any> {
        return this.http.put(this.serverUrl + '/editor/' + postId, {
            newPost: newPost,
            removeItems: removeItems
        }, this.jwt())
            .map((response: Response) => {
                return this.http.post(this.serverUrl + '/editor/delete/' + postId, {
                    removeItems: removeItems,
                    folderName: newPost.userId + '_' + postId
                }, this.jwt())
                    .map((response: Response) => {
                        console.log('upload start');
                        let xhr = new XMLHttpRequest();
                        xhr.open('POST', this.serverUrl + '/editor/upload/' + newPost.userId + '_' + postId, true);
                        xhr.setRequestHeader('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token);
                        xhr.send(formData);
                        return true;
                    })
            });
    }


}
