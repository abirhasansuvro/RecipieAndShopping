import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { RecipieService } from "../recipie.service";
import { Ingredient } from "src/app/shared/ingredient.model";
import { Recipie } from "../recipie.model";

@Component({
  selector: "app-recipie-edit",
  templateUrl: "./recipie-edit.component.html",
  styleUrls: ["./recipie-edit.component.css"]
})
export class RecipieEditComponent implements OnInit {
  id: number;
  editmode = false;
  recipieEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipieService: RecipieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editmode = params["id"] != null;
      this.initForm();
    });
  }
  private initForm() {
    let recipieName: string = "";
    let recipieUrl: string = "";
    let recipieDesc: string = "";
    let recipieIngs: Ingredient[];
    let recipieIngsArr: FormArray = new FormArray([]);
    if (this.editmode) {
      let selectedR = this.recipieService.getRecipie(this.id);
      recipieName = selectedR.name;
      recipieUrl = selectedR.imagepath;
      recipieDesc = selectedR.description;
      recipieIngs = selectedR.ingredients;
      if (recipieIngs) {
        for (let ing of recipieIngs) {
          recipieIngsArr.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              ammount: new FormControl(ing.ammount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipieEditForm = new FormGroup({
      name: new FormControl(recipieName, Validators.required),
      imagePath: new FormControl(recipieUrl, Validators.required),
      description: new FormControl(recipieDesc, Validators.required),
      ingredients: recipieIngsArr
    });
  }
  get controls() {
    return (<FormArray>this.recipieEditForm.get("ingredients")).controls;
  }
  AddIngredients() {
    (<FormArray>this.recipieEditForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        ammount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }
  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipieEditForm.get("ingredients")).removeAt(index);
  }
  onSubmit() {
    const newRecipie = new Recipie(
      this.recipieEditForm.value["name"],
      this.recipieEditForm["description"],
      this.recipieEditForm.value["imagePath"],
      this.recipieEditForm.value["ingredients"]
    );
    if (this.editmode) {
      this.recipieService.updateRecipie(this.id, newRecipie);
    } else {
      console.log("inside add");
      this.recipieService.addRecipie(newRecipie);
    }
    this.onCancel();
  }
}
