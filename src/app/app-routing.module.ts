import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./Auth/login/login.component";
import {LandingComponent} from "./pages/landing/landing.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {path: '', pathMatch : 'full', redirectTo: 'login'},
  {path: 'login', component:LoginComponent },
  {path: 'home', component:LandingComponent },
  {path: 'profile', component:ProfileComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
