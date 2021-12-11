import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Users } from 'src/app/core/Model/User';
import { UserService } from 'src/app/core/Services/auth/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit,OnChanges {
  user:Users = new Users();
  public curUser= new BehaviorSubject(this.user);

  sharedUser = this.curUser.asObservable();

  myFormLogin: FormGroup;
  submittedLogin = false;
  successMessage:string;
  msg: string;
  tab:any=[];
  users:Users;
  data:any;
  constructor(private formBuilder: FormBuilder,private toastr: ToastrService,private router:Router,private authService:UserService) { }

  ngOnInit(): void {
   
    this.authService.sharedUser.subscribe(
      (data:Users)=>{this.users=data},
      ()=>{},
      ()=>{this.users = new Users()}
    )

    this.myFormLogin=  this.formBuilder.group(
      {
        email: ['',[
          Validators.required,
          Validators.email]
        ],
        password: ['',[
          Validators.required
        ]]

      });
  }
  ngOnChanges():void{
    this.authService.sharedUser.subscribe(
      (data:Users)=>
      {this.users=data},
      ()=>{},
      ()=>{this.users = new Users()}
    )
  
  }
  login(myForm:FormGroup){
    this.submittedLogin = true;
    if (this.myFormLogin.invalid) {
      return;
    }

    this.authService.login(myForm.controls['email'].value,myForm.controls['password'].value).subscribe((user:any )=>{
      this.tab=user;
     
      this.successMessage="Login Successful";
      
      this.verifUserRoleConncet(myForm.controls['email'].value);
      this.curUser.next(this.tab['nom']);
     
      
      
    },()=>{
      this.msg = 'please give a valid account';
    },()=>this.router.navigate(["/user"])
    )
  }
  verifUserRoleConncet(email:string){
    this.authService.getUserConnect(String(email)).subscribe(user =>{})
}

}
