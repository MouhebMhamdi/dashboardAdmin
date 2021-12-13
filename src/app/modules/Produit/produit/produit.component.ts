import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/core/Model/User';
import { UserService } from 'src/app/core/Services/auth/user.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  users:Users;

  constructor(private router:Router,private authService:UserService) { }

  ngOnInit(): void {
    this.verifUserRoleConncet(String(localStorage.getItem("email")))
    this.authService.sharedUser.subscribe(
      (data:Users)=>
      {this.users=data},
      ()=>{},
      ()=>{this.users = new Users()}
    )
    if(localStorage.getItem("email")==null){
      this.router.navigate(['/login'])
    }
  }
  verifUserRoleConncet(email:string){
    this.authService.getUserConnect(String(email)).subscribe(user =>{})
}
}
