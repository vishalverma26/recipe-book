import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription = new Subscription();

  constructor(private recipeSvc: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeSvc.getRecipes();

    this.subscription.add(this.recipeSvc.recipeChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
