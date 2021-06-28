import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { Auth } from 'aws-amplify';
import {AuthenticationService} from "../_services/authentication.service";
import {first} from "rxjs/internal/operators";
import {AlertService} from "@app/_services";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor( private formBuilder: FormBuilder,private router: Router,private  auth: AuthenticationService,
               private alertService: AlertService) {

    this.returnUrl="";
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.f.email.setValue("");
  }

  ngOnInit(): void {

    this.returnUrl="";
    this.loginForm.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginWithCognito11() {


    console.log('Authentication performed for user=' + this.f.email.value + 'password=' + this.f.password.value + ' login result==');
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
    this.loginForm.reset();
  }

   loginWithCognito() {
     this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    try {
     // var user = await Auth.signIn(this.f.email.value, this.f.password.value);

      var user = this.auth.login(this.f.email.value, this.f.password.value)
        .then(result=> {
          if(result==true)
            this.router.navigate(['dashboard']);
          else {
            this.error = result;
            this.alertService.error(this.error,{autoClose:true});
          }
      });

      // if(user){
      //   this.error = "userrr";
      // }else {
      //   this.error = "sdsds";
      // }

      console.log('Authentication performed for user=' + this.f.email.value + 'password=' + this.f.password.value + ' login result==' + user);

      // var tokens = user.signInUserSession;
      // console.log('User tokens>> ' + tokens);

      // if (tokens != null) {
      //   console.log('User authenticated');

        //this.router.navigate(['home']);
        //alert('You are logged in successfully !');

      //}
    } catch (error) {
      console.log(error);
      if(error.message!=null){
        alert(error.message);
        this.error = error.message;
      }else
      alert('User Authentication failed');

    }
  }

}
