import { Injectable } from '@angular/core';
import {AreaOfInterest} from "../domain/area-of-interest";
import {GenericService} from "../../core/service/generic.service";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class AreaOfInterestService extends GenericService<AreaOfInterest> {

  private addressUrl = "/area-of-interest";

  constructor(protected http: HttpClient) {
    super(http);
  }


  protected valueToEntity(value: any): AreaOfInterest {
    return new AreaOfInterest(value);
  }

  protected getResourcePath(): string {
    return this.addressUrl;
  }



}
