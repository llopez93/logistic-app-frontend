import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import User from "../../../core/domain/security/user";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../../core/security/service/auth.service";
import {PageRequest} from "../../../core/domain/pagination/page-request";
import {FormControl} from "@angular/forms";
import {Filter} from "../../../core/domain/pagination/filter";
import {Operators} from "../../../core/domain/pagination/operators";
import {debounceTime} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild("paginator", {static: true})
  paginator: MatPaginator;
  @ViewChild(MatSort, {static: false})
  sort: MatSort;
  displayedColumns = ["lastname", "firstname", "email", "activado", "acciones"];
  data = new MatTableDataSource([]);
  paginationOptions: PageRequest = new PageRequest();
  resultsLength: number;
  userLogged: User = new User();

  // Filtros
  lastNameFilterControl: FormControl;
  firstNameFilterControl: FormControl;
  emailNameFilterControl: FormControl;

  constructor(private readonly userService: UserService,
              private readonly authService: AuthService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.lastNameFilterControl = new FormControl("");
    this.firstNameFilterControl = new FormControl("");
    this.emailNameFilterControl = new FormControl("");

    this.authService.user.subscribe(value => this.userLogged = value);

    this.applyFilter();

    this.paginator.page.subscribe(() => {
      this.paginationOptions.page = this.paginator.pageIndex + 1;
      this.paginationOptions.limit = this.paginator.pageSize;
      this.applyFilter();
    });

    this.lastNameFilterControl
      .valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(value => {
          this.paginationOptions.addFilter(new Filter("lastName", Operators.CONTAINS, value));
          this.applyFilterAndReset();
        }
      );

    this.firstNameFilterControl
      .valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(value => {
          this.paginationOptions.addFilter(new Filter("firstName", Operators.CONTAINS, value));
          this.applyFilterAndReset();
        }
      );

    this.emailNameFilterControl
      .valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(value => {
          this.paginationOptions.addFilter(new Filter("email", Operators.CONTAINS, value));
          this.applyFilterAndReset();
        }
      );
  }

  applyFilter() {
    this.userService
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
    this.paginationOptions.limit = 5;
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

  public gotoDetail(user: User) {
    this.router.navigate(["home", "administration", "users", user.id]);
  }

  public create(user: User) {
    this.router.navigate(["home", "administration", "users", "new"]);
  }

  resetPass(u: User): void {
    console.log("Reset pass....");
  }

}
