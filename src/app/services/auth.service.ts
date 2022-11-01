import { Injectable } from '@angular/core';
import {GoogleLoginProvider, LoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {CommonService} from "./common.service";
@Injectable({
  providedIn: 'root'
})
export class AuthService implements LoginProvider{

  socialUser: any;
  isLoggedin: any;
  constructor(private socialAuthService: SocialAuthService,
              private common:CommonService

  ) {

  }

  async checkLoginStatus():Promise<boolean>{
    await this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
    return this.isLoggedin;
  }

  getLoginStatus(loginStatusOptions?: any): Promise<SocialUser> {
    throw `No user is currently logged in`;
  }

  initialize(): Promise<void> {
    return Promise.resolve(undefined);
  }

  async signIn(signInOptions?: any): Promise<any> {
   await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      user=>{
        this.socialUser = user;
        console.log(this.socialUser);
        this.saveUserDetails();
      }
    );
   return this.socialUser;
  }

  signOut(revoke?: boolean): Promise<void> {
    return Promise.resolve(undefined);
  }

  saveUserDetails(){
    const user =this.socialUser;
    this.common.saveToLocal("Name",user.firstName+" "+user.lastName);
    this.common.saveToLocal("Id",user.id);
    this.common.saveToLocal("photo",user.photoUrl);
  }
  async getLoggedInUser():Promise<SocialUser>{
    this.socialUser =JSON.parse(this.common.getValue("LoggedInUser"));
    return this.socialUser
  }

}
