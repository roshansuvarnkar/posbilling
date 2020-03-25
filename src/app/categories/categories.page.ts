import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from "@angular/core";
import { SocketService } from '../socket.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
loginId:any;
categories:any
  constructor(private changeDetectorRef: ChangeDetectorRef,private socket: SocketService,private router:Router,private route: ActivatedRoute) {
    this.loginId=localStorage.getItem('storeIdpos')

   }

  ngOnInit() {
    if(this.loginId){
      this.refreshCategory()
    }
  }

  refreshCategory(){
    this.socket.send("findDb",{
       type:"api",
       table: "category",
       conditions : [{StoreID:this.loginId}]
     }).then((res:any)=>{
       if(res.status){
         console.log("res",res)
         this.categories=res.data
       }else{

       }
     })
  }


  categoryClick(a){
    console.log("category selected=",a)
    this.router.navigate(['/createcategory'], { queryParams: { record: JSON.stringify(a) } });
  }



  doRefresh(event) {
    console.log('Begin async operation');
    this.refreshCategory()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }



}
