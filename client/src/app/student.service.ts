import { Injectable } from '@angular/core';

/*import area*/
import { Http, Headers } from '@angular/http';
import { Student } from './student';
import 'rxjs/add/operator/map';

/*end - import area*/

@Injectable()
export class StudentService {

  constructor(private http: Http) { }

// retrieving StudentService
getStudents() {
return this.http.get('http://127.0.0.1:3000/api/students')
  .map(res => res.json());
}

// add student method
addStudent(newStudent) {
const headers = new Headers();
headers.append('Content-Type', 'application/json');

return this.http.post('http://localhost:3000/api/students', newStudent, {headers: headers})
  .map(res => res.json());
}

// delete method
deleteStudent(id) {
return this.http.delete('http://localhost:3000/api/student/' + id)
  .map(res => res.json());
}

}
