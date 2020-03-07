import { Component, EventEmitter, Output } from "@angular/core";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  collapsed: boolean = true;
  @Output() showHeaderOnSelect = new EventEmitter<boolean>();
  changeHeader(val: boolean) {
    this.showHeaderOnSelect.emit(val);
  }
}
