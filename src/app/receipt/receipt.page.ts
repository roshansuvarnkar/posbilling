import { Component, OnInit,ViewChild  } from '@angular/core';
import { Validators,FormBuilder,FormGroup,FormArray} from '@angular/forms';
import { ChangeDetectorRef } from "@angular/core";
import { SocketService } from '../socket.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { MatInput } from '@angular/material/input';
import { AlertController } from '@ionic/angular';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReceiptPage implements OnInit {

  loginId :any;
  login1 :any;
  login :any;
  theRecord :any;
  quantityform :any;
  charge:any=0
  quantity:any=0
  receiptForm:FormGroup;
  constructor( public alertController: AlertController,private router: Router, private fb: FormBuilder,private changeDetectorRef: ChangeDetectorRef,private socket: SocketService,private route: ActivatedRoute) {
    this.loginId=localStorage.getItem('storeIdpos')


    var login  = localStorage.getItem('loginPos')
    this.socket.dbStatus.subscribe((res:any)=>{
      this.login1 =res.login
    })
    this.login = this.login1===undefined?login:this.login1
      console.log("loginmasn=",this.login)

   }

  ngOnInit() {
    this.theRecord = this.socket.quantityAmounttemp
    console.log("data receipt==",this.theRecord)
    this.charge=0
    this.quantity=0


    for(var i=0;i<this.theRecord.length;i++){
      this.charge+=this.theRecord[i].charge
      this.quantity+=this.theRecord[i].quantity
    }

  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Enter Email-Id',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Enter email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.proceed('NULL')
          }
        }, {
          text: 'Ok',
          handler: data  => {
            console.log('Confirm Ok');
            console.log(data.email);
            this.proceed(data.email)
          }
        }
      ]
    });

    await alert.present();
  }

proceed(data){
  if( confirm("Proceed to dispatch..!")){
    this.socket.send("insertDb",{
     type:"api",
     table: "receipt",
     data:{
       StoreID:this.loginId,
       Amount:this.charge,
       emailReceipt:data,
     }
   }).then((resp:any)=>{
     if(resp.status){
       console.log("insert in receipt response-===",resp)
       this.socket.quantityAmounttemp=[]
       this.socket.quantityAmount.next({record:''})
       this.submitProduct(resp.data.insertId);

       // this.router.navigate(['/home'])
     }
   }).catch(err=>console.log(err));
    return
  }
}


getLastRecord(){
  this.socket.send("getLastRecord",{
     type:"api",
   }).then((res:any)=>{
     if(res.status){
       console.log("res",res)
     }else{

     }
   })
}


submitProduct(val){
  for (let i = 0; i < this.theRecord.length; i++) {
    this.socket.send("insertDb",{
     type:"api",
     table: 'receipt_product',
     data:{
       order_id:val,
       product_id:this.theRecord[i].ProductID,
       product_name:this.theRecord[i].Description,
       price:this.theRecord[i].Price,
       quantity:this.theRecord[i].quantity,
     }
   }).then((res:any)=>{
     console.log("success product=",res)
   })
  }

  this.router.navigate(['/home'])
}

}
