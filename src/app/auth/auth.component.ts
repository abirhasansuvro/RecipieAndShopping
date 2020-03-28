import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {

  isLoginMode:boolean=false;
  isLoading:boolean=false;
  errorMessage:string=null;

  ourForm:FormGroup;
  onlySubscription:Subscription;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.ourForm=new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      password:new FormControl(null,Validators.required)
    });
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(){
    if (!this.ourForm.valid)return;
    let emailEntered:string=this.ourForm.get('email').value;
    let passwordEntered:string=this.ourForm.get('password').value;

    this.isLoading=true;

    if(this.isLoginMode){
      console.log('Inside login');
      this.authService.logIn(emailEntered,passwordEntered).subscribe(
        res_data=>{
          console.log(res_data);
          this.isLoading=false;
          this.router.navigate(['/recipies']);
        },
        convertedErrorMessageFromService=>{
          console.log(convertedErrorMessageFromService);
          this.errorMessage=convertedErrorMessageFromService;
          this.isLoading=false;
        }
      );
    }else{
      this.authService.signUp(emailEntered,passwordEntered).subscribe(
        res_data=>{
          console.log(res_data);
          this.isLoading=false;
          this.router.navigate(['/recipies']);
        },
        convertedErrorMessageFromService=>{
          console.log(convertedErrorMessageFromService);
          this.errorMessage=convertedErrorMessageFromService;
          this.isLoading=false;
        }
      );
    }

    this.ourForm.reset();

  }

  onHandleError(){
    this.errorMessage=null;
  }

  ngOnDestroy(){
    //this.onlySubscription.unsubscribe();
  }
}
