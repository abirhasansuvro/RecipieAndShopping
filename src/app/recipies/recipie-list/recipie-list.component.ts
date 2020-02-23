import { Component, OnInit } from "@angular/core";
import { Recipie } from "../recipie.model";

@Component({
  selector: "app-recipie-list",
  templateUrl: "./recipie-list.component.html",
  styleUrls: ["./recipie-list.component.css"]
})
export class RecipieListComponent implements OnInit {
  recipies: Recipie[] = [
    new Recipie(
      "Kabuli Polao",
      "A tasty recipie made by afgan people",
      "https://media-cdn.tripadvisor.com/media/photo-s/0e/b0/ef/b1/20170317-142002-largejpg.jpg"
    )
  ];

  constructor() {}

  ngOnInit() {}
}
