import { Component } from '@angular/core';
import { PersonService } from './person.service';
import { MatDialog } from '@angular/material/dialog';

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
    console.log('getPeople in app');
    this.personService.getPeople().subscribe({
      next: (res) => {
        console.log('res next', res);
        this.people = res;
      },
      error: (err) => {
        console.error('Error in getPeople:', err);
      },
    });
  }

  title = 'manageable.client';
}
