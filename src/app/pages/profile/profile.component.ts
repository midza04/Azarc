import { Component, OnInit } from '@angular/core';
import {SocialUser} from "angularx-social-login";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  socialUser!: SocialUser;
  userForm!: FormGroup;
  constructor(private auth:AuthService,
              private form:FormBuilder,
              private common:CommonService
  ) {

  }

  initialiseForm(){
    this.userForm = this.form.group({
      name   : [{value: '', disabled: true}],
      surname   : [{value: '', disabled: true}],
      id   : [{value: '', disabled: true}],
      location   : [{value: '', disabled: true}],
      address   : [{value: '', disabled: true}],
      locationEdit   : [''],
      addressEdit   : [''],


    });
  }

  ngOnInit(): void {
    this.getCurrentUser()
    this.initialiseForm();
    this.getUpdatedProfile();
  }
  private getCurrentUser(){
    this.auth.getLoggedInUser().then(user=>{
      this.socialUser=user;
      this.setItems();
      console.log(this.socialUser);
    })
  }
  private setItems(){
    this.userForm.patchValue({
      name   : this.socialUser.name,
      surname   : this.socialUser.lastName,
      id   : this.socialUser.email,
    })
  }

  updateProfile() {
    this.common.saveToLocal("address",this.userForm.controls["addressEdit"].value)
    this.common.saveToLocal("location",this.userForm.controls["locationEdit"].value)
    this.getUpdatedProfile();
  }
  getUpdatedProfile(){
    if(this.common.getValue("address")!=null){
      this.userForm.patchValue({
        address:this.common.getValue("address"),
      })
    }
    if(this.common.getValue("location")!=null){
      this.userForm.patchValue({
        location:this.common.getValue("location"),
      })
    }
  }
}
