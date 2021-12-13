import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Facture} from "../../core/Model/Facture";
import {FactureService} from "../../core/Services/facture/facture.service";

@Component({
  selector: 'app-edit-facture',
  templateUrl: './edit-facture.component.html',
  styleUrls: ['./edit-facture.component.scss']
})
export class EditFactureComponent implements OnInit {
  myForm: FormGroup;
  @Input() invoiceToEdit: Facture;
  @Input() prop2 : Facture;

  @Output() edited = new EventEmitter<Facture>();

  constructor(private factureservice: FactureService) {
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      idFacture: new FormControl({"value": this.invoiceToEdit.idFacture, "disabled": true}),
      dateFacture: new FormControl(this.invoiceToEdit.dateFacture, Validators.required),
      montantRemise: new FormControl(this.invoiceToEdit.montantRemise),
      active: new FormControl(this.invoiceToEdit.active),
      montantFacture: new FormControl(this.invoiceToEdit.montantFacture)
    })
  }


  ngOnChanges(changes: SimpleChanges) {
     /*this.myForm=new FormGroup({
       idFacture:new FormControl(this.invoiceToEdit.idFacture),
       dateFacture:new FormControl(this.invoiceToEdit.dateFacture),
       montantFacture: new FormControl(this.invoiceToEdit.montantFacture),
       montantRemise:new FormControl(this.invoiceToEdit.montantRemise),

     })*/
    console.log(changes);
    if (!changes.invoiceToEdit.firstChange) {
      this.myForm.setControl('idFacture', new FormControl(this.invoiceToEdit.idFacture));
      this.myForm.setControl('dateFacture', new FormControl(this.invoiceToEdit.dateFacture));
      this.myForm.setControl('montantRemise', new FormControl(this.invoiceToEdit.montantRemise));
      this.myForm.setControl('montantFacture', new FormControl(this.invoiceToEdit.montantFacture));

    }


  }

  edit() {
    console.log(this.myForm.getRawValue());
    // @ts-ignore
    this.factureservice.UpdateFacture(this.myForm.getRawValue()).subscribe();
    this.edited.emit(this.myForm.getRawValue());
    this.myForm.reset();
  }
}
