import { Component, OnInit, OnDestroy } from "@angular/core";
import { Recipie } from "../recipie.model";
import { RecipieService } from "../recipie.service";
import { Router } from "@angular/router";
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-recipie-list",
  templateUrl: "./recipie-list.component.html",
  styleUrls: ["./recipie-list.component.css"]
})
export class RecipieListComponent implements OnInit,OnDestroy {
  recipies: Recipie[] = [];
  newSubsc:Subscription;

  constructor(private recipieService: RecipieService, private router: Router,private storageService :DataStorageService) {}

  ngOnInit() {
    this.newSubsc=this.storageService.fetchRecipies().subscribe(
      (data:Recipie[])=>{
        this.recipies=this.recipieService.getRecipies();
      }
    );
  }
  addNewRecipie() {
    this.router.navigate(["/recipies", "new"]);
  }

  ngOnDestroy(){
    this.newSubsc.unsubscribe();
  }
}
