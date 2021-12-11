import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/core/Model/User';
import { UserService } from 'src/app/core/Services/auth/user.service';
import { UserServiceService } from 'src/app/core/Services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  User:Users;
  users:Users;
  tab:any=[];
  update:boolean=false;
  showUpdate:boolean=false;
  p: number = 1;
  i:number=1;
  term: string;
  myForm: FormGroup;
  file:File;
  submitted = false;
  constructor(private toastr: ToastrService,private userService:UserServiceService,private authService:UserService) { }

  ngOnInit(): void {
    this.User=new Users();
    this.myForm= new FormGroup({
      'prenom':new FormControl('',Validators.required),
      'nom':new FormControl('',Validators.required),
      'dateNaissance':new FormControl('',Validators.required),
      'tel':new FormControl('',Validators.required),
      'street':new FormControl('',Validators.required),
      'city':new FormControl('',Validators.required),
      'state':new FormControl('',Validators.required),
      'zip':new FormControl('',Validators.required),
      'picture':new FormControl('')
    })
    this.getAllUsers();
  }
  onFileSelected(event:any) {
    this.file = event.target.files[0];
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
updateUser(id:Number){
  if(this.update==false){
    this.update=true;
    this.authService.sharedUser.subscribe(
      (data:Users)=>{this.users=data},
      ()=>{},
      ()=>{this.users = new Users()}
    )

  }else{
    this.update=true;
  }
}
updateProfile(){
  this.submitted = true;
  /*
  if (this.myForm.invalid) {
   return;
  }
  this.userService.updateUser(this.users,String(localStorage.getItem('data'))).subscribe((res)=>{
  
  this.UploadImg(this.users.idClient);
  this.toastr.success('Profile updated thanks !');

  }),()=>this.toastr.error("Error !","Update profile notification");
}
*/
}
}
