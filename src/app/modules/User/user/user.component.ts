import { Component, OnInit } from '@angular/core';
import {  ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/core/Model/User';
import { UserServiceService } from 'src/app/core/Services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  User:Users;
  tab:any=[];
  showUpdate:boolean=false;
  p: number = 1;
  constructor(private toastr: ToastrService,private userService:UserServiceService) { }

  ngOnInit(): void {
    this.User=new Users();
    this.getAllUsers();
  }
  delete(id:any){
    this.userService.deleteUsers(id).subscribe((res)=>{
      this.tab=res;
      this.toastr.success("User Deleted !!","Admin notification");
    }),()=>this.toastr.error("Error Delete !!","Admin notification");
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
     this.tab=res; 
     console.log(this.tab.body)
    })
  }
}
