import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Pageable} from "../../../core/domain/pagination/pageable";
import {FormControl} from "@angular/forms";
import {GlobalAppService} from "../../../core/commons/service/global-app.service";
import {SnackbarService} from "../../../core/service/snackbar.service";
import {ConfirmDialogService} from "../../../core/commons/service/confirm-dialog.service";
import {Router} from "@angular/router";
import {debounceTime} from "rxjs/operators";
import {ProviderService} from "../../service/provider.service";
import {Provider} from "../../../domain/provider";

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.scss']
})
export class ProviderListComponent implements OnInit {

  @ViewChild("paginator", {static: true})
  paginator: MatPaginator;
  @ViewChild(MatSort, {static: false})
  sort: MatSort;
  displayedColumns = ["name", "socialReason", "cuil", "email", "phone", "actions"];
  data = new MatTableDataSource([]);
  paginationOptions: Pageable = new Pageable();
  resultsLength: number;

  // Filtros
  nameFilterControl: FormControl;
  emailFilterControl: FormControl;
  socialReasonFilterControl: FormControl;
  cuilFilterControl: FormControl;

  constructor(private readonly providerService: ProviderService,
              private readonly appService: GlobalAppService,
              private readonly snackbarService: SnackbarService,
              private readonly confirmationService: ConfirmDialogService,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.nameFilterControl = new FormControl("");
    this.emailFilterControl = new FormControl("");
    this.socialReasonFilterControl = new FormControl("");
    this.cuilFilterControl = new FormControl("");

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

    this.socialReasonFilterControl
      .valueChanges
      .pipe(
        debounceTime(400)
      )
      .subscribe(value => {
          this.paginationOptions.addFilter("socialReason", value);
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
    this.providerService
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

  public gotoDetail(provider: Provider) {
    this.router.navigate(["home", "providers", provider.id]);
  }

  public create() {
    this.router.navigate(["home", "providers", "new"]);
  }

  showPhoneType(phoneType: string) {
    return phoneType !== "Sin definir";
  }

  delete(provider: Provider): void {
    this.confirmationService.showDialog({
      title: "Atención",
      message: "¿Está seguro que desea eliminar al proveedor?",
      icon: "warning",
      onAccept: () => {
        this.appService.setLoading(true);
        this.providerService.delete(provider).subscribe(value => {
          this.snackbarService.show({
            type: "success",
            title: "Operación exitosa",
            body: "El proveedor fue eliminado correctamente",
            duration: 1000
          });
          this.applyFilter();
        });
      }
    }, 400).subscribe(value => this.appService.setLoading(false));
  }

}
