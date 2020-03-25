import { Component, OnInit } from '@angular/core';
import { Validators,FormBuilder,FormGroup} from '@angular/forms';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginform : any;
  passwordType: string = 'password';
  passwordIcon: string = 'visibility_off';
  constructor(  private fb: FormBuilder, private socket: SocketService,private router:Router) {
    this.loginform = fb.group({
      user_name:[null,Validators.compose([Validators.required])],
      password:[null,Validators.compose([Validators.required])],
    });
   }

  ngOnInit() {
  }

  hideShowPassword() {
      this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
      this.passwordIcon = this.passwordIcon === 'visibility_off' ? 'visibility' : 'visibility_off';
  }
  onSubmit(data){
    console.log("data=",data)
    // localStorage.setItem('loginpos',data)
    this.cloudLogin(data)
  }

  cloudLogin(data){
    this.socket.send("findDb",{
       type:"api",
       table: "registration",
       conditions : [{LoginId:data.user_name,Password:data.password}]
     }).then((res:any)=>{
       console.log("res",res)
       if(res.status){
         localStorage.setItem('loginPos',data.user_name)
         localStorage.setItem('storeIdpos',res.data[0].StoreID)
         this.socket.dbStatus.next({login:data.user_name,data:res.data[0]})
         this.router.navigate(['/home'])
         this.loginform.reset()

       }else{
         this.router.navigate(['/registration'])

       }
     })
  }




}
