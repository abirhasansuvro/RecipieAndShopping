import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipie-edit",
  templateUrl: "./recipie-edit.component.html",
  styleUrls: ["./recipie-edit.component.css"]
})
export class RecipieEditComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id == undefined) {
      this.id = -1;
    } else {
      this.id = id;
    }
  }
}
