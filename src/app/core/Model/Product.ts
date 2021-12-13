import {Rayon} from "./Rayon";
import {Stock} from "./Stock";
import {DetailProduit} from "./DetailProduit";
import {Category} from "./Category";

export class Product{
  idProduit : number;
  code : string;
  libelle : string;
  prixUnitaire : number;
  image: string;
  review : number;
  fournisseurs : string;
  rayon: Rayon;
  stock : Stock;
  detailProduit : DetailProduit;
  detailFacture : string;
  category: Category;
}
