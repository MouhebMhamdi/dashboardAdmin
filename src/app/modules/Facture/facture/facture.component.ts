import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Facture } from 'src/app/core/Model/Facture';
import { Users } from 'src/app/core/Model/User';
import { UserService } from 'src/app/core/Services/auth/user.service';
import { FactureService } from 'src/app/core/Services/facture-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  users:Users;
  facts:Facture[];
  tab:any;
  term: string;
  p: number = 1;
  show:Boolean = false;
  showforadd:Boolean = false;
  myFact: Facture;
  Facture : Facture=new Facture();

  constructor(private router:Router,private authService:UserService,private toastr: ToastrService,private factureService:FactureService) { }

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

    this.factureService.getAllFacture().subscribe(res => {
      this.facts = res;


    })

  }
  verifUserRoleConncet(email:string){
    this.authService.getUserConnect(String(email)).subscribe(user =>{})
}

/*getAllFacture(){
      this.factureService.getAllFacture().subscribe((res)=>{
        // @ts-ignore
        this.facts=res;

      })
    }*/

    deleteFacture(id:any){

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
          this.factureService.deleteFacture(id).subscribe((res)=>{
  
            this.tab=res;
  
            this.toastr.success("User Deleted !!","Admin notification");
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
            'Your imaginary file is safe ????',
            'error'
          )
        }
      })
  
  
    }
    showEdit(i:Facture){
      this.toastr.success("aaaaa","title");
      // this.show=!this.show;
      this.show=true;
      this.myFact=i;
      //console.log(this.myInvoice);
    }
  
    showAdd(){
      this.toastr.success("aaaaa","title");
      // this.show=!this.show;
      this.showforadd=true;
  
      //console.log(this.myInvoice);
    }
  
    updateInvoice(i:Facture){
  
      for (let k in this.facts){
        if (this.facts[k].idFacture == i.idFacture){
          this.facts[k]=i;
        }
      }
    }
  
}
