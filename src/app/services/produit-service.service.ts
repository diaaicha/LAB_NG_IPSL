import { delay, Observable, of } from "rxjs";
import { PRODUITS } from "../data/produit.data";
import { Produit } from "../models/produit.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ProduitService {

  private produits: Produit[] = PRODUITS;

  getAll(): Observable<Produit[]> {
    return of(this.produits).pipe(delay(500));
  }

  getById(id: number): Observable<Produit | undefined> {
    return of(this.produits.find(p => p.id === id)).pipe(delay(500));
  }

add(produit: Produit): Observable<Produit> {

  const maxId = Math.max(...this.produits.map(p => p.id || 0));
  produit.id = maxId + 1;

  this.produits.push(produit);

  return of(produit).pipe(delay(500));
}


  update(produit: Produit): Observable<Produit> {
    const index = this.produits.findIndex(p => p.id === produit.id);
    this.produits[index] = produit;
    return of(produit).pipe(delay(500));
  }

  delete(id: number): Observable<boolean> {
    this.produits = this.produits.filter(p => p.id !== id);
    return of(true).pipe(delay(500));
  }

  existsByName(nom: string, excludeId?: number): boolean {

    const nomNormalise = nom.trim().toLowerCase();

    return this.produits.some(p =>
      p.nom.trim().toLowerCase() === nomNormalise &&
      p.id !== excludeId   
    );
  }



}
