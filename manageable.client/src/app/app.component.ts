import { Component, OnInit } from '@angular/core';
import { PersonService } from './person.service';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './components/form/form.component';

export interface Person {
  id: number;
  title: string;
  firstName: string;
  surname: string;
  age: number;
  dateOfBirth: string;
  sex: string;
}
export interface ApiResponse<T> {
  message?: string;
  data: T;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public people: Person[] = [];
  API_URL = 'http://localhost:5187/api/Person';
  constructor(
    private personService: PersonService,
    private _dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getPeople();
  }
  getPeople() {
    this.personService.getPeople().subscribe((res) => {
      console.log(res);
      this.people = res;
    });
  }

  title = 'manageable.client';
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(FormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPeople();
        }
      },
    });
  }
}
