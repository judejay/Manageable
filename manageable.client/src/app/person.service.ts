import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from './app.component';
import { Observable, Subject, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  personAdded = new Subject<void>();

  API_URL = 'http://localhost:5187/api/Person';
  people: Person[] = [];

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.API_URL);
  }

  addPerson(person: Person): Observable<Person> {
    // Clone the person object to avoid modifying the original
    const personCopy = { ...person };

    // Format the dateOfBirth as a string in the 'yyyy-mm-dd' format
    const date = new Date(person.dateOfBirth);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
    const day = ('0' + date.getDate()).slice(-2);
    personCopy.dateOfBirth = `${year}-${month}-${day}`;

    return this.http.post<Person>(this.API_URL, personCopy);
    pipe(
      tap(() => {
        this.personAdded.next();
      })
    );
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
