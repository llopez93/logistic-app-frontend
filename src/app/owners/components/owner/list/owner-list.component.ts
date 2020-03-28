import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Pageable } from 'src/app/core/domain/pagination/pageable';
import { FormControl } from '@angular/forms';
import { GlobalAppService } from 'src/app/core/commons/service/global-app.service';
import { ConfirmDialogService } from 'src/app/core/commons/service/confirm-dialog.service';
import { Router } from '@angular/router';
import { OwnerService } from 'src/app/owners/services/owner.service';
import { SnackbarService } from 'src/app/core/service/snackbar.service';
import { debounceTime } from 'rxjs/operators';
import Owner from 'src/app/owners/domain/owner';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.scss']
})
export class OwnerListComponent implements OnInit {

  @ViewChild("paginator", {static: true})
  paginator: MatPaginator;
  @ViewChild(MatSort, {static: false})
  sort: MatSort;
  displayedColumns = ["firstName", "lastName", "cuil", "email", "shovelCost", "actions"];
  data = new MatTableDataSource([]);
  paginationOptions: Pageable = new Pageable();
  resultsLength: number;

  // Filtros
  firstNameFilterControl: FormControl;
  lastNameFilterControl: FormControl;
  emailFilterControl: FormControl;
  cuilFilterControl: FormControl;

  constructor(private readonly ownerService: OwnerService,
              private readonly appService: GlobalAppService,
              private readonly snackbarService: SnackbarService,
              private readonly confirmationService: ConfirmDialogService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.firstNameFilterControl = new FormControl("");
    this.lastNameFilterControl = new FormControl("");
    this.emailFilterControl = new FormControl("");
    this.cuilFilterControl = new FormControl("");

    this.applyFilter();
    this.paginator.page.subscribe(() => {
      this.paginationOptions.page = this.paginator.pageIndex;
      this.paginationOptions.size = this.paginator.pageSize;
      this.applyFilter();
    });

    this.firstNameFilterControl
      .valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(value => {
          this.paginationOptions.addFilter("firstName", value);
          this.applyFilterAndReset();
        }
      );

    this.lastNameFilterControl
      .valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(value => {
          this.paginationOptions.addFilter("lastName", value);
          this.applyFilterAndReset();
        }
      );

    this.emailFilterControl
      .valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(value => {
          this.paginationOptions.addFilter("email", value);
          this.applyFilterAndReset();
        }
      );

    this.cuilFilterControl
      .valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(value => {
          this.paginationOptions.addFilter("cuil", value);
          this.applyFilterAndReset();
        }
      );
  }

  applyFilter() {
    this.ownerService
      .getPage(
        this.paginationOptions
      )
      .subscribe(page => {
        this.data.data = page.data;
        this.resultsLength = page.total;
      });
  }

  applyFilterAndReset() {
    // Reset paginator
    this.paginator.pageIndex = 0;
    // Reset query options
    this.paginationOptions.size = 5;
    this.paginationOptions.page = 0;
    this.applyFilter();
  }

  // Clear inputs
  isClearIconVisible(control: FormControl): boolean {
    if (control.value !== "") return true;
    else return false;
  }

  clearInputValue(control: FormControl) {
    control.patchValue("");
  }

  public gotoDetail(owner: Owner) {
    this.router.navigate(["home", "owners", "persons", owner.id]);
  }

  public create() {
    this.router.navigate(["home", "owners", "persons", "new"]);
  }

  showShovelText(shovelCost: number) {
    return shovelCost > 0 ? 'Si' : 'No';
  }

}
