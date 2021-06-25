import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { Auth } from 'aws-amplify';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  Roles: any = ['Admin', 'Author', 'Reader'];
  constructor(private formBuilder: FormBuilder,private router: Router) {

    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  async registerWithCognito(){
    if (this.registerForm.invalid) {
      return;
    }


    try {
      var user = await Auth.signUp({
        username: this.f.email.value,
        password: this.f.password.value,
        attributes: {
          email: this.f.email.value
        }
      });
      console.log({ user });
      alert('User signup completed , please check verify your email.');
      this.router.navigate(['login']);
    } catch (error) {
      console.log('error signing up:', error);
      if(error.message!=null){
        alert(error.message);
      }
    }
  }

}
