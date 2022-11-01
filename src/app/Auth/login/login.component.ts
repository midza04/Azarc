import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private auth:AuthService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private common:CommonService,

  ) {}
  ngOnInit() {
  }

  loginWithGoogle(): void {
    this.auth.signIn().then(result => {
      this.socialUser=result;
      this.common.saveToLocal("LoggedInUser",JSON.stringify(this.socialUser))
      const redirectURL = this.activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/home';
      this.router.navigateByUrl(redirectURL);
      }
    ).catch(error=>{
      console.log(error)
      this.common.showFailAlert("Oops something went wrong, please try again" )
    });
  }


}
