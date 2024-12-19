import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private us: UserService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  loginFormSubmit() {
    this.us.getUser(this.loginForm.value.email).then(
      (res: any) => {
        console.log('Login Form submittes sucefully', res);
        if (res.length == 0) {
          console.log('User Does not exist');
          this.openSnackBar('User Does not exist', 'ok')
        } else if (res[0].password !== this.loginForm.value.password) {
          console.log('Incorrect password');
          this.openSnackBar('Incorrect password', 'ok')
        } else {
          this.openSnackBar('Login Successfull', 'ok')
          this.router.navigate(['/public-gallery']);
          this.us.user = res[0],
          console.log('from header ', this.us.user)
            localStorage.setItem('user', JSON.stringify(res[0]))
        }
      }
    )
      .catch(
        (err) => {
          console.log('Some error has occured', err)
        }
      )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
