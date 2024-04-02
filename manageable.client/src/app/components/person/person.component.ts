import { Component, OnInit, inject } from '@angular/core';
import { Person } from '../../app.component';
import { PersonService } from '../../person.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  personId = -1;
  constructor(private _personService: PersonService) {
    this.personId = this.route.snapshot.params['id'];
    console.log(this.personId);
  }
  ngOnInit(): void {
    this._personService.getPerson(this.personId).subscribe((person: Person) => {
      this.person = person;
      console.log(person);
    });
  }

  title = 'person';

  person!: Person;
}
