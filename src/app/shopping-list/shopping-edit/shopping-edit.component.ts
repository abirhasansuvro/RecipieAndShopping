import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  errorMsg: string = "";
  @ViewChild("f", { static: true }) addForm: NgForm;
  constructor(private shoppinglistService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppinglistService.onstartEditting.subscribe(
      value => {
        this.editMode = true;
        this.editedItemIndex = value;
        const selectedItem = this.shoppinglistService.getingredient(value);
        this.addForm.setValue({
          name: selectedItem.name,
          ammount: selectedItem.ammount
        });
      }
    );
  }

  onAdd() {
    const name: string = this.addForm.value.name;
    const ammount: number = this.addForm.value.ammount;
    if (this.editMode)
      this.shoppinglistService.updateIngredient(
        this.editedItemIndex,
        new Ingredient(name, ammount)
      );
    else this.shoppinglistService.addIngredient(name, ammount);
    this.editMode = false;
    this.addForm.reset();
  }

  onDelete() {
    if (this.editMode) {
      this.shoppinglistService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }
  }

  onClear() {
    this.addForm.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
