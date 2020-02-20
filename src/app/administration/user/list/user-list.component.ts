import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import User from "../../../core/domain/security/user";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../../core/security/service/auth.service";
import {FormControl} from "@angular/forms";
import {debounceTime} from "rxjs/operators";
import {Router} from "@angular/router";
import {Pageable} from "../../../core/domain/pagination/pageable";
import {GlobalAppService} from "../../../core/commons/service/global-app.service";

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
  paginationOptions: Pageable = new Pageable();
  resultsLength: number;
  userLogged: User = new User();

  // Filtros
  lastNameFilterControl: FormControl;
  firstNameFilterControl: FormControl;
  emailNameFilterControl: FormControl;

  constructor(private readonly userService: UserService,
              private readonly authService: AuthService,
              private readonly appService: GlobalAppService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.lastNameFilterControl = new FormControl("");
    this.firstNameFilterControl = new FormControl("");
    this.emailNameFilterControl = new FormControl("");

    this.authService.user.subscribe(value => this.userLogged = value);

    this.applyFilter();

    this.paginator.page.subscribe(() => {
      this.paginationOptions.page = this.paginator.pageIndex;
      this.paginationOptions.size = this.paginator.pageSize;
      this.applyFilter();
    });

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

    this.emailNameFilterControl
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
    this.userService
      .getPage(
        this.paginationOptions
      )
      .subscribe(page => {
        console.log(this.paginationOptions);
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

  public gotoDetail(user: User) {
    this.router.navigate(["home", "administration", "users", user.id]);
  }

  public create(user: User) {
    this.router.navigate(["home", "administration", "users", "new"]);
  }

  resetPass(u: User): void {
    console.log("Reset pass....");
  }

  public updateUser(user: User, event) {
    // TODO: Agregar confirmación
    if (user.id !== this.userLogged.id) {
      user.enabled = !user.enabled;
      this.appService.setLoading(true);
      this.userService.update(user).subscribe(value => {
        this.appService.setLoading(false);
        this.applyFilter();
      });
    }
    /*
    this.confirmationService.confirm({
      message: "Está seguro que desea cambiar el valor?",
      icon: "fa ui-icon-warning",
      accept: () => {
        this.appService.setLoading(true);
        this.userService.update(user).subscribe(() => {
          this.applyFilter();
          this.appService.setLoading(false);
        });
      },
      reject: () => {
        user.enabled = !user.enabled;
      }
    });
  }*/
  }


}
