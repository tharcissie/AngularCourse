import { Component, Input } from '@angular/core';
import { Course } from '../../model/course';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input()
  course: Course = {
    id: 0,
    description: '',
    imageUrl: '',
    category: '',
  };
}
