import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Facture} from "../../../core/Model/Facture";
import {FactureService} from "../../../core/Services/facture/facture.service";
import {FormsModule} from "@angular/forms";
import { NgModule }      from '@angular/core';

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.scss']
})
export class AddFactureComponent implements OnInit {
  myForm: FormGroup;
  @Input() invoiceToEdit: Facture;
  @Input() prop2 : Facture;
  submitted = false;
  facture:Facture;
  Facture : Facture=new Facture();
  @Output() addEvent = new EventEmitter<Facture>();
  constructor(private factureservice:FactureService) { }

  ngOnInit(): void {

    this.myForm=new FormGroup({
      'Description': new FormControl('', Validators.required),
      'montantRemise': new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern("[0-9]{4}")]),
      'dateFacture': new FormControl('', [Validators.required]),
      'montantFacture': new FormControl('', [Validators.required]),
    });
  }

  get montantR(){
    return this.myForm.get('montantRemise');
  }

  get dateF(){
    return this.myForm.get('dateFacture');
  }
  get active(){
    return this.myForm.get('active');
  }
  get montantF(){
    return this.myForm.get('montantFacture');
  }


  addFactureForm(){
    this.submitted=false;
    this.myForm.reset();
  }
  add(){
    this.facture = new Facture();
    this.facture.montantFacture=this.myForm.value.montantFacture;
    this.facture.montantRemise=this.myForm.value.montantRemise;
    this.facture=this.myForm.value.dateFacture;


    this.addEvent.emit(this.facture);
  }


}
