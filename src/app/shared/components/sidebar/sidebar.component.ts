import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/core/Model/User';
import { UserService } from 'src/app/core/Services/auth/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,OnChanges {
  users: Users;
  hide:boolean;
  data:any;
  constructor(public router: Router,private authService:UserService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.authService.sharedUser.subscribe(
      (data:Users)=>
      {this.users=new Users()},
      ()=>{},
      ()=>{this.users = new Users()}
    )
  }

  ngOnInit(): void {
    
    this.authService.sharedUser.subscribe(
      (data:Users)=>
      {this.users=data},
      ()=>{},
      ()=>{this.users = new Users()}
    )
  
  }

 

  verifUserRoleConncet(email:string){
    this.authService.getUserConnect(String(email)).subscribe(user =>{})
}
}
