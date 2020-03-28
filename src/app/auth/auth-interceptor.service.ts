import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthIterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService){}

    intercept(req:HttpRequest<any>,handler:HttpHandler){
        return this.authService.user.pipe(
            take(1),
            exhaustMap(
                userObj=>{
                    if(!userObj)return handler.handle(req);
                    let new_req=req.clone({params:new HttpParams().set('auth',userObj.token)});
                    return handler.handle(new_req);
                }
            )
        );
    }
}