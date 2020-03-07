import { Recipie } from "./recipie.model";
import { EventEmitter, Output, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipieService {
  private recipies: Recipie[] = [
    new Recipie(
      "Kabuli Polao",
      "A tasty recipie made by afgan people",
      "https://media-cdn.tripadvisor.com/media/photo-s/0e/b0/ef/b1/20170317-142002-largejpg.jpg",
      [new Ingredient("Polao", 2), new Ingredient("Khasir Gosto", 2)]
    )
  ];
  constructor(private slService: ShoppingListService) {}
  @Output() recipieSelected = new EventEmitter<Recipie>();
  getRecipies() {
    return this.recipies.slice();
  }
  addToShoppingList(ings: Ingredient[]) {
    this.slService.addIngredients(ings);
  }
}
