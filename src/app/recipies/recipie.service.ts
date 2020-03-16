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
    ),
    new Recipie(
      "Nanna Miar Biriyani",
      "Historical food from old dhaka",
      "https://foodiezlivestorage.blob.core.windows.net/images-new/UploadedImages/GuidesImages/14add255-2ac4-c136-e7cc-08d53eee3fa0/58fd64a7-c800-4cfc-812b-9058eb2688e5_large.jpg",
      [new Ingredient("Basmoti", 1.5), new Ingredient("Goats beef", 0.5)]
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
  getRecipie(index: number): Recipie {
    return this.recipies[index];
  }
}
