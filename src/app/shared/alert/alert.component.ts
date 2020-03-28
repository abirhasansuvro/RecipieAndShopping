import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message:string;
  @Output('closeEvent') close=new EventEmitter<void>(); 
  constructor() { }

  ngOnInit() {
  }
  closeWindow(){
    this.close.emit();
  }
}
