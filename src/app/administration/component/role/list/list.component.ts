import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Pageable} from "../../../../core/domain/pagination/pageable";
import {FormControl} from "@angular/forms";
import {AuthService} from "../../../../core/security/service/auth.service";
import {GlobalAppService} from "../../../../core/commons/service/global-app.service";
import {ConfirmDialogService} from "../../../../core/commons/service/confirm-dialog.service";
import {Router} from "@angular/router";
import {debounceTime} from "rxjs/operators";
import {RoleService} from "../../../service/role.service";
import {Role} from "../../../../core/domain/security/role";

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class RoleListComponent implements OnInit {

  @ViewChild("paginator", {static: true})
  paginator: MatPaginator;
  @ViewChild(MatSort, {static: false})
  sort: MatSort;
  displayedColumns = ["id", "name", "acciones"];
  data = new MatTableDataSource([]);
  paginationOptions: Pageable = new Pageable();
  resultsLength: number;

  // Filtros
  nameFilterControl: FormControl;

  constructor(private readonly roleService: RoleService,
              private readonly appService: GlobalAppService,
              private readonly confirmationService: ConfirmDialogService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.nameFilterControl = new FormControl("");
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

  }

  applyFilter() {
    this.roleService
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

  public gotoDetail(role: Role) {
    this.router.navigate(["home", "administration", "roles", role.id]);
  }

  public create() {
    this.router.navigate(["home", "administration", "roles", "new"]);
  }
}
