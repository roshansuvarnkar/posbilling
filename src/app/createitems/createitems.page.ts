import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder,FormGroup} from '@angular/forms';
import { SocketService } from '../socket.service';
import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-createitems',
  templateUrl: './createitems.page.html',
  styleUrls: ['./createitems.page.scss'],
})
export class CreateitemsPage implements OnInit {
  colors:any=[{color:'grey',display:'grey'},
  {color:'red',display:'red'},
  {color:'pink',display:'pink'},
  {color:'orange',display:'orange'},
  {color:'green',display:'green'},
  {color:'yellow',display:'yellow'},
  {color:'blue',display:'blue'},
  {color:'purple',display:'purple'},
  ]
  color:any=''
  message:any=''
  loginform : any;
  deleteYes :boolean=false;
  loginId :any;
  categories :any;
  theRecord :any;
  passwordType: string = 'password';
  passwordIcon: string = 'visibility_off';
  constructor(  private fb: FormBuilder,private socket: SocketService,private route: ActivatedRoute) {
    this.loginId=localStorage.getItem('storeIdpos')
    this.loginform = fb.group({
      name:[null,Validators.compose([Validators.required])],
      category:[null,Validators.compose([Validators.required])],
      qtyunit:[null],
      price:[null,Validators.compose([Validators.required])],
      cost:[null],
      stock:[null],
      barcode:[null],
      color:[null],
      rorderlevel:[null],
    });
   }

   ngOnInit() {
     this.refreshCategory()
     this.route.queryParams.subscribe(params => {
         this.theRecord = JSON.parse(params.record) ;
         console.log("records=",this.theRecord )
         if(this.theRecord!='a'){
           this.loginform.patchValue({
             name:this.theRecord.Description,
             category:this.theRecord.CategoryID,
             qtyunit:this.theRecord.QtyUnit,
             price:this.theRecord.Price,
             cost:this.theRecord.Cost,
             stock:this.theRecord.StockInHand,
             barcode:this.theRecord.barcode,
             color:this.theRecord.color,
             rorderlevel:this.theRecord.ReorderLevel,
           })
           for(var i=0;i<this.colors.length;i++){
             if(this.colors[i].color==this.theRecord.color){
               this.colors[i].display='white'
               this.color=this.colors[i].color
               this.loginform.patchValue({
                 color: this.colors[i].color,
               });
               this.deleteYes=true
             }else{
               this.colors[i].display=this.colors[i].color
             }
           }
         }else{
           this.message=''
           this.deleteYes=false
         }
     });
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


  onSubmit(data){
    this.message=''
    this.deleteYes=false
    console.log("data=",data)
    if(this.theRecord!='a'){
      this.cloudUpdate(data)
    }else{
      this.cloudInsert(data)
    }
    // this.loginform.reset()
  }

  cloudInsert(data){
    // if(this.color!=''){
      this.socket.send("findDb",{
         type:"api",
         table: "products",
         conditions : [{Description	:data.name}]
       }).then((res:any)=>{
         console.log("res=",res)
         if(!res.status){
           this.socket.send("insertDb",{
            type:"api",
            table: "products",
            data:{
              StoreID:this.loginId,
              CategoryID:data.category.CategoryID,
              Description:data.name,
              QtyUnit:data.qtyunit!=null ?data.qtyunit:0,
              Price:data.price,
              Cost:data.cost!=null ?data.cost:0,
              StockInHand:data.stock!=null ?data.stock:0,
              barcode:data.barcode!=null ?data.barcode:0,
              ReorderLevel:data.rorderlevel!=null ?data.rorderlevel:0,
              color:data.color!=null ?data.qtyunit:'red',
            }
          }).then((resp:any)=>{
            console.log("insert in item response-===",resp)
            this.loginform.reset()

          }).catch(err=>console.log(err));
        }else{
          this.message=data.name+" "+"item already exists..!"
        }
      }).catch(err=>console.log("error find=",err));
    // }else{
    //   console.log("no color choosen")
    //   this.message="Please select color..!"
    // }
  }


  cloudUpdate(data){
    this.socket.send("updateDb",{
     type:"api",
     table: "category",
     conditions:[{ProductID:this.theRecord.ProductID}],
     data:{
       Description:data.name,
       QtyUnit:data.qtyunit,
       Price:data.price,
       Cost:data.cost,
       StockInHand:data.stock,
       barcode:data.barcode,
       ReorderLevel:data.rorderlevel,
       color:data.color,
     }
   }).then((resp:any)=>{
     console.log("update in item response-===",resp)

   }).catch(err=>console.log(err));
  }


  selectedColor(color){
    for(var i=0;i<this.colors.length;i++){
      if(this.colors[i].color==color.color){
        this.colors[i].display='white'
        this.color=this.colors[i].color
        this.loginform.patchValue({
          color: this.colors[i].color,
        });
      }else{
        this.colors[i].display=this.colors[i].color
      }
    }
  }
}
