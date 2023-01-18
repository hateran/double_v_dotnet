import { Component, OnInit, ViewChild } from '@angular/core';
import { PeopleService } from './people.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from './dialog-form/dialog-form.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'identification', 'typeIdentification', 'names', 'lastName', 'email', 'Actions'];

  loading: boolean = false;

  people: any[] = [];

  constructor(
    private dialog: MatDialog,
    private _peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.listPeople();
  }

  listPeople() {
    this.loading = true;
    this._peopleService.listPeople().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.people = response;

      setTimeout(() => {
        this.paginator.length = this.people.length;
      }, 0);

      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  pageChange(event: any) {
  }

  sortData(event: any) {
  }

  openForm(element?: any, mode?: string) {
    const dialogRefForm = this.dialog.open(DialogFormComponent, {
      width: '60%',
      maxHeight: '80vh',
      data: { person: element ? element : null, id: element ? element.id : null, option: mode ? mode : null }
    });

    dialogRefForm.afterClosed().subscribe(result => {
      if (result) {
        if (result.update) {
          this.listPeople();
        }
      }
    });
  }

}
