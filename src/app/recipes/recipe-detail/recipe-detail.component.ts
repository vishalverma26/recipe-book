import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;

  constructor(private recipeSvc: RecipeService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = +params?.id;
      this.recipe = this.recipeSvc.getRecipe(+params?.id);
    });
  }

  addToShoppingList() {
    this.recipeSvc.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  deleteRecipe() {
    this.recipeSvc.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
