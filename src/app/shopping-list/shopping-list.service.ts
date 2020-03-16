import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  onstartEditting = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Orange", 6)
  ];
  getingredient(index: number): Ingredient {
    return this.ingredients[index];
  }
  getIngredients() {
    return this.ingredients;
  }
  addIngredient(name: string, ammount: number) {
    this.ingredients.push(new Ingredient(name, ammount));
    this.ingredientsChanged.next(this.ingredients);
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
  }
  addIngredients(ings: Ingredient[]) {
    this.ingredients.push(...ings);
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }
}
