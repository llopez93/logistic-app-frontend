import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Pageable} from "../../../core/domain/pagination/pageable";
import {FormControl} from "@angular/forms";
import {GlobalAppService} from "../../../core/commons/service/global-app.service";
import {ConfirmDialogService} from "../../../core/commons/service/confirm-dialog.service";
import {Router} from "@angular/router";
import {debounceTime} from "rxjs/operators";
import {ClientService} from "../../service/client.service";
import {Client} from "../../domain/client";
import {SnackbarService} from "../../../core/service/snackbar.service";

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
              private readonly snackbarService: SnackbarService,
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

  public gotoDetail(client: Client) {
    this.router.navigate(["home", "clients", client.id]);
  }

  public create() {
    this.router.navigate(["home", "clients", "new"]);
  }

  showPhoneType(phoneType: string) {
    return phoneType !== "Sin definir";
  }

  delete(client: Client): void {
    this.confirmationService.showDialog({
      title: "Atención",
      message: "¿Está seguro que desea eliminar el cliente?",
      icon: "warning",
      onAccept: () => {
        this.appService.setLoading(true);
        this.clientService.delete(client).subscribe(value => {
          this.snackbarService.show({
            type : "success",
            title : "Operación exitosa",
            body : "El cliente fue eliminado correctamente",
            duration: 1000
          });
          this.applyFilter();
        });
      }
    }, 400).subscribe(value => this.appService.setLoading(false));
  }

}
