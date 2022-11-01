import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private alert: MatSnackBar,
              private _httpClient:HttpClient
              ) { }

   getAllData(url:string): Observable<any> {
    return this._httpClient.get(url);
  }
  public saveToLocal(key:string , value:string){
    localStorage.setItem(key,value);
  }
  public getValue(key:string):any{
    return localStorage.getItem(key);
  }
  public showSuccessAlert(message:string){
    this.alert.open(message, 'OK', {
      horizontalPosition: "start",
      verticalPosition: "top",
    });
  }
  public showFailAlert(message:string){
    this.alert.open(message, 'TRY AGAIN', {
      horizontalPosition: "start",
      verticalPosition: "top",
    });
  }
}
