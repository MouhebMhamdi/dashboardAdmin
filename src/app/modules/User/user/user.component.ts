import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/core/Model/User';
import { UserService } from 'src/app/core/Services/auth/user.service';
import { UserServiceService } from 'src/app/core/Services/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,OnChanges {
  User:Users;
  users:Users;
  us:Users;
  tab:any=[];
  update:boolean=false;
  showUpdate:boolean=false;
  p: number = 1;
  i:number=1;
  term: string;
  myForm: FormGroup;
  file:File;
  submitted = false;
  data:any;
  admin:number=0;
  userLn:number=0;
  constructor(private toastr: ToastrService,private userService:UserServiceService,private authService:UserService,public router: Router) { 
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.getTotal();
    this.verifUserRoleConncet(String(localStorage.getItem("email")))

    this.authService.sharedUser.subscribe(
      (data:Users)=>
      {this.users=data},
      ()=>{},
      ()=>{this.users = new Users()}
    )
  }

  ngOnInit(): void {
   this.getTotal();
    this.authService.sharedUser.subscribe(
      (data:Users)=>
      {this.users=data},
      ()=>{},
      ()=>{this.users = new Users()}
    )
    this.userService.sharedUsers.subscribe(
      (data:Users)=>
      {this.us=data},
      ()=>{},
      ()=>{this.us = new Users()}
    )

    if(localStorage.getItem("email")==null){
      this.router.navigate(['/login'])
    }

    this.User=new Users();
    this.us=new Users();
    this.data=localStorage.getItem("data");
    
    
    this.getAllUsers();
    
  }
  getTotal(){
    
    this.userService.getAllUsers().subscribe((res)=>{
      this.tab=res; 
      for(let i of this.tab.body){
        if(i.roles[0].role=="ADMIN"){
          this.admin+=1;
        }else{
          this.userLn+=1;
        }
      }
  })
   
}
  verifUserRoleConncet(email:string){
    this.authService.getUserConnect(String(email)).subscribe(user =>{})
}
  onFileSelected(event:any) {
    this.file = event.target.files[0];
  }
  delete(id:any){
    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUsers(id).subscribe((res)=>{
          this.tab=res;
        this.getTotal();
        }),()=>this.toastr.error("Error Delete !!","Admin notification");
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    
    
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe((res)=>{
     this.tab=res;
     console.log(this.tab.body)
    })
  }
updateUser(email:string){
  this.userService.getUserByEmail(email).subscribe((res)=>{})

  this.myForm= new FormGroup({
    'prenom':new FormControl("",Validators.required),
    'nom':new FormControl('',Validators.required),
    'tel':new FormControl('',Validators.required),
    'street':new FormControl('',Validators.required),
    'city':new FormControl('',Validators.required),
    'state':new FormControl('',Validators.required),
    'zip':new FormControl('',Validators.required),
    'proffesion':new FormControl('',Validators.required),
    'email':new FormControl('',[Validators.required,Validators.email]),
    'genre':new FormControl('',[Validators.required])
  })

  if(this.update==false){
    this.update=true;
  
    this.userService.sharedUsers.subscribe(
      (data:Users)=>{this.us=data},
      ()=>{}
    )
    

  }else{
    this.update=true;
  }
}
concel(){
  if(this.update==false){
    this.update=true;
  }else{
    this.update=false;
  }
}
updateProfile(){
  this.submitted = true;
  if (this.myForm.invalid) {
    
   return;
  }

  this.userService.updateUser(this.users,String(localStorage.getItem('data'))).subscribe((res)=>{

  this.UploadImg(this.users.idClient);
  this.toastr.success('Profile updated thanks !');


  this.userService.updateUser(this.us,this.us.idClient).subscribe((res)=>{
    this.getAllUsers();
    this.update=false;
    
  }),()=>this.toastr.error("Error !","Update profile notification");
}

}

