import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class AuthService {
  public token: string;
  constructor(private http: Http) { }

}
