import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { Recipie } from "../../recipie.model";
import { RecipieService } from "../../recipie.service";

@Component({
  selector: "app-recipie-item",
  templateUrl: "./recipie-item.component.html",
  styleUrls: ["./recipie-item.component.css"]
})
export class RecipieItemComponent implements OnInit {
  @Input() r: Recipie;

  constructor(private recipieService: RecipieService) {}

  ngOnInit() {}
  passToList() {
    this.recipieService.recipieSelected.emit(this.r);
  }
}
