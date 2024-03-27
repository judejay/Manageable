import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonService } from '../../person.service';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../../app.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.css',
})
export class PeopleComponent implements OnInit {
  dataSource!: MatTableDataSource<Person>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'surname',
    'dateOfBirth',
    'sex',
    'title',
  ];

  constructor(
    private _peopleService: PersonService,
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) {}
  ngOnInit(): void {
    this.getPeople();
  }

  getPeople() {
    console.log('getPeople');

    this._peopleService.getPeople().subscribe({
      next: (res) => {
        console.log('res', res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.log('Error', err),
    });
  }

  openEditForm(data: Person) {
    const dialogRef = this._dialog.open(FormComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPeople();
        }
      },
    });
  }

  deletePerson(id: number) {
    this._peopleService.deletePerson(id).subscribe({
      next: (res) => {
        console.log(res);

        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getPeople();
      },
      error: console.log,
    });
  }
}
