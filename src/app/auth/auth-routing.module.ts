import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppAuthComponent } from "./auth.component";

const routes: Routes = [{
  path: '',
  component: AppAuthComponent
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
