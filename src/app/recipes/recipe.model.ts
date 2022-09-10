import { Ingredient } from "../shared/misc/ingredient.model";

export class Recipe {
  constructor(public name: string, public description: string, public imagePath: string, public ingredients: Ingredient[]) { }
}
