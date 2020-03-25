import { Component, OnInit,ViewChild  } from '@angular/core';
import { Validators,FormBuilder,FormGroup} from '@angular/forms';
import { ChangeDetectorRef } from "@angular/core";
import { SocketService } from '../socket.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { MatInput } from '@angular/material/input';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-receipt-proceed',
  templateUrl: './receipt-proceed.page.html',
  styleUrls: ['./receipt-proceed.page.scss'],
})
export class ReceiptProceedPage implements OnInit {

  loginId :any;
  login1 :any;
  login :any;
  theRecord :any;
  quantityform :any;
  charge:any=0
  quantity:any=0

  constructor( public alertController: AlertController,private router: Router, private fb: FormBuilder,private changeDetectorRef: ChangeDetectorRef,private socket: SocketService,private route: ActivatedRoute) {
    this.loginId=localStorage.getItem('storeIdpos')
    this.quantityform = fb.group({
      quantity:[null,Validators.compose([Validators.required])],
    });


    var login  = localStorage.getItem('loginPos')
    this.socket.dbStatus.subscribe((res:any)=>{
      this.login1 =res.login
    })
    this.login = this.login1===undefined?login:this.login1
      console.log("loginmasn=",this.login)

   }

  ngOnInit() {
    this.theRecord = this.socket.quantityAmounttemp
    this.charge=0
    this.quantity=0
    for(var i=0;i<this.theRecord.length;i++){
      this.charge+=this.theRecord[i].charge
      this.quantity+=this.theRecord[i].quantity
    }
  }


proceed(){
  this.socket.quantityAmounttemp=[]
  this.socket.quantityAmount.next({record:''})
  this.router.navigate(['/home'])
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
        }
      }, {
        text: 'Ok',
        handler: data  => {
          console.log('Confirm Ok');
          console.log(data.email);
        }
      }
    ]
  });

  await alert.present();
}


}
