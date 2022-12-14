import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  editMode: boolean = false;
  id: number;
  recipeForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute, private recipeSvc: RecipeService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.id = +params?.id;
      this.editMode = params?.id != null;
      this.initForm();
    });
  }

  get recipeIngredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    // edit mode recipe
    if (this.editMode) {
      const recipe = this.recipeSvc.getRecipe(this.id);
      recipeName = recipe?.name;
      recipeImagePath = recipe?.imagePath;
      recipeDescription = recipe?.description;
      // if we have ingredients
      if (recipe?.ingredients?.length) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, [Validators.required]),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    const ingredients = (<FormArray>this.recipeForm.get('ingredients'));
    ingredients.push(new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onSubmit() {
    // change this to make sure the ID is autogenerated
    // const recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // )
    if(this.editMode) {
      this.recipeSvc.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeSvc.addRecipe(this.recipeForm.value);
    }
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}

