import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AppAuthComponent } from "./auth.component";

@NgModule({
  declarations: [AppAuthComponent],
  imports: [FormsModule, SharedModule, AuthRoutingModule],
  exports: [AppAuthComponent]
})
export class AuthModule {}
