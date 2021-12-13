import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fournisseur } from 'src/app/core/Model/Fournisseur';
import { Users } from 'src/app/core/Model/User';
import { UserService } from 'src/app/core/Services/auth/user.service';
import { FournisseurService } from 'src/app/core/Services/fournisseur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit {
data:any;
four:Fournisseur;
fournisseurss:Fournisseur;
fournisseur:Fournisseur;
fournisseurs:Fournisseur[];
tab:any=[];
myForm: FormGroup;
myForm1: FormGroup;
update:boolean=false;
showUpdate:boolean=false;
add:boolean=false;
p: number = 1;
i:number=1;
term: string;
file:File;
submitted = false;
  constructor(private toastr: ToastrService,private fournisseurservice:FournisseurService,private authService:UserService,public router: Router) { }

  ngOnInit(): void {
    this.fournisseurservice.getAllFournisseur().subscribe(res => {
      this.fournisseurs = res;
    })
    this.fournisseurservice.sharedFournisseurs.subscribe(
      (data:Fournisseur)=>
      {this.four=data},
      ()=>{},
      ()=>{this.four = new Fournisseur()}
    )
    this.four=new Fournisseur();
    this.data=localStorage.getItem("data");

  }
  getAllFournisseurs(){
    this.fournisseurservice.getAllFournisseur().subscribe((fournisseurs)=>{
     this.tab=fournisseurs; 
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
        this.fournisseurservice.DeleteFournisseur(id).subscribe((fournisseurs)=>{
          this.tab=fournisseurs;
          this.toastr.success("Fournisseur Deleted !!","Admin notification");
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

  updateFournisseur(id:any){
    this.fournisseurservice.findById(id).subscribe((res)=>{})
  
    this.myForm= new FormGroup({
      'libelle':new FormControl("",Validators.required),
      'code':new FormControl('',Validators.required),
    })
  
    if(this.update==false){
      this.update=true;
    
      this.fournisseurservice.curFournisseur.subscribe(
        (data:Fournisseur)=>{this.four=data},
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
  concel1(){
    if(this.add==false){
      this.add=true;
    }else{
      this.add=false;
    }
  }
  updateFournisseurr(){
    this.submitted = true;
    if (this.myForm.invalid) {
      
     return;
    }
    this.fournisseurservice.UpdateUser(this.four,this.four.idFournisseur).subscribe((res)=>{
      this.fournisseurservice.getAllFournisseur();
      this.update=false;
      
    }),()=>this.toastr.error("Error !","Update Fournisseur notification");
  }
  AddFournisseur(){
  this.fournisseur=new Fournisseur();
    this.myForm1= new FormGroup({
      'libelle':new FormControl("",Validators.required),
      'code':new FormControl('',Validators.required),
    })
  
    if(this.add==false){
      this.add=true;
    
      this.fournisseurservice.curFournisseur.subscribe(
        (data:Fournisseur)=>{this.four=data},
        ()=>{}
      )
      
  
    }else{
      this.add=true;
    }
  }
  
}

