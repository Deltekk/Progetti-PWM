import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    private port = 8300;
    private baseUrl = `http://localhost:${this.port}`;

    constructor(private http: HttpClient) { }

    Login(name: string, email: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, { name, email });
    }

    Signin(name: string, email: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/signin`, { name, email });
    }

}
