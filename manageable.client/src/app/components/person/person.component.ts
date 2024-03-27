import { Component } from '@angular/core';
import { Person } from '../../app.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent {
  closeModel() {
    throw new Error('Method not implemented.');
  }
  deletePerson(arg0: any) {
    throw new Error('Method not implemented.');
  }
  loadPerson(_t16: Person) {
    throw new Error('Method not implemented.');
  }
  title = 'person';
  isModelOpen = false;
  people: Person[] = [];
  person!: Person;

  openModel() {
    this.isModelOpen = true;
  }
}
