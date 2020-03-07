import { Component, ElementRef } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "RecipieWithShopping";
  is_recipie: boolean = true;
  selectHeaderElement(event: boolean) {
    this.is_recipie = event;
  }
}
