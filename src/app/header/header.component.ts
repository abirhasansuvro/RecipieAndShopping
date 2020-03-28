import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit,OnDestroy{
  isAuthenticated:boolean=false;
  collapsed: boolean = true;
  ourSubscription:Subscription;
  constructor(private data_store:DataStorageService,private authService:AuthService){}
  ngOnInit(){
    this.ourSubscription= this.authService.user.subscribe(
      userData=>{
        this.isAuthenticated=!!userData;
      }
    );
  }

  onSave(){
    this.data_store.storeRecipies();
  }
  onFetch(){
    this.data_store.fetchRecipies().subscribe();
  }

  onLogout(){
    this.authService.logOut();
  }

  ngOnDestroy(){
    this.ourSubscription.unsubscribe();
  }
}
