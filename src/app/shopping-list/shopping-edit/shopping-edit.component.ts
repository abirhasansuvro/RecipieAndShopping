import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ShoppingListService } from "../shopping-list.service";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"]
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput", { static: false }) nameProperty: ElementRef;
  @ViewChild("amountInput", { static: false }) amountProperty: ElementRef;

  constructor(private shoppinglistService: ShoppingListService) {}

  ngOnInit() {}

  onAdd() {
    let name = this.nameProperty.nativeElement.value;
    let ammount = this.amountProperty.nativeElement.value;
    this.shoppinglistService.addIngredient(name, ammount);
  }

  onDelete() {}

  onClear() {}
}
