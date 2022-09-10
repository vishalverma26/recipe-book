import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../../recipes/recipe.model";
import { RecipeService } from "../../recipes/recipe.service";
import { apiUrl } from "../misc/api-url.constant";
import { map, tap } from 'rxjs/operators';
import { AuthService } from "../../auth/auth.service";

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(private http: HttpClient, private recipeSvc: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeSvc.getRecipes();
    const httpParams = new HttpParams().append('print', 'pretty');
    // const httpHeaders = new HttpHeaders().set('auth-basis', 'vishal-key');
    this.http.put(apiUrl.firebase, recipes, {
      params: httpParams,
      responseType: 'text'
    }).subscribe(response => {
      console.log(response);
    });
  }

  // This one with TAP should have workedO, find out why it did not!
  // fetchRecipes() {
  //   return this.http.get<Recipe[]>(apiUrl.firebase)
  //   .pipe(map(response => {
  //     return response.map(recipe => {
  //       return { ...recipe, ingredients: recipe.ingredients || [] };;
  //     }, tap((response: Recipe[]) => {
  //       this.recipeSvc.setRecipes(response);
  //     }))
  //   }));
  // }

  fetchRecipes() {
    return this.http.get<Recipe[]>(apiUrl.firebase).pipe(map(response => {
      let newRecipeList = response.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredients || [] };;
      });
      this.recipeSvc.setRecipes(newRecipeList);
      return newRecipeList;
    }));
  }
}
