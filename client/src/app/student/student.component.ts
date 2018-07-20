import { Component, OnInit } from '@angular/core';

/*import*/

import { StudentService } from '../student.service';

import { Student } from '../student';

/*end import */

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [StudentService]
})
export class StudentComponent implements OnInit {

students: Student[];
student: Student;
FirstName:  string;
LastName: string;
Email: string;
Phone: string;
constructor(private studentService: StudentService) { }


// update method
EditStudent(id: any) {
}
// add method
addStudent() {

  // get data
  const newStudent = {
    FirstName: this.FirstName,
    LastName: this.LastName,
    Email: this.Email,
    Phone: this.Phone
  };

  // save to db
  this.studentService.addStudent(newStudent)
  .subscribe(student => {
    this.students.push(student);

    // re-fetch
    this.studentService.getStudents()
    .subscribe( students => this.students = students);
  });
}

// delete method
deleteStudent(id: any) {
const students = this.students;
this.studentService.deleteStudent(id)
.subscribe(data => {
  if (data.n === 1) {
    for (let i = 0; i < students.length ; i++) {

      if (students[i]._id === id) {
        students.splice(i, 1);
      }

    }
  }
});
}

 // show all
  ngOnInit() {
    this.studentService.getStudents()
    .subscribe( students => this.students = students);
  }

}
