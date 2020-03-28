import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { RecipiesComponent } from './recipies.component';
import { RecipieListComponent } from './recipie-list/recipie-list.component';
import { RecipieDetailComponent } from './recipie-detail/recipie-detail.component';
import { RecipieStartComponent } from './recipie-start/recipie-start.component';
import { RecipieEditComponent } from './recipie-edit/recipie-edit.component';
import { RecipieItemComponent } from './recipie-list/recipie-item/recipie-item.component';
import { RouterModule } from '@angular/router';
import { RecipiesRoutingModule } from './recipies-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations:[
        RecipiesComponent,
        RecipieListComponent,
        RecipieDetailComponent,
        RecipieStartComponent,
        RecipieEditComponent,
        RecipieItemComponent
    ],
    imports:[ReactiveFormsModule,RouterModule,SharedModule,RecipiesRoutingModule]
})
export class RecipiesModule {
}