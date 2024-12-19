import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private us: UserService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(9)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  registerFormSubmit() {
    console.log(this.registerForm.value)
    this.us.createUser(this.registerForm.value).then(
      (response: any) => {
        console.log('Form has been submitted', response);
        this.openSnackBar('Registration Successfull', 'Ok');
        this.router.navigate(['public-gallery']);
        this.us.user = response[0],
        console.log('from header ', this.us.user)
        localStorage.setItem('user', JSON.stringify(response[0]))
      }
      )
      .catch(
        (err: Error)=>{
          console.log('Some error has been occured', err)
          this.openSnackBar('Some error has been occured while Registration', 'Ok')
      }
    )


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
