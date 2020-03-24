import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipieService } from '../recipies/recipie.service';
import { Recipie } from '../recipies/recipie.model';
import {map,tap} from 'rxjs/operators';
@Injectable({
    providedIn:'root'
})
export class DataStorageService{
    constructor(private http:HttpClient,private recipieService:RecipieService){}

    storeRecipies(){
        const recipies=this.recipieService.getRecipies();
        this.http.put('https://recipiewithshopping.firebaseio.com/recipies.json',recipies).subscribe(
            response=>{
                console.log(response);
            }
        );
    }

    fetchRecipies(){
        return this.http.get<Recipie[]>('https://recipiewithshopping.firebaseio.com/recipies.json').
        pipe(
            map(
                data=>{
                    return data.map(
                        recipie=>{
                            if(recipie.ingredients==undefined)recipie.ingredients=[];
                            return recipie;
                        }
                    );
                }
            ),
            tap(
                response=>{
                    this.recipieService.setRecipies(response);
                }
            )
        );
    }
}