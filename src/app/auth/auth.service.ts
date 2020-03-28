import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {throwError,  BehaviorSubject} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface responseData{
    kind:string,
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(private http:HttpClient,private router:Router){}
    private tokenExpirationTimer:any;
    user = new BehaviorSubject<User>(null);

    signUp(email:string,pass:string){
        return this.http.post<responseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAE3oT9L65LEE-ihtyq1DI_OIv-RxFvBaI',
        {email:email,password:pass,returnSecureToken:true})
        .pipe(
            catchError(errorRes=>{
                let errorMessage="Unknown error occured!";
                if(!errorRes.error || !errorRes.error.error)return throwError(errorMessage);
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                      errorMessage='The email you entered is already in use.'
                      break;
                  }
                return throwError(errorMessage);
            }),
            tap(
                resData=>{
                    let expirationtime=new Date(new Date().getTime()+ +resData.expiresIn*1000);
                    let new_user=new User(resData.email,resData.localId,resData.idToken,expirationtime);
                    this.user.next(new_user);
                    this.autoLogout(+resData.expiresIn*1000);
                    localStorage.setItem('userData',JSON.stringify(new_user));
                }
            )
        );
    }

    logIn(email:string,pass:string){
        return this.http.post<responseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAE3oT9L65LEE-ihtyq1DI_OIv-RxFvBaI',
        {email:email,password:pass,returnSecureToken:true})
        .pipe(
            catchError(errorRes=>{
                let errorMessage="Unknown error occured!";
                if(!errorRes.error || !errorRes.error.error)return throwError(errorMessage);
                switch(errorRes.error.error.message){
                    case 'EMAIL_NOT_FOUND':
                    case 'INVALID_PASSWORD':
                      errorMessage='Either email or password is incorrect.'
                      break;
                  }
                return throwError(errorMessage);
            }),
            tap(
                resData=>{
                    let expirationtime=new Date(new Date().getTime()+ +resData.expiresIn*1000);
                    let new_user=new User(resData.email,resData.localId,resData.idToken,expirationtime);
                    this.user.next(new_user);
                    this.autoLogout(+resData.expiresIn*1000);
                    localStorage.setItem('userData',JSON.stringify(new_user));
                }
            )
        );
    }

    autoLogin(){
        const userData:{email:string,id:string,_token:string,_tokenExpirationDate:string}=JSON.parse(localStorage.getItem('userData'));
        if(!userData)return;
        const loaded_user=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loaded_user.token){
            this.user.next(loaded_user);
            const expirationDuration=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
            this.router.navigate(['/recipies']);
            this.autoLogout(expirationDuration);
        }
        else this.user.next(null);
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem("userData");

        if(this.tokenExpirationTimer)clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer=null;
    }

    autoLogout(expirationTimeMillisecond:number){
        this.tokenExpirationTimer= setTimeout(()=>{this.logOut()},expirationTimeMillisecond);
    }
}