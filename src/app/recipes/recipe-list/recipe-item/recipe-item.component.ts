import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() id: number | string;
  constructor(private recipeSvc: RecipeService) {}

  ngOnInit(): void {
  }

  onSelected($event) {
    // this.recipeSvc.recipeSelected.next(this.recipe);
  }

}
