import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProduitService } from '../../services/produit-service.service';
import { Produit } from '../../models/produit.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produit-details.html',
  styleUrl: './produit-details.scss',
})
export class ProduitDetails implements OnInit {

  produitId!: number;
  produit?: Produit;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produitId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduit();
  }

  loadProduit() {
    this.loading = true;

    this.produitService.getById(this.produitId).subscribe({
      next: (data) => {
        if (!data) {
          this.router.navigate(['/produits']);
          return;
        }
        this.produit = data;
      },
      complete: () => this.loading = false
    });
  }
}