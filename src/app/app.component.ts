import {Component, OnInit} from '@angular/core';
import {SnackbarService} from "./core/service/snackbar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'fiscalia';

  constructor(private snackbarService: SnackbarService) {

  }


  ngOnInit(): void {
    this.snackbarService.show({
      title: "Permisos Insuficientes",
      body: `Usted no posee los permisos necesarios para realizar la acción solicitada. 
                            Si desea contar con dichos permisos póngase en contacto con el administrador del sistema`,
      type: 'success'});
  }

}
