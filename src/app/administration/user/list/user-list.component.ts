import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import User from "../../../core/domain/security/user";
import {UserService} from "../../service/user.service";
import {AuthService} from "../../../core/security/service/auth.service";
import {PageRequest} from "../../../core/domain/pagination/page-request";
import {FormControl} from "@angular/forms";
import {Filter} from "../../../core/domain/pagination/filter";
import {Operators} from "../../../core/domain/pagination/operators";
import {debounceTime, filter} from "rxjs/operators";

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
  displayedColumns = ["lastname", "firstname", "email", "activado"];
  data = new MatTableDataSource([]);
  paginationOptions: PageRequest = new PageRequest();
  resultsLength: number;
  userLogged: User = new User();

  // Filtros
  lastNameFilterControl: FormControl;

  constructor(private readonly userService: UserService,
              private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.lastNameFilterControl = new FormControl("");
    this.authService.user.subscribe(value => this.userLogged = value);

    this.applyFilter();

    this.paginator.page.subscribe(() => {
      this.paginationOptions.page = this.paginator.pageIndex;
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

  public updateUser(user: User, event) {
    console.info("update del user");
    /**
     if (user.id !== this.userInID) {
      /**
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

    }
     */
  }

}
