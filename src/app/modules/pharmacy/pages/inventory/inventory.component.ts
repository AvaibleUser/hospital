// src/app/pages/inventory/inventory.component.ts
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicineService } from '../../services/medicine.service';
import { Medicine } from '../../models/inveontry';
import { LucideAngularModule, Plus } from 'lucide-angular'; 
import { AlertStore } from 'app/store/alert.store';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './inventory.component.html'
})
export default class InventoryComponent implements OnInit {
  @ViewChild('newMedicine') newMedicineDialog!: ElementRef<HTMLDialogElement>;
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);
  private readonly medicineService = inject(MedicineService);
  searchTerm: string = '';
  inventory: Medicine[] = [];
  Plus = Plus;

  editMode: boolean = false;
  medicine: Medicine | null = null;
  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    unitPrice: [0, [Validators.required, Validators.min(0)]],
    cost: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    minStock: [0, [Validators.required, Validators.min(0)]]
  });
  
  constructor() {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.medicineService.getAll(this.searchTerm).subscribe(data => {
      this.inventory = data;
    });
  }

  get filteredInventory(): Medicine[] {
    return this.inventory.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(): void {
    this.loadInventory();
  }

  editMedicine(id: number){
    this.medicineService.getById(id).subscribe((data: Medicine) => {
      this.form.patchValue(data);
      this.editMode = true;
      this.medicine = data;
      this.newMedicineDialog.nativeElement.showModal();
    });
  }

  saveMedicine(): void {
    
  }

  createMedicine(): void {
    if (this.form.invalid) {
      this.alertStore.addAlert({
        message: `Ingresa datos validos`,
        type: 'error',
      });
      return;
    }

    const medicine: Partial<Medicine>  = {
      name: this.form.value.name!,
      unitPrice: this.form.value.unitPrice!,
      cost: this.form.value.cost!,
      stock: this.form.value.stock!,
      minStock: this.form.value.minStock!,
    }

    this.medicineService.create(medicine).subscribe(data => {
      this.loadInventory();
      this.form.reset();
      this.newMedicineDialog.nativeElement.close();
      this.alertStore.addAlert({
        message: `Medicamento creado correctamente`,
        type: 'success',
      });
    });

  }

  buyMedicine(): void {

  }

  startCreateMedicine(): void {
    this.editMode = false;
    this.medicine = null;
    this.form.reset();
    this.newMedicineDialog.nativeElement.showModal();
  }

  closeModal(): void {
    this.newMedicineDialog.nativeElement.close();
  }

  updateMedicine(): void {
    if (this.form.invalid) {
      this.alertStore.addAlert({
        message: `Ingresa datos validos`,
        type: 'error',
      });
      return;
    }

    const medicine: Partial<Medicine>  = {
      name: this.form.value.name!,
      unitPrice: this.form.value.unitPrice!,
      cost: this.form.value.cost!,
      stock: this.form.value.stock!,
      minStock: this.form.value.minStock!,
    }

    this.medicineService.update(this.medicine!.id, medicine).subscribe(data => {
      this.loadInventory();
      this.form.reset();
      this.editMode = false;
      this.alertStore.addAlert({
        message: `Medicamento actualizado correctamente`,
        type: 'success',
      });
      this.newMedicineDialog.nativeElement.close();
    });
  }

}
