import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PersonService } from '../../person.service';
import { Person } from '../../app.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input() person: Person | null = null;
  @Output() onCloseModal = new EventEmitter<boolean>();
  personForm!: FormGroup;
  titles: string[] = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr'];

  constructor(
    private fb: FormBuilder,
    private _coreService: CoreService, // private personService: PersonService,
    private personService: PersonService,
    public _dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person
  ) {
    this.personForm = this.fb.group({
      title: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
    });
  }

  onClose() {
    console.log('onClose');
    this._dialogRef.close();
  }

  onFormSubmit() {
    console.log('form value on submit ', this.personForm.value);
    // const res = this.personForm.value; subit , this.personForm.value;
    if (this.personForm.valid) {
      console.log('form valid');
      this.personService.addPerson(this.personForm.value).subscribe({
        next: () => {
          this._coreService.openSnackBar('Person added successfully', 'Close');
          this._dialogRef.close(true);
          this.personForm.reset();
        },
        error: (err: unknown) => {
          console.log(err);
        },
      });

      /*       console.log('res sub', res);
      });
      this.onCloseModal.emit(true);
      this.personForm.reset();
      this.onCloseModal.emit(false);
    } else {
      this.personForm.markAllAsTouched();
    }
  } */
    }
  }
}
