import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Produit } from '../../models/produit.model';
import { ProduitService } from '../../services/produit-service.service';

@Component({
  selector: 'app-produit-modifier',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produit-modifier.html',
  styleUrl: './produit-modifier.scss',
})
export class ProduitModifier implements OnInit {

  produitId!: number;
  loading = false;
  produit?: Produit;
  produitForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {

    // 🔥 1️⃣ Récupérer l'id AVANT de créer le form
    this.produitId = Number(this.route.snapshot.paramMap.get('id'));

    // 🔥 2️⃣ Créer le formulaire ici
    this.produitForm = new FormGroup({
      nom: new FormControl('', [
        Validators.required,
        this.nomUniqueValidator.bind(this)
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

    // 🔥 3️⃣ Charger les données
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

        this.produitForm.patchValue({
          nom: data.nom,
          prix: data.prix.toString(),
          quantite: data.quantite.toString(),
          description: data.description
        });
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  modifierProduit() {

    if (this.produitForm.invalid) {
      this.produitForm.markAllAsTouched();
      return;
    }

    const produitMaj: Produit = {
      id: this.produitId,
      nom: this.produitForm.value.nom!,
      prix: +this.produitForm.value.prix!,
      quantite: +this.produitForm.value.quantite!,
      description: this.produitForm.value.description
    };

    this.loading = true;

    this.produitService.update(produitMaj).subscribe({
      next: () => {
        this.router.navigate(['/produits']);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // 🔥 VALIDATEUR AVEC EXCLUSION DE L'ID ACTUEL
  nomUniqueValidator(control: AbstractControl): ValidationErrors | null {

    if (!control.value) return null;

    const existe = this.produitService.existsByName(
      control.value,
      this.produitId   // 🔥 exclusion ici
    );

    return existe ? { nomExiste: true } : null;
  }
}