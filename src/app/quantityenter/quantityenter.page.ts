import { Component, OnInit,ViewChild  } from '@angular/core';
import { Validators,FormBuilder,FormGroup} from '@angular/forms';
import { ChangeDetectorRef } from "@angular/core";
import { SocketService } from '../socket.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'app-quantityenter',
  templateUrl: './quantityenter.page.html',
  styleUrls: ['./quantityenter.page.scss'],
})
export class QuantityenterPage implements OnInit {
  loginform : any;
  loginId :any;
  theRecord :any;
  theRecordtemp :any;
  quantityform :any;


  constructor( private router: Router, private fb: FormBuilder,private changeDetectorRef: ChangeDetectorRef,private socket: SocketService,private route: ActivatedRoute) {
    this.loginId=localStorage.getItem('storeIdpos')
    this.quantityform = fb.group({
      quantity:[null,Validators.compose([Validators.required])],
    });


    this.route.queryParams.subscribe(params => {
        this.theRecord = JSON.parse(params.record) ;
        if(this.theRecord){
          console.log("records=",this.theRecord )

        }
    });
   }

  ngOnInit() {

  }



onSubmit(data){
  console.log("data=",data)
  var temp =this.checkProduct()
  if(temp.length>0){
    for(var i=0; i<this.socket.quantityAmounttemp.length;i++){
      if(this.socket.quantityAmounttemp[i].ProductID==temp[0].ProductID){
        this.socket.quantityAmounttemp[i].quantity = parseInt(this.socket.quantityAmounttemp[i].quantity) + parseInt(data.quantity)
        this.socket.quantityAmounttemp[i].charge = parseInt(this.socket.quantityAmounttemp[i].charge) + (parseInt(data.quantity)*parseInt(this.theRecord.Price))
      }
    }
  }else{
    this.theRecord.quantity=data.quantity
    this.theRecord.charge=parseInt(data.quantity)*parseInt(this.theRecord.Price)
    this.socket.quantityAmounttemp.push(this.theRecord)
  }
  this.socket.quantityAmount.next({record:this.socket.quantityAmounttemp})
  this.router.navigate(['/home'])
}

checkProduct(){
  if(this.socket.quantityAmounttemp){
    return  this.socket.quantityAmounttemp.filter(item => {
        return ((item.ProductID.toString().toLowerCase().indexOf(this.theRecord.ProductID.toString().toLowerCase()) > -1));
      });
  }
}


}
