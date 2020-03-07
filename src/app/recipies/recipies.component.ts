import { Component, OnInit } from "@angular/core";
import { Recipie } from "./recipie.model";
import { RecipieService } from "./recipie.service";
import { Ingredient } from "../shared/ingredient.model";

@Component({
  selector: "app-recipies",
  templateUrl: "./recipies.component.html",
  styleUrls: ["./recipies.component.css"],
  providers: [RecipieService]
})
export class RecipiesComponent implements OnInit {
  currentRecipie: Recipie = new Recipie(
    "Demo Recipie",
    "A demo recipie",
    "https://media-cdn.tripadvisor.com/media/photo-s/0e/b0/ef/b1/20170317-142002-largejpg.jpg",
    [new Ingredient("Darucini", 2), new Ingredient("Elachi", 1)]
  );
  constructor(private recipieService: RecipieService) {}

  ngOnInit() {
    this.recipieService.recipieSelected.subscribe(
      (r: Recipie) => (this.currentRecipie = r)
    );
  }
}
