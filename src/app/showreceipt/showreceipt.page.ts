import { Component, OnInit  } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-showreceipt',
  templateUrl: './showreceipt.page.html',
  styleUrls: ['./showreceipt.page.scss'],
})
export class ShowreceiptPage implements OnInit {
loginId:any
receipt:any=[]
grptmp:any=[]
grptmp1:any=[]
grptmp2:any=[]
term:any
count:any =0
  constructor( private socket: SocketService,private router:Router,private route: ActivatedRoute) {
    this.loginId=localStorage.getItem('storeIdpos')
  }

  ngOnInit() {
    this.refreshItems()
  }

  refreshItems(){
    this.socket.send("findDb",{
      table: "receipt receipt",
      type: "api",
      fields:["receipt.*,rp.product_name,rp.price,rp.quantity"],
      conditions:[{StoreID:this.loginId,status:0}],
      order:"PaymentDate DESC",
      joins : [
        {
          type: "left",
          table: "receipt_product as rp",
          conditions: ["rp.order_id = receipt.OrderId"],
        },
      ],
    }).then((res:any)=>{
       if(res.status){
         console.log("res",res)
          var result = Array.from(res.data.reduce((m, t) => m.set(t.OrderId, t), new Map()).values());

          var merg = this.mergeObj(res.data)
          console.log("merg====",merg)
         const groups = this.groupReduce(merg)

          // Edit: to add it in the array format instead
          this.grptmp = Object.keys(groups).map((date) => {
            return {
              date:groups[date][0].PaymentDate,
              games: groups[date],

            };
          });

        console.log("groupArrays",this.grptmp);


       }else{

       }
     })
  }


groupReduce(data){
  return data.reduce((groups, game) => {
     const date = game.PaymentDate.split('T')[0];
     if (!groups[date]) {
       groups[date] = [];
     }
     game.index=this.getval()
     groups[date].push(game);
     return groups;
   }, {});
}


  groupreceipt(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

showDetails(data,i){
  console.log("data===",data);
  data.index=i
  this.router.navigate(['/show-receipt-details'], { queryParams: { record: JSON.stringify(data) } });
}


mergeObj(array){

  console.log("array===",array);
  var output=[]
    array.forEach(function(item) {
    var existing = output.filter(function(v, i) {
      return v.OrderId == item.OrderId;
    });
    if (existing.length) {
      var existingIndex = output.indexOf(existing[0]);
       output[existingIndex].product.push({name:item.product_name,qty:item.quantity,price:item.price});

    } else {
      item.product=[]
      if (typeof item.product_name == 'string')
        item.product.push({name:item.product_name,qty:item.quantity,price:item.price});
      output.push(item);
    }
  });
  return output
}

getval(){
  return this.count = this.count +1
}

}
