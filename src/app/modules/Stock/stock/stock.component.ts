import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stock } from 'src/app/core/Model/Stock';
import { Users } from 'src/app/core/Model/User';
import { UserService } from 'src/app/core/Services/auth/user.service';
import { StockServiceService } from 'src/app/core/Services/Stock/stock-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  users:Users;
  Stock:Stock;
  term: string;
  tab:any=[];
  p:number=1;
 submitted = false;
 submittedUpdate=false;
  myForm:FormGroup;
  myForm1:FormGroup;
  update:boolean=false;
  add:boolean=false;

  constructor(private router:Router,private authService:UserService,private stockService:StockServiceService) { }

  ngOnInit(): void {
    
    this.getAllStock();
    this.stockService.sharedStock.subscribe(
      (data:Stock)=>{this.Stock=data},
      ()=>{},
      ()=>{this.Stock=new Stock()}
    )
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

  getAllStock(){
    this.stockService.getAllStock().subscribe((res)=>{
})
  }
  verifUserRoleConncet(email:string){
    this.authService.getUserConnect(String(email)).subscribe(user =>{})
}
getStockById(id:any){
  this.stockService.getStockById(id).subscribe((res)=>{});
}

updateS(id:any){
  this.submittedUpdate = true;
  this.Stock=new Stock();
      this.myForm1= new FormGroup({
        'qte':new FormControl("",Validators.required),
        'qtemin':new FormControl('',Validators.required),
        'libelle':new FormControl('',Validators.required),
      })
  if(this.update==false){

    this.updateStock(id);
    this.update=true;
    
  }else{
    this.getAllStock();
    this.update=false;

  }
}
updateStock(id:any){
    this.update=true;
  this.getStockById(id);
  this.Stock=new Stock();
  this.stockService.sharedStock.subscribe(
    (data:Stock)=>{this.Stock=data},
    ()=>{},
    ()=>{this.Stock=new Stock()}
  )
      
  
    if(this.myForm1.invalid){
      return;
    }
    


}
addStock(){
  this.submitted = true;
  this.Stock=new Stock();
      this.myForm= new FormGroup({
        'qte':new FormControl("",Validators.required),
        'qtemin':new FormControl('',Validators.required),
        'libelle':new FormControl('',Validators.required),
      })

  if(this.add==false){
    this.add=true;
    if(this.myForm.invalid){
      return;
    }

  }else{
    
    this.add=false;
    this.getAllStock();
  }


  
}
addStockSubmitted(){
  if(this.myForm.invalid){
    return;
  }
  this.stockService.ajoutStock(this.Stock).subscribe((res)=>{
    this.getAllStock();
    this.add=false;
  })
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
      this.stockService.deleteStock(id).subscribe((res)=>{
      this.getAllStock();
      })
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
}
