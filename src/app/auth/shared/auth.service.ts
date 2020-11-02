import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SignupRequestPayload } from "../signup/signup-request.payload";
import { Observable, throwError } from "rxjs";
import { LoginRequestPayload } from "../login/login-request.payload";
import { LoginResponse } from "../login/login-response-payload";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  constructor(private httpclient: HttpClient) {}

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName(),
  };

  signup(signupRequestPayLoad: SignupRequestPayload): Observable<any> {
    return this.httpclient.post(
      "http://localhost:8082/api/auth/signup",
      signupRequestPayLoad
    );
  }

  login(loginRequestPayLoad: LoginRequestPayload): Observable<boolean> {
    return this.httpclient
      .post<LoginResponse>(
        "http://localhost:8082/api/auth/login",
        loginRequestPayLoad
      )
      .pipe(
        map((data) => {
          localStorage.setItem("authenticationToken", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("expiresAt", data.expiresAt);
          localStorage.setItem("refreshToken", data.refreshToken);

          this.loggedIn.emit(true);
          this.username.emit(data.username);
          return true;
        })
      );
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName(),
    };

    return this.httpclient
      .post<LoginResponse>(
        "http://localhost:8082/api/auth/refresh/token/",
        refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          console.log(response);
          localStorage.setItem("authenticationToken", response.token);
          localStorage.setItem("expiresAt", response.expiresAt);
        })
      );
  }

  getJwtToken() {
    return localStorage.getItem("authenticationToken");
  }

  getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  getUserName() {
    return localStorage.getItem("username");
  }

  logout() {
    this.httpclient
      .post("http://localhost:8082/api/auth/logout", this.refreshTokenPayload)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          throwError(error);
        }
      );
    localStorage.removeItem("username");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("authenticationToken");
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
