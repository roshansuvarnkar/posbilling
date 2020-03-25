import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder,FormGroup} from '@angular/forms';
import { ChangeDetectorRef } from "@angular/core";
import { SocketService } from '../socket.service';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.page.html',
  styleUrls: ['./createcategory.page.scss'],
})
export class CreatecategoryPage implements OnInit {
  colors:any=[{color:'grey',display:'grey'},
  {color:'red',display:'red'},
  {color:'pink',display:'pink'},
  {color:'orange',display:'orange'},
  {color:'green',display:'green'},
  {color:'yellow',display:'yellow'},
  {color:'blue',display:'blue'},
  {color:'purple',display:'purple'},
  ]
  loginform : any;
  loginId :any;
  deleteYes :boolean=false;
  theRecord :any;
  color:any=''
  message:any=''
  constructor(  private fb: FormBuilder,private changeDetectorRef: ChangeDetectorRef,private socket: SocketService,private route: ActivatedRoute) {
    this.loginId=localStorage.getItem('storeIdpos')
    this.loginform = fb.group({
      name:[null,Validators.compose([Validators.required])],
      color:[null],
    });
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.theRecord = JSON.parse(params.record) ;
        console.log("records=",this.theRecord )
        if(this.theRecord!='a'){
          this.loginform.patchValue({
            name:this.theRecord.CategoryName
          })
          for(var i=0;i<this.colors.length;i++){
            if(this.colors[i].color==this.theRecord.ButtonColor){
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
       table: "category",
       conditions : [{CategoryName	:data.name}]
     }).then((res:any)=>{
       console.log("res=",res)
       if(!res.status){
         this.socket.send("insertDb",{
          type:"api",
          table: "category",
          data:{
            StoreID:this.loginId,
            CategoryName:data.name,
            ButtonColor:data.color!=null ?data.color:'red',
            SortOrder:0,
            ShowOnMainMenu:1,
          }
        }).then((resp:any)=>{
          console.log("insert in registration response-===",resp)
          this.loginform.reset()

        }).catch(err=>console.log(err));
      }else{
        this.message=data.name+" "+"category already exists..!"
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
   conditions:[{CategoryID:this.theRecord.CategoryID}],
   data:{
     CategoryName:data.name,
     ButtonColor:data.color,
     SortOrder:0,
     ShowOnMainMenu:1,
   }
 }).then((resp:any)=>{
   console.log("update in registration response-===",resp)

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
