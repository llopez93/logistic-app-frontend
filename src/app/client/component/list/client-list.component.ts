import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Pageable} from "../../../core/domain/pagination/pageable";
import User from "../../../core/domain/security/user";
import {FormControl} from "@angular/forms";
import {GlobalAppService} from "../../../core/commons/service/global-app.service";
import {ConfirmDialogService} from "../../../core/commons/service/confirm-dialog.service";
import {Router} from "@angular/router";
import {debounceTime} from "rxjs/operators";
import {ClientService} from "../../service/client.service";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  @ViewChild("paginator", {static: true})
  paginator: MatPaginator;
  @ViewChild(MatSort, {static: false})
  sort: MatSort;
  displayedColumns = ["name", "email", "phone", "actions"];
  data = new MatTableDataSource([]);
  paginationOptions: Pageable = new Pageable();
  resultsLength: number;

  // Filtros
  nameFilterControl: FormControl;
  emailFilterControl: FormControl;

  constructor(private readonly clientService: ClientService,
              private readonly appService: GlobalAppService,
              private readonly confirmationService: ConfirmDialogService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.nameFilterControl = new FormControl("");
    this.emailFilterControl = new FormControl("");

    this.applyFilter();
    this.paginator.page.subscribe(() => {
      this.paginationOptions.page = this.paginator.pageIndex;
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
  }

  applyFilter() {
    this.clientService
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
    if (control.value !== "") return true;
    else return false;
  }

  clearInputValue(control: FormControl) {
    control.patchValue("");
  }

  public gotoDetail(user: User) {
    this.router.navigate(["home", "clients", user.id]);
  }

  public create() {
    this.router.navigate(["home", "clients", "new"]);
  }

  showPhoneType(phoneType: string) {
    return phoneType !== "Sin definir";
  }

}
