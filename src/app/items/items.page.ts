import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from "@angular/core";
import { SocketService } from '../socket.service';
import { Router ,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  loginId:any;
  items:any
    constructor(private changeDetectorRef: ChangeDetectorRef,private socket: SocketService,private router:Router,private route: ActivatedRoute) {
      this.loginId=localStorage.getItem('storeIdpos')

     }

  ngOnInit() {
    if(this.loginId){
      this.refreshItems()
    }
  }

  refreshItems(){
    this.socket.send("findDb",{
       type:"api",
       table: "products",
       conditions : [{StoreID:this.loginId}]
     }).then((res:any)=>{
       if(res.status){
         console.log("res",res)
         this.items=res.data
       }else{

       }
     })
  }


  itemClick(a){
    console.log("category selected=",a)
    this.router.navigate(['/createitems'], { queryParams: { record: JSON.stringify(a) } });
  }


  doRefresh(event) {
    console.log('Begin async operation');
    this.refreshItems()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
