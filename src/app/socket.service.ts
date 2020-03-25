import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public dbStatus = new Subject<any>()
  public quantityAmount = new Subject<any>()
  public quantityAmounttemp :any=[]

  host:string = environment.apiHost
    constructor(private http:HttpClient) { }

    loadUrlHtml(url){
      let htmlData = "";
      return this.http.get(url,{responseType: 'text'});
    }

    send(listnerName,data,smsData={status:false}){

      if(data.type == 'api'){//this will get data by api
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        let listnerAPI = "";
        switch(listnerName){
          case "findDb":
           listnerAPI = "api/get-data"
          break;

          case "getLastRecord":
           listnerAPI = "api/get-lastAutoId"
          break;

          case "insertDb":
          listnerAPI = "api/insert-data"

          break;
          case "updateDb":
          listnerAPI = "api/update-data"

          break;
          case "deleteDb":
          listnerAPI = "api/delete-data"

          break;
          case "uploadPhoto":
          listnerAPI = "api/upload-image"

          break;
          case "deletePhoto":
          listnerAPI = "api/delete-image"

          break;


        }

          let url = this.host+listnerAPI;
          return new Promise((resolve,reject)=>{
            this.http.post(url,data,httpOptions).subscribe(res=>{
              resolve(res);
            })
          });


      }else{

      }


    }
}
