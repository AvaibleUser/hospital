import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AreaService } from '../../services/area.service';
import { AreaResponseDto } from '../../models/area.dto';
import { ModalMsgComponent } from '@shared/components/modal-msg/modal-msg.component';
import { CreateEmployeeDto } from '../../models/employee.dto';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-employee',
  imports: [FormsModule, ModalMsgComponent],
  templateUrl: './register-employee.component.html',
  styleUrl: './register-employee.component.css'
})
export class RegisterEmployeeComponent {

  @ViewChild('modal1') modalRef2!: ElementRef<HTMLDialogElement>;


  private readonly _areaService = inject(AreaService)
  private readonly _employeeService = inject(EmployeeService)
  private readonly route = inject(Router)


  areas: AreaResponseDto[] = []

  classSucces = 'text-purple-700 text-lg'
  classError = 'text-red-700 text-lg'
  classWarning = 'text-yellow-700 text-lg'
  calssValue = ''
  titleModal = ''
  contentModal = ''


  currentStep = 1;
  steps = ['Datos del empleado', 'Contrato', 'Confirmación'];


  employee = {
    name: '',
    cui: '',
    phone: '',
    email: '',
    areaId: 0,
    isSpecialist: false,
  };

  contract = {
    startDate: '',
    salary: 0,
    iggs: 0,
    irtra: 0,
  };

  ngOnInit() {
    this.getAllAreas()
  }

  getAllAreas() {
    this._areaService.getAllAreas().subscribe({
      next: value => {
        this.areas = value
      }
    })
  }

  nextStep() {
    if (this.currentStep === 1 && !this.validDateEmploye()) {
      return;
    }

    if (this.currentStep === 2 && !this.validDataContract()) {
      return;
    }

    if (this.employee.isSpecialist) {
      this.currentStep = 3
    }

    if (this.currentStep < 3) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep === 3 && this.employee.isSpecialist) {
      this.currentStep = 1
    }

    if (this.currentStep > 1) this.currentStep--;
  }

  hanglerError(err: string) {
    this.contentModal = err
    this.modalRef2.nativeElement.showModal();
  }

  // valida los datos antes de pasar al siguiente paso
  validDateEmploye(): boolean {
    this.calssValue = this.classWarning;
    this.titleModal = 'Campos inválidos';

    // Validar nombre
    if (!this.employee.name?.trim()) {
      this.hanglerError('El nombre no puede estar vacío');
      return false;
    }

    // Validar CUI 
    if (!this.employee.cui?.trim()) {
      this.hanglerError('El CUI no puede estar vacío');
      return false;
    }

    // Validar teléfono
    if (!this.employee.phone?.trim()) {
      this.hanglerError('El teléfono no puede estar vacío');
      return false;
    }

    // Validar email 
    if (!this.employee.email?.trim()) {
      this.hanglerError('El email no puede estar vacío');
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.employee.email)) {
      this.hanglerError('El email no tiene un formato válido');
      return false;
    }

    //TODO: descomentar cuando ya se validen las areas

    // Validar área (debe ser mayor a 0)
    //if (this.employee.areaId <= 0) {
    // this.hanglerError('El área debe ser seleccionada');
    //return false;
    // }

    console.log(this.employee.isSpecialist);


    return true;
  }

  // valida los datos del contrato antes de confirmar
  validDataContract(): boolean {
    this.calssValue = this.classWarning;
    this.titleModal = 'Campos inválidos';

    // Validar fecha de inicio 
    if (!this.contract.startDate) {
      this.hanglerError('La fecha de inicio es requerida');
      return false;
    }

    // Validar salario (mayor a 0)
    if (this.contract.salary <= 0) {
      this.hanglerError('El salario debe ser mayor a 0');
      return false;
    }

    // Validar IGGS (no negativo)
    if (this.contract.iggs < 0) {
      this.hanglerError('El IGGS no puede ser negativo');
      return false;
    }

    // Validar IRTRA (no negativo)
    if (this.contract.irtra < 0) {
      this.hanglerError('El IRTRA no puede ser negativo');
      return false;
    }

    // Ejemplo: Validar que IGGS + IRTRA no sea mayor al 20% del salario
    const totalDeductions = this.contract.iggs + this.contract.irtra;
    if (totalDeductions > 20) {
      this.hanglerError('Las deducciones no pueden exceder el 20% del salario');
      return false;
    }

    return true;
  }

  submit() {

    if (this.employee.isSpecialist) {
      this.contract.iggs = 15
      this.contract.irtra = 15
      this.contract.salary = 15
      this.contract.startDate = '2025-02-15'
    }

    const newEmployee: CreateEmployeeDto = {
      area: this.employee.areaId,
      cui: this.employee.cui,
      fullName: this.employee.name,
      phone: this.employee.phone,
      email: this.employee.email,
      isSpecialist: this.employee.isSpecialist,
      startDate: this.contract.startDate,
      salary: this.contract.salary,
      igssDiscount: this.contract.iggs,
      irtraDiscount: this.contract.irtra
    }

    this._employeeService.createArea(newEmployee).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'Empleado Registrado con exito'
        this.contentModal = 'El empleado ha sido registrado en el sistema, ahora ya puede gestionar sus vacaciones, despidos aumentos...'
        this.modalRef2.nativeElement.showModal();
        this.modalRef2.nativeElement.addEventListener('close', () => {
          //TODO: redirigir 
          this.route.navigate(['']);
        }, { once: true });
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al registrar al empleado'
        this.hanglerError(err.error.message)
      }
    })
  }


}
