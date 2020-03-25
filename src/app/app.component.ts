import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  login:any
  login1:any
  public appPages = [
    {
      title: 'Sale',
      url: '/home',
      icon: 'cart'
    },
    {
      title: 'Receipt',
      url: '/showreceipt',
      icon: 'paper'
    },
    {
      title: 'Category',
      url: '/categories',
      icon: 'snow'
    },
    {
      title: 'Items',
      url: '/items',
      icon: 'pricetag'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private socket: SocketService,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      var login  = localStorage.getItem('loginPos')
      this.socket.dbStatus.subscribe((res:any)=>{
        this.login1 =res.login
      })
      this.login = this.login1===undefined?login:this.login1
      console.log("loginmasn=",this.login)
    });
  }


  logout(){
    localStorage.clear()
    this.router.navigate(['login'])
  }

}
