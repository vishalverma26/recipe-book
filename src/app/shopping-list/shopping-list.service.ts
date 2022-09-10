import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/misc/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientUpdated = new Subject<Ingredient[]>();
  startedEditing = new Subject<number | string>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  // get ingredients() {
  //   return this._ingredients.slice();
  // }

  getIngredients() {
    return this._ingredients.slice();
  }

  getIngredient(index) {
    return this._ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients.push(ingredient); // earlier this was this.ingridient.push so we were getting a different copy and getting pushed into that COPY and not ORIGINAL
    this.ingredientUpdated.next(this._ingredients.slice()); // and here again we were being sent different copy of original
  }

  addIngredients(ingredients: Ingredient[]) {
    this._ingredients = [ ...this._ingredients, ...ingredients ];
    this.ingredientUpdated.next(this._ingredients.slice()); // Not required though
  }

  updateIngredient(index, ingredient: Ingredient) {
    this._ingredients[index] = ingredient;
    this.ingredientUpdated.next(this._ingredients.slice());
  }

  deleteIngredient(index) {
    if(index !== '') {
      this._ingredients.splice(index, 1);
      this.ingredientUpdated.next(this._ingredients.slice());
    }
  }

}
