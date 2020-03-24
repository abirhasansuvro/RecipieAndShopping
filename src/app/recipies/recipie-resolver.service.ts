import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Recipie } from './recipie.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipieService } from './recipie.service';

@Injectable({providedIn:'root'})
export class RecipieResolverService implements Resolve<Recipie[]>{
    constructor(private data_store:DataStorageService,private recipieService:RecipieService){}

    resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): Recipie[] | import("rxjs").Observable<Recipie[]> | Promise<Recipie[]> {
        const recipies=this.recipieService.getRecipies();
        if(recipies.length===0)return this.data_store.fetchRecipies();
        else return recipies;
    }

}