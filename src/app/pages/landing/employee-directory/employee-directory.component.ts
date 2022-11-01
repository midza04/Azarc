import {Component, OnInit, PipeTransform, ViewChild} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {FormControl} from "@angular/forms";
import {map, Observable, pipe, startWith} from "rxjs";
import {DatePipe, DecimalPipe} from "@angular/common";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


export interface Employees {
  name: string,
  image: string,
  jobTitleName: string,
  EmployeeCode: string,
  PhoneNumber: string,
  EmailAddress: string,
  id: string
}


@Component({
  selector: 'app-employee-directory',
  templateUrl: './employee-directory.component.html',
  styleUrls: ['./employee-directory.component.css'],
  providers: [DecimalPipe],
})


export class EmployeeDirectoryComponent implements OnInit {

  employees!: Employees[];
  allemployees!:Employees[];
  filter = new FormControl('', { nonNullable: true });

  page = 1;
  pageSize = 4;
  collectionSize!: number;
  currentRate = 8;
  searchTerm: any;

  constructor(private common:CommonService) {

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
     this.common.getAllData('https://635e2d0803d2d4d47ae91ff8.mockapi.io/api/v1/employees').subscribe(employees=>{
      this.employees=employees;
      this.allemployees =this.employees;
      console.log(this.employees)
      this.collectionSize = this.employees.length;
    })
  }
  search(searchitem: any): void {
    let search =searchitem.value.toLowerCase();
    console.log(search);
    this.employees = this.allemployees.filter((val) =>
      val.name.toLowerCase().includes(search) ||
      val.jobTitleName.toLowerCase().includes(search)
    );
  }

}
