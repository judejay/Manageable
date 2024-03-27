import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from './app.component';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  API_URL = 'http://localhost:5187/api/Person';
  people: Person[] = [];

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    console.log('service get people');
    console.log(this.API_URL);
    console.log(this.people);
    console.log(this.http);
    console.log(this.http.get<Person[]>(this.API_URL));
    console.log(
      this.http
        .get<Person[]>(this.API_URL)
        .pipe(tap((data) => console.log('service data', data)))
    );
    console.log(
      this.http
        .get<Person[]>(this.API_URL)
        .pipe(tap((data) => console.log('service data', data)))
    );
    console.log(
      this.http
        .get<Person[]>(this.API_URL)
        .pipe(tap((data) => console.log('service data', data)))
    );
    console.log(
      this.http
        .get<Person[]>(this.API_URL)
        .pipe(tap((data) => console.log('service data', data)))
    );
    console.log(
      this.http
        .get<Person[]>(this.API_URL)
        .pipe(tap((data) => console.log('service data', data)))
    );
    return this.http
      .get<Person[]>(this.API_URL)
      .pipe(tap((data) => console.log('service data', data)));
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.API_URL, person);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.API_URL}/${person.id}`, person);
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.API_URL}/${id}`);
  }
}
