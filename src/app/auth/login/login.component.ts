import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginRequestPayload } from "./login-request.payload";
import { AuthService } from "../shared/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  private isLoading: boolean = false;
  private loginRequestPayload: LoginRequestPayload;
  private loginForm: FormGroup;
  private registerSuccessMessage: string;
  isError: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.loginRequestPayload = {
      username: "",
      password: "",
    };
  }
  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.registered !== undefined && params.registered === "true") {
        this.toastr.success("Signup Successful");
        this.registerSuccessMessage =
          "Please check your inbox for activate your account before you login!";
        // setTimeout(() => {
        //   this.toastr.success("Register Successful, please login");
        // }, 0);
      }
    });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  login() {
    this.isLoading = true;
    this.loginRequestPayload.username = this.loginForm.get("username").value;
    this.loginRequestPayload.password = this.loginForm.get("password").value;

    this.authService.login(this.loginRequestPayload).subscribe(
      (data) => {
        console.log("Login successful");
        this.isLoading = false;
        this.isError = false;
        this.router.navigateByUrl("/");
        this.toastr.success("Login successful");
      },
      (err) => {
        this.isLoading = false;
        this.isError = true;
      }
    );
  }
}
