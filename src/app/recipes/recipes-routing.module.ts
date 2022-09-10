import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { NoRecipeComponent } from "./no-recipe/no-recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolver } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [{
  path: '',
  component: RecipesComponent,
  resolve: [RecipeResolver],
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      pathMatch: 'full',
      component: NoRecipeComponent
    },
    {
      path: 'new',
      component: RecipeEditComponent
    },
    {
      path: ':id',
      component: RecipeDetailComponent
    },
    {
      path: ':id/edit',
      component: RecipeEditComponent
    },
    {
      path: ':id/auth',
      component: RecipeEditComponent
    }
  ]
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
