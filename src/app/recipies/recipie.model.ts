import { Ingredient } from "../shared/ingredient.model";

export class Recipie {
  public name: string;
  public description: string;
  public imagepath: string;
  public ingredients: Ingredient[];
  constructor(
    name: string,
    desc: string,
    img: string,
    ingredients: Ingredient[]
  ) {
    this.name = name;
    this.description = desc;
    this.imagepath = img;
    this.ingredients = ingredients;
  }
}
