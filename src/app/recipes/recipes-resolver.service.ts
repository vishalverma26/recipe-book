import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/services/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe[]>{

  constructor(private dataSvc: DataStorageService, private recipeSvc: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeSvc.getRecipes();
    if(recipes.length) {
      return recipes;
    } else {
      return this.dataSvc.fetchRecipes();
    }
  }
}
