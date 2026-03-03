import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Produit } from '../../models/produit.model';
import { RouterLink } from '@angular/router';
import { ProduitService } from '../../services/produit-service.service';



@Component({
  selector: 'app-produit-item-div',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './produit-item-div.html',
  styleUrl: './produit-item-div.scss',
})
export class ProduitItemDiv {

  @Input()
  produit!: Produit;

  @Output()
  deleteEvent = new EventEmitter<number>();

  supprimerProduit() {

    const confirmation = confirm(
      `Voulez-vous vraiment supprimer "${this.produit.nom}" ?`
    );

    if (!confirmation) return;

    this.deleteEvent.emit(this.produit.id!);
  }
}
