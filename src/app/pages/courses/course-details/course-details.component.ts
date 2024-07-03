import { Component, OnInit } from '@angular/core';
import { COURSES } from '../../../db-data';
import { Course } from '../../../model/course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  courses: Course[] = COURSES;
  course: Course | undefined = {
    id: 0,
    description: '',
    imageUrl: '',
    category: '',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const id = parseInt(idParam, 10);
        this.course = this.courses.find((course) => course.id === id);
      }
    });
  }
}
