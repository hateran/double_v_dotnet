import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {
  peopleForm: FormGroup;

  loading: boolean = false;
  update: boolean = false;
  dirty: boolean = false;

  types_id: any[] = ['Cedula de ciudania', 'Tarjeta de identidad', 'Pasaporte'];

  constructor(
    public dialogRef: MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _peopleService: PeopleService
  ) {
    this.peopleForm = this.formBuilder.group({
      identification: new FormControl(0, Validators.required),
      typeIdentification: new FormControl(this.types_id[0], Validators.required),
      names: new FormControl("", Validators.required),
      lastName: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    if (this.data.person) {
      if (this.data.option == 'watch') {
        this.peopleForm.disable();
      }
      this.peopleForm.patchValue(this.data.person);

      this.peopleForm.valueChanges.subscribe((form) => {
        let changesCount = 0;

        Object.entries(form).forEach(([key, value]) => {
          if (this.data.person[key] != value) {
            changesCount++;
          }
        });
        this.dirty = changesCount > 0;
      });
    }
  }

  save() {
    this.loading = true;
    let form = this.peopleForm.value;

    if (!this.data.option) {
      this._peopleService.createPerson(form).subscribe((response: any) => {
        this.goWatch();
        this.update = true;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
    } else {
      form.id = this.data.id;
      this._peopleService.editPerson(this.data.id, form).subscribe((response: any) => {
        this.goWatch();
        this.update = true;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
    }
  }

  goWatch() {
    this.data.option = "watch";
    this.peopleForm.disable();
  }

  goEdit() {
    this.data.option = "edit";
    this.peopleForm.enable();
  }

  close() {
    if (this.update) {
      this.dialogRef.close({ update: true });
    } else {
      this.dialogRef.close();
    }
  }

}
