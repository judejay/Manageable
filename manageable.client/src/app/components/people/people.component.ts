import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonService } from '../../person.service';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../../app.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { CoreService } from '../../services/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.css',
})
export class PeopleComponent implements OnInit {
  openPersonForm() {
    const dialogRef = this._dialog.open(FormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log('val', val);
          this.getPeople();
        }
      },
    });
  }
  dataSource!: MatTableDataSource<Person>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'title',
    'firstName',
    'surname',
    'dateOfBirth',
    'sex',

    'age',
    'actions',
  ];

  constructor(
    private _peopleService: PersonService,
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getPeople();
    this._peopleService.personAdded.subscribe(() => {
      this.getPeople();
    });
  }

  getPeople() {
    console.log('getPeople');

    this._peopleService.getPeople().subscribe({
      next: (res) => {
        console.log('res of people', res);
        this.dataSource = new MatTableDataSource(res);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.log('Error', err),
    });
  }

  openEditForm(data: Person) {
    console.log('openEditForm', data);
    const dialogRef = this._dialog.open(FormComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        console.log('before closed val', val);
        if (val) {
          console.log('after closed val', val);
          this.getPeople();
        }
      },
    });
  }

  deletePerson(id: number) {
    console.log('deletePerson', id);

    this._peopleService.deletePerson(id).subscribe({
      next: (res) => {
        console.log(res);

        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getPeople();
      },
      error: console.log,
    });
  }

  openPersonDetails(id: number) {
    // console.log('openPersonDetails', id);
    this.router.navigate(['person', id]);
    //navigate to person component
  }
}
