import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/@core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  loading: boolean = false;
  login: boolean = true;

  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      name: new FormControl('Antonio', Validators.required),
      password: new FormControl('12345', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  signIn() {
    this.loading = true;
    this._authService.signIn(this.loginForm.value).subscribe((response: any) => {
      if (response.status == 200) {
        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/people';
        this._router.navigateByUrl(redirectURL);
      }
      this.loading = false;
    });
  }

  register() {
    this.loading = true;
    this._authService.signUp(this.loginForm.value).subscribe((response: any) => {
      if (response.status == 401) {
        this.message = response.message;

        setTimeout(() => {
          this.message = '';
        }, 5000);
      } else {
        this.login = true;
      }

      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

}
