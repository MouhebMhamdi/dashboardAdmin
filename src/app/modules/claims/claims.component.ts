import { Component, OnInit } from '@angular/core';
import {Claims} from "../../core/Model/claims";
import {ClaimsService} from "../../core/Services/claims/claims.service";

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {


  claims: Claims[];

  constructor(private claimService : ClaimsService) { }

  ngOnInit() {
    this.listClaims();
  }

  deleteClaim(id: number) {
    this.claimService.deleteClaim(id)
      .subscribe(
        data => {
          console.log(data);
          this.claimService.getAllClaims().subscribe(data =>{
            this.claims =data
          })
        },
        error => console.log(error));
  }

  listClaims(){
    this.claimService.getAllClaims().subscribe(
      (data)=> this.claims=data
    )
  }

}
