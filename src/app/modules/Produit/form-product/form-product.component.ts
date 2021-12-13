import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../core/Model/Product";

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  form : FormGroup;
  private product: Product;

  @Output() addEvent = new EventEmitter<Product>()
  @Input() updateProduct : Product;

  constructor(private builder : FormBuilder) { }

  ngOnInit(): void {
    if (this.updateProduct === null){
      this.product = new Product();
    }
    else {
      this.product = this.updateProduct;
    }

    this.form = this.builder.group({
      'title' : [this.product.libelle, [Validators.required, Validators.minLength(5)]],
      'price' : [this.product.prixUnitaire, [Validators.required, Validators.min(10)]],
      'picture' : [this.product.image, Validators.required],

    });
  }

  addProduct(form : FormGroup){
    this.product.libelle       = form.value.title;
    this.product.prixUnitaire = form.value.price;
    this.product.image     = form.value.picture;
    this.addEvent.emit(this.product);
  }

}
