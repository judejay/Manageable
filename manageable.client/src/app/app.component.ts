import { Component } from '@angular/core';
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
export class AppComponent {
  public people: Person[] = [];
  API_URL = 'http://localhost:5187/api/Person';
  constructor(
    private personService: PersonService,
    private _dialog: MatDialog
  ) {}

  getPeople() {
    this.personService.getPeople().subscribe({
      next: (res) => {
        this.people = res;
      },
      error: (err) => console.log('Error', err),
    });
  }

  title = 'manageable.client';
  openPersonForm() {
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
