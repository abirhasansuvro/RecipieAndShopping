import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: "", redirectTo:"/recipies",pathMatch:"full" },
  {path:'auth',component:AuthComponent},
  {path:'recipies',loadChildren:'./recipies/recipies.module#RecipiesModule'},
  {path:'shopping-list',loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
