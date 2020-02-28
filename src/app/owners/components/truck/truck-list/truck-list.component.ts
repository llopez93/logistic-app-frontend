import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import Truck from "../../../../core/domain/security/user";
import {TruckService} from "../../../services/truck.service";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {Router} from "@angular/router";

import {Pageable} from "../../../../core/domain/pagination/pageable";
import {GlobalAppService} from "../../../../core/commons/service/global-app.service";
import {ConfirmDialogService} from "../../../../core/commons/service/confirm-dialog.service";

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  styleUrls: ['./truck-list.component.scss']
})
export class TruckListComponent implements OnInit {

  @ViewChild("paginator", {static: true})
  paginator: MatPaginator;
  @ViewChild(MatSort, {static: false})
  sort: MatSort;
  displayedColumns = ["name", "domain", "year", "model", "acciones"];
  data = new MatTableDataSource([]);
  paginationOptions: Pageable = new Pageable();
  resultsLength: number;

  // Filtros
  nameFilterControl: FormControl;
  domainFilterControl: FormControl;

  constructor(
    private readonly truckService: TruckService,
    private readonly appService: GlobalAppService,
    private readonly confirmationService: ConfirmDialogService,
    private readonly router: Router) {
  }

  ngOnInit() {
    this.nameFilterControl = new FormControl("");
    this.domainFilterControl = new FormControl("");

    this.applyFilter();

    this.paginator.page.subscribe(() => {
      this.paginationOptions.page = this.paginator.pageIndex + 1;
      this.paginationOptions.size = this.paginator.pageSize;
      this.applyFilter();
    });

    this.nameFilterControl
      .valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(value => {
        this.paginationOptions.addFilter("name", value);
          this.applyFilterAndReset();
        }
      );

    this.domainFilterControl
      .valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(value => {
          this.paginationOptions.addFilter("domain", value);
          this.applyFilterAndReset();
        }
      );
  }

  applyFilter() {
    this.truckService
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

  /*
    Clear inputs
  */
  isClearIconVisible(control: FormControl): boolean {
    if (control.value != "") return true;
    else return false;
  }

  clearInputValue(control: FormControl) {
    control.patchValue("");
  }

  public gotoDetail(truck: Truck) {
    this.router.navigate(["home", "owners", "trucks", truck.id]);
  }

  public create() {
    this.router.navigate(["home", "owners", "trucks", "new"]);
  }
}
