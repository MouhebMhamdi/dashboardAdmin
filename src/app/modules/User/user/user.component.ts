import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/core/Model/User';
import { UserServiceService } from 'src/app/core/Services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  User:Users;
  tab:any=[]
  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
    this.User=new Users();
    this.getAllUsers();
  }
  
  getAllUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
     this.tab=res; 
     console.log(this.tab[0])
    })
  }
}
