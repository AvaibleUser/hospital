import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AreaResponseDto } from '../../models/area.dto';
import { EmployeeDto } from '../../models/employee.dto';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { AreaService } from '../../services/area.service';
import { ContractService } from '../../services/contract.service';
import { ContractDto, FinishContractDto } from '../../models/contract.dto';
import { FormNewContractComponent } from '../../components/form-new-contract/form-new-contract.component';
import { ModalMsgComponent } from '@shared/components/modal-msg/modal-msg.component';

@Component({
  selector: 'app-view-employee',
  imports: [FormsModule, FormNewContractComponent, ModalMsgComponent],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent {

  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal1') modalFinnishRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;



  private readonly _employeeService = inject(EmployeeService)
  private readonly _areaService = inject(AreaService)
  private readonly route = inject(Router)
  private readonly _contractService = inject(ContractService)

  areas: AreaResponseDto[] = []
  employee!: EmployeeDto;
  contract!: ContractDto;

  description: string = '';

  classSucces = 'text-purple-700 text-lg'
  classError = 'text-red-700 text-lg'
  classWarning = 'text-yellow-700 text-lg'
  calssValue = ''
  titleModal = ''
  contentModal = ''


  ngOnInit() {
    this.employee = this._employeeService.employee
    if (!this.employee) {
      this.route.navigate(['employee-management/employees'])
    }
    this.getAllAreas()
    this.getFirstContractByEmployeeId(this.employee.id)
  }


  getAllAreas() {
    this._areaService.getAllAreas().subscribe({
      next: value => {
        this.areas = value
      }
    })
  }

  getFirstContractByEmployeeId(idEmployee: number) {
    this._contractService.getFirstContractByEmployeeId(idEmployee).subscribe({
      next: value => {
        this.contract = value
      }
    })

  }

  hanglerErrorMsg(err: string) {
    this.contentModal = err
    this.modalRef2.nativeElement.showModal();
  }

  hanglerError(err: any) {
    const erroCode: number = err.error.status
    switch (erroCode) {
      case 500:
        this.contentModal = 'Ah ocurrido un error inesperado, intente mas tarde, perdone las molestias'
        break
      default:
        this.contentModal = err.error.message
        break
    }

    this.modalRef2.nativeElement.showModal();
  }


  finishContract() {

    if (this.description === '') {
      this.calssValue = this.classWarning;
      this.titleModal = 'Campos inválidos';
      this.hanglerErrorMsg('la descripcion no puede estar vacia');
      return
    }

    const finish: FinishContractDto = {
      description: this.description
    }

    this._contractService.finishContract(this.contract.id, finish).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'Contrato terminado'
        this.contentModal = 'El contrato ha sido finalizado con exito, puede ver el historial'
        this.modalRef2.nativeElement.showModal();
        this.modalRef2.nativeElement.addEventListener('close', () => {
          this.route.navigate(['/employee-management/employees']);
        }, { once: true });
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al finalizar el contrato'
        this.hanglerError(err)
      }
    })

  }

  closeModal() {
    this.modalRef.nativeElement.close()
  }

  closeModalFinish() {
    this.modalFinnishRef.nativeElement.close()
  }

  openModalFisnish() {
    this.modalFinnishRef.nativeElement.showModal()
  }

  openNewContract() {
    this.modalRef.nativeElement.showModal()
  }

  formatDateTime(date: any): string {
    if (!date) {
      return date
    }
    const dateString = `${date}`
    const [datePart, timePart] = dateString.split('T');
    const time = timePart.slice(0, 5);

    return `${datePart} ${time} hrs`;
  }


}
