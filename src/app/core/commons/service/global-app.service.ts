import {Injectable} from "@angular/core";
import {MatPaginatorIntl} from "@angular/material";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {OverlayService} from "./overlay.service";


@Injectable()
export class GlobalAppService {
  private $msg = new Subject<Message>();

  private msg: Message = {};

  private loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly overlayService: OverlayService,
    private paginatorService: MatPaginatorIntl) {
    /*
    this.paginatorService.itemsPerPageLabel = "Items por página";
    this.paginatorService.nextPageLabel = "Siguiente";
    this.paginatorService.previousPageLabel = "Anterior";
    this.paginatorService.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length == 0 || pageSize == 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };

     */
  }

  public getMsgs(): Observable<Message> {
    return this.$msg.asObservable();
  }

  public sendMsg(severity: string, summary: string, detail: string) {
    this.msg = {severity: severity, summary: summary, detail: detail};
    this.$msg.next(this.msg);
  }

  public setLoading(loading: boolean) {
    this.overlayService.spin$.next(loading);
  }
}

export interface Message {
  severity?: string;
  summary?: string;
  detail?: string;
  id?: any;
  key?: string;
}
