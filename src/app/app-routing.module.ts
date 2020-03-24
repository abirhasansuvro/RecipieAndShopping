import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipiesComponent } from "./recipies/recipies.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipieItemComponent } from "./recipies/recipie-list/recipie-item/recipie-item.component";
import { RecipieDetailComponent } from "./recipies/recipie-detail/recipie-detail.component";
import { RecipieStartComponent } from "./recipies/recipie-start/recipie-start.component";
import { RecipieEditComponent } from "./recipies/recipie-edit/recipie-edit.component";
import { RecipieResolverService } from './recipies/recipie-resolver.service';
const routes: Routes = [
  { path: "", redirectTo: "/recipies", pathMatch: "full" },
  {
    path: "recipies",
    component: RecipiesComponent,
    children: [
      { path: "", component: RecipieStartComponent },
      { path: "new", component: RecipieEditComponent },
      { path: ":id", component: RecipieDetailComponent,resolve:[RecipieResolverService] },
      { path: ":id/edit", component: RecipieEditComponent,resolve:[RecipieResolverService] }
    ]
  },
  { path: "shopping-list", component: ShoppingListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
