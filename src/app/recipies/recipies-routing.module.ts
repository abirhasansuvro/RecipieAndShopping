import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipiesComponent } from './recipies.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipieStartComponent } from './recipie-start/recipie-start.component';
import { RecipieEditComponent } from './recipie-edit/recipie-edit.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipieResolverService } from './recipie-resolver.service';

const routes:Routes=[
    {
        path: "",
        component: RecipiesComponent,
        canActivate:[AuthGuard],
        children: [
          { path: "", component: RecipieStartComponent },
          { path: "new", component: RecipieEditComponent },
          { path: ":id", component: RecipieDetailComponent,resolve:[RecipieResolverService] },
          { path: ":id/edit", component: RecipieEditComponent,resolve:[RecipieResolverService] }
        ]
      }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipiesRoutingModule{}