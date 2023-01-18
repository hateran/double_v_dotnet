import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from '../../@core/auth/auth.utils';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _authenticated: boolean = false;
    public user: any;
    isLogged: any;

    constructor(
        private _httpClient: HttpClient
    ) { }

    /**
       * Setter & getter for access token
       */
    set accessToken(token: string) {
        localStorage.setItem('test_access_token', token);
    }

    get accessToken(): string {
        return localStorage.getItem('test_access_token') ?? '';
    }

    signIn(form: any): Observable<any> {

        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${environment.apiUrl}/User/login`, form).pipe(switchMap((response: any) => {
            if (response.status == 200) {
                // Store the access token in the local storage
                this.accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c2VyIjoiMSIsInNlc3Npb25fa2V5IjoiTlc1NVYwRTFlbE5JT0VObGJ6UklSUzh4VURKbGVFaE9PVzhyTjJGRU9ETmpXV2swWTFWQ2JtZEtkejA9IiwiaXNzIjoiY29udmVydCIsImlhdCI6MTY3MzQzNTY3NiwiZXhwIjoxNjg5MDc0MDc2fQ.5hxWjwCGUsFM28lcoTQKJ-3IdUqsmwRVdsZRjaFMbxc';

                // Set the authenticated flag to true
                this._authenticated = true;
                this.signInUsingToken().subscribe();
            }

            // Return a new observable with the response
            return of(response);
        })
        );
    }

    /**
       * Sign in using the access token
       */
    signInUsingToken(): Observable<any> {
        if (this._authenticated) {
            return of(true);
        }

        return of(false);
    }

    signUp(form: any) {
        let _headers = new HttpHeaders();

        return this._httpClient.post(`${environment.apiUrl}/User`, form, {
            headers: _headers
        });
    }

    /**
       * Sign out
       */
    signOut(): Observable<any> {
        this.user = undefined;
        localStorage.removeItem('test_access_token');
        window.location.replace('login');
        // Set the authenticated flag to false
        this._authenticated = false;
        return of(true)
    }

    /**
      * Check the authentication status
      */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
