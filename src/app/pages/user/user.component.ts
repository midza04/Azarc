import {Component, Input, OnInit} from '@angular/core';
import {Users} from "../../models/user";
import {AuthService} from "../../services/auth.service";
import {SocialUser} from "angularx-social-login";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  socialUser!: SocialUser;
  constructor(private auth:AuthService,
              private router:Router) {

  }

  ngOnInit(): void {
   this.getCurrentUser();
  }

  private getCurrentUser(){
    this.auth.getLoggedInUser().then(user=>{
      this.socialUser=user;
      console.log(this.socialUser);
    })
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }
}
