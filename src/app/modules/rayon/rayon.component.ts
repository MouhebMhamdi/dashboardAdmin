import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rayon } from 'src/app/core/Model/Rayon';
import { UserService } from 'src/app/core/Services/auth/user.service';
import { RayonService } from 'src/app/core/Services/rayon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rayon',
  templateUrl: './rayon.component.html',
  styleUrls: ['./rayon.component.scss']
})
export class RayonComponent implements OnInit {
data:any;
ry:Rayon;
rayonss:Rayon;
rayon:Rayon;
rayons:Rayon[];
tab:any=[];
myForm: FormGroup;
update:boolean=false;
showUpdate:boolean=false;
p: number = 1;
i:number=1;
term: string;
file:File;
submitted = false;
  constructor(private toastr: ToastrService,private rayonservice:RayonService,private authService:UserService,public router: Router) { }

  ngOnInit(): void {
    this.rayonservice.getAllRayon().subscribe(res => {
      this.rayons = res;
    })
    this.rayonservice.sharedRayons.subscribe(
      (data:Rayon)=>
      {this.ry=data},
      ()=>{},
      ()=>{this.ry = new Rayon()}
    )
    this.ry=new Rayon();
    this.data=localStorage.getItem("data");

  }
  getAllUsers(){
    this.rayonservice.getAllRayon().subscribe((rayons)=>{
     this.tab=rayons; 
     console.log(this.tab.body)
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
        this.rayonservice.DeleteRayonByID(id).subscribe((rayons)=>{
          this.tab=rayons;
          this.toastr.success("Rayon Deleted !!","Admin notification");
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

  updateRayon(id:any){
    this.rayonservice.FindRayonByID(id).subscribe((res)=>{})
  
    this.myForm= new FormGroup({
      'libelle':new FormControl("",Validators.required),
      'code':new FormControl('',Validators.required),
    })
  
    if(this.update==false){
      this.update=true;
    
      this.rayonservice.curRayon.subscribe(
        (data:Rayon)=>{this.ry=data},
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
  updateRayonn(){
    this.submitted = true;
    if (this.myForm.invalid) {
      
     return;
    }
    this.rayonservice.updaterayon(this.ry,this.ry.idRayon).subscribe((res)=>{
      this.rayonservice.getAllRayon();
      this.update=false;
      
    }),()=>this.toastr.error("Error !","Update profile notification");
  }
  
}
