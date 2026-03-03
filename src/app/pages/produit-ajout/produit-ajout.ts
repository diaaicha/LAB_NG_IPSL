import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from '../../models/produit.model';
import { ProduitService } from '../../services/produit-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produit-ajout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produit-ajout.html',
  styleUrl: './produit-ajout.scss',
})
export class ProduitAjout {

  loading = false;
  produitForm!: FormGroup;

  constructor(
    private produitService: ProduitService,
    private router: Router
  ) {

    this.produitForm = new FormGroup({
      nom: new FormControl('', [
        Validators.required,
        this.nomUniqueValidator.bind(this)  // 🔥 important
      ]),
      prix: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      quantite: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      description: new FormControl('')
    });
  }

  ajoutProduit() {

    if (this.produitForm.invalid) {
      this.produitForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const produit: Produit = {
      nom: this.produitForm.value.nom!,
      prix: +this.produitForm.value.prix!,
      quantite: +this.produitForm.value.quantite!,
      description: this.produitForm.value.description
    };

    this.produitService.add(produit).subscribe({
      next: () => {
        this.router.navigate(['/produits']);
      },
      error: (err) => {
        console.error("Erreur :", err);
        this.loading = false;
      }
    });
  }

  nomUniqueValidator(control: AbstractControl): ValidationErrors | null {

    if (!control.value) return null;

    const existe = this.produitService.existsByName(control.value);

    return existe ? { nomExiste: true } : null;
  }
}
