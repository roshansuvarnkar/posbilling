import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder,FormGroup} from '@angular/forms';
import { SocketService } from '../socket.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-show-receipt-details',
  templateUrl: './show-receipt-details.page.html',
  styleUrls: ['./show-receipt-details.page.scss'],
})
export class ShowReceiptDetailsPage implements OnInit {
theRecord:any=[]
theRecordp:any=[]
  constructor( private fb: FormBuilder,private socket: SocketService,private route: ActivatedRoute,private router:Router) {
    this.route.queryParams.subscribe(params => {
        this.theRecord = JSON.parse(params.record) ;
        console.log("records=",this.theRecord )
      })
  }

  ngOnInit() {
  }

refund(){
  console.log("refund==")
  this.socket.send("updateDb",{
   type:"api",
   table: "receipt",
   conditions:[{OrderId:this.theRecord.OrderId}],
   data:{
     status:1
   }
 }).then((resp:any)=>{
   console.log("update refund===",resp)
   if(resp.status){
     this.router.navigate(['/showreceipt'])
   }
 }).catch(err=>console.log(err));
}


}
