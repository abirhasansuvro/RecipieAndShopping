import { Component } from "@angular/core";
import { DataStorageService } from '../shared/data-storage.service';
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  collapsed: boolean = true;
  constructor(private data_store:DataStorageService){}
  onSave(){
    this.data_store.storeRecipies();
  }
  onFetch(){
    this.data_store.fetchRecipies().subscribe();
  }
}
