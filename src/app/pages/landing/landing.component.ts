import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common.service";
import {Users} from "../../models/user";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private common:CommonService) {

  }

  ngOnInit(): void {

  }


}
