import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../Model/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url= environment.hostUrl+"/produit/"
  constructor(private http: HttpClient) { }
  getListProduct(){
    return this.http.get<Product[]>(this.url+"getAllProduits");
  }

  addProduct(product:Product){
    return this.http.post(this.url+"addProduit",product)
  }

  deleteProduct(id:number){
    return this.http.delete(this.url+"deleteProduit/"+id)
  }
  updateProduct(product: Product){
    return this.http.put(this.url+"updateProduit/", product)
  }

  getProductTitle(criteria: string){}
}
