import { Component ,OnInit} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { SocketService } from '../socket.service';
import { ChangeDetectorRef } from "@angular/core";
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   login:any
   loginId:any
   products:any
   categories:any
   productstemp:any
   term:any
   categoriestemp:any
   showsearch:boolean=false
   selected:any="All"
   charge:any=0
   quantity:any=0
   disable:boolean=true;
  constructor(private barcodeScanner:BarcodeScanner,private router:Router, private socket: SocketService,private route: ActivatedRoute,private changeDetectorRef: ChangeDetectorRef) {
    var login  = localStorage.getItem('loginPos')
    this.loginId=localStorage.getItem('storeIdpos')

    this.socket.dbStatus.subscribe((res:any)=>{
      this.login=res.login
      console.log("login=",this.login)
    })
    var loginPos = login===null?this.login :login
    console.log("login=",loginPos)
    if(!loginPos){
      this.router.navigate(['login'])
    }else{
      this.refreshItems()
      this.refreshCategory()
      this.refreshreceipt()

    }


    this.socket.quantityAmount.subscribe((res:any)=>{
      this.charge=0
      this.quantity=0
      if(this.socket.quantityAmounttemp.length>0){
        for(var i=0;i<this.socket.quantityAmounttemp.length;i++){
          this.charge+=this.socket.quantityAmounttemp[i].charge
          this.quantity+=this.socket.quantityAmounttemp[i].quantity
        }
      }else{
        this.charge=0
        this.quantity=0
      }


      if(this.charge==0){
        this.disable=true
      }else{
        this.disable=false
      }
      console.log("charge=",res)
    })

  }

OnInit(){
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
         this.categoriestemp=res.data
       }else{

       }
     })
  }


  refreshItems(){
    this.socket.send("findDb",{
       type:"api",
       table: "products",
       conditions : [{StoreID:this.loginId}]
     }).then((res:any)=>{
       if(res.status){
         console.log("res",res)
         this.products=res.data
         this.productstemp=res.data
       }else{

       }
     })
  }


quantityenter(a){
  console.log("selected item=",a)
  this.router.navigate(['/quantityenter'], { queryParams: { record: JSON.stringify(a) } });
}


addquantity(a){
  console.log("a===",a);
  var temp = this.checkProduct(a)
  if(temp.length>0){
    for(var i=0; i<this.socket.quantityAmounttemp.length;i++){
      if(this.socket.quantityAmounttemp[i].ProductID==temp[0].ProductID){
        this.socket.quantityAmounttemp[i].quantity = parseInt(this.socket.quantityAmounttemp[i].quantity) + 1
        this.socket.quantityAmounttemp[i].charge = parseInt(this.socket.quantityAmounttemp[i].charge) + parseInt(a.Price)
      }
    }
  }else{
    var tempRec =a
    tempRec.quantity=1
    tempRec.charge=parseInt(a.Price)
    this.socket.quantityAmounttemp.push(tempRec)
  }
  this.socket.quantityAmount.next({record:this.socket.quantityAmounttemp})
}

checkProduct(a){
  if(this.socket.quantityAmounttemp){
    return  this.socket.quantityAmounttemp.filter(item => {
        return ((item.ProductID.toString().toLowerCase().indexOf(a.ProductID.toString().toLowerCase()) > -1));
      });
  }
}

filterItemsid(searchTerm) {
 return this.productstemp.filter(item => {
   return ((item.CategoryID.toString().toLowerCase().indexOf(searchTerm.toString().toLowerCase()) > -1));
 });
}

filterItemsbarcode(searchTerm) {
 return this.productstemp.filter(item => {
   return ((item.barcode.toString().toLowerCase().indexOf(searchTerm.toString().toLowerCase()) > -1));
 });
}




selectchange(event){
  console.log("select=",event.value)
  if(event.value=='All'){
    this.products=this.productstemp
  }else{
    this.products=this.filterItemsid(event.value.CategoryID)
  }
}

searchclick(){
  this.showsearch = this.showsearch === true ? false : true;
}

onCancel(event){
  console.log("cancel=",event)
  this.showsearch = this.showsearch === true ? false : true;
}

scan(){
  this.barcodeScanner.scan().then(barcodeData => {
   console.log('Barcode data', barcodeData);
   this.products=this.filterItemsbarcode(barcodeData.text)
  }).catch(err => {
      console.log('Error', err);
  });
}


recepit(){
  if(this.charge>0){
    this.router.navigate(['/order-edit'])
  }
}

refreshreceipt(){
  this.charge=0
  this.quantity=0
  if(this.socket.quantityAmounttemp.length>0){
    for(var i=0;i<this.socket.quantityAmounttemp.length;i++){
      this.charge+=this.socket.quantityAmounttemp[i].charge
      this.quantity+=this.socket.quantityAmounttemp[i].quantity
    }
  }else{
    this.charge=0
    this.quantity=0
  }


  if(this.charge==0){
    this.disable=true
  }else{
    this.disable=false
  }
}

}
