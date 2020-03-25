import { Component, OnInit,ViewChild  } from '@angular/core';
import { Validators,FormBuilder,FormGroup,FormArray} from '@angular/forms';
import { ChangeDetectorRef } from "@angular/core";
import { SocketService } from '../socket.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.page.html',
  styleUrls: ['./order-edit.page.scss'],
})
export class OrderEditPage implements OnInit {
  loginId :any;
  login1 :any;
  login :any;
  theRecord :any;
  quantityform :any;
  Totalcharge:any=0
  quantity:any=0
  receiptForm:FormGroup;




  constructor(private router: Router, private fb: FormBuilder,private changeDetectorRef: ChangeDetectorRef,private socket: SocketService,private route: ActivatedRoute) {
    this.loginId=localStorage.getItem('storeIdpos')
    this.quantityform = fb.group({
      quantity:[null,Validators.compose([Validators.required])],
    });
    this.receiptForm = this.fb.group({
      items:this.fb.array([])
    });

    var login  = localStorage.getItem('loginPos')
    this.socket.dbStatus.subscribe((res:any)=>{
      this.login1 =res.login
    })
    this.login = this.login1===undefined?login:this.login1
      console.log("loginmasn=",this.login)

   }



   ngOnInit() {

    this.initCall()
     this.onChanges();
   }


initCall(){
  this.theRecord = this.socket.quantityAmounttemp
  console.log("data receipt==",this.theRecord)
  this.Totalcharge=0
  this.quantity=0
  // this.receiptForm.setControl('items', this.fb.array([]));
  const control = <FormArray>this.receiptForm.controls.items;
  control.controls = [];
  // this.receiptForm.controls.items as FormArray
  for(var i=0;i<this.theRecord.length;i++){
    this.Totalcharge+=this.theRecord[i].charge
    this.quantity+=this.theRecord[i].quantity
    control.push(this.fb.group(
      {
        ProductID:[this.theRecord[i].ProductID],
        StoreID:[this.theRecord[i].StoreID],
        CategoryID:[this.theRecord[i].CategoryID],
        Description:[this.theRecord[i].Description],
        QtyUnit:[this.theRecord[i].QtyUnit],
        Price:[this.theRecord[i].Price],
        Cost:[this.theRecord[i].Cost],
        StockInHand:[this.theRecord[i].StockInHand],
        ReorderLevel:[this.theRecord[i].ReorderLevel],
        color:[this.theRecord[i].color],
        barcode:[this.theRecord[i].barcode],
        quantity:[this.theRecord[i].quantity],
        charge:[this.theRecord[i].charge],
      }

    ))
  }
}



onChanges(): void {
  this.receiptForm.valueChanges.subscribe(val => {
    console.log("value changed=",val)
    this.Totalcharge=0
    for(var i=0;i<val.items.length;i++){
      this.Totalcharge+=val.items[i].Price * val.items[i].quantity
      // this.quantity+=this.theRecord[i].quantity
    }
  });
}


   formSubmit(data){
     console.log("data===",data)
     if( confirm("Proceed to dispatch..!")){
       this.socket.quantityAmounttemp=[]
       for(let i=0;i<data.items.length;i++){

         this.socket.quantityAmounttemp.push(
           {
             ProductID:data.items[i].ProductID,
             StoreID:data.items[i].StoreID,
             CategoryID:data.items[i].CategoryID,
             Description:data.items[i].Description,
             QtyUnit:data.items[i].QtyUnit,
             Price:data.items[i].Price,
             Cost:data.items[i].Cost,
             StockInHand:data.items[i].StockInHand,
             ReorderLevel:data.items[i].ReorderLevel,
             color:data.items[i].color,
             barcode:data.items[i].barcode,
             quantity:data.items[i].quantity,
             charge:data.items[i].Price * data.items[i].quantity
           }
         )

       }
       // this.socket.quantityAmounttemp=data.items

       this.initCall()
       this.router.navigate(['/receipt'])
     }

   }
}
