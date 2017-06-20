import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class PostService {
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  private serverUrl = 'http://localhost:3000';
  constructor(private http: Http) { }

  getPost(postId: string):Observable<any> {
    return this.http.post(this.serverUrl + '/post', { 'postId': postId}, this.options).map((response: Response) => response.json());
  }

}
