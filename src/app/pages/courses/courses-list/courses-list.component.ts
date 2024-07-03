import { Component } from '@angular/core';
import { Course } from '../../../model/course';
import { COURSES } from '../../../db-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css',
})
export class CoursesListComponent {
  courses: Course[] = COURSES;

  constructor(private router: Router) {}

  viewDetails(id: number) {
    this.router.navigate(['/course', id]);
  }
}
