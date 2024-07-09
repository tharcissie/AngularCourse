import { Component, Input } from '@angular/core';
import { PRODUCT } from '../../model/product';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() product: PRODUCT | null = null;
  @Input() showModal: boolean = false;

  closeModal() {
    this.showModal = false;
  }
}
