import { Component, OnInit } from "@angular/core";
import { Recipie } from "../recipie.model";
import { RecipieService } from "../recipie.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-recipie-list",
  templateUrl: "./recipie-list.component.html",
  styleUrls: ["./recipie-list.component.css"]
})
export class RecipieListComponent implements OnInit {
  recipies: Recipie[] = [];

  constructor(private recipieService: RecipieService, private router: Router) {}

  ngOnInit() {
    this.recipies = this.recipieService.getRecipies();
  }
  addNewRecipie() {
    this.router.navigate(["/recipies", "new"]);
  }
}
