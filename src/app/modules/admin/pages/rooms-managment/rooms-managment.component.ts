import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalMsgComponent } from '@shared/components/modal-msg/modal-msg.component';
import { RoomResponseDto } from '../../models/rooms.dto';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-rooms-managment',
  imports: [RouterModule, FormsModule, ModalMsgComponent],
  templateUrl: './rooms-managment.component.html',
  styleUrl: './rooms-managment.component.css'
})
export class RoomsManagmentComponent {

  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal1') modalRef2!: ElementRef<HTMLDialogElement>;

  private readonly _roomService = inject(RoomService)


  classSucces = 'text-purple-700 text-lg'
  classError = 'text-red-700 text-lg'
  classWarning = 'text-yellow-700 text-lg'
  calssValue = ''
  titleModal = ''
  contentModal = ''

  isEditModalOpen = false;
  isRegisterOpen = false;
  selectRoom: RoomResponseDto | undefined;
  numberRoom = '';

  rooms: RoomResponseDto[] = []

  ngOnInit() {
    //this.getAllAreas()
  }

  openCreateArea(){

  }

  openEditModal(roomEdit: RoomResponseDto){

  }
}
