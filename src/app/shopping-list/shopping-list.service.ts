import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Orange", 6)
  ];
  getIngredients() {
    return this.ingredients;
  }
  addIngredient(name: string, ammount: number) {
    this.ingredients.push(new Ingredient(name, ammount));
  }
  addIngredients(ings: Ingredient[]) {
    this.ingredients.push(...ings);
  }
}
