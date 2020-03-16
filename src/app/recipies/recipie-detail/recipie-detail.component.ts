import { Component, OnInit } from "@angular/core";
import { Recipie } from "../recipie.model";
import { RecipieService } from "../recipie.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-recipie-detail",
  templateUrl: "./recipie-detail.component.html",
  styleUrls: ["./recipie-detail.component.css"]
})
export class RecipieDetailComponent implements OnInit {
  recipie: Recipie;
  index: number = -1;

  constructor(
    private recipieService: RecipieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      const id = param["id"];
      this.index = +id;
      this.recipie = this.recipieService.getRecipie(+id);
    });
  }

  addToShoppingList() {
    this.recipieService.addToShoppingList(this.recipie.ingredients);
  }
}
