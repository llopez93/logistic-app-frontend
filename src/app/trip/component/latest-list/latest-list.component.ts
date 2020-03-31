import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {TripService} from "../../service/trip.service";

@Component({
  selector: 'app-latest-list',
  templateUrl: './latest-list.component.html',
  styleUrls: ['./latest-list.component.scss']
})
export class LatestListComponent implements OnInit {

  displayedColumns = ["client", "truck", "material", "date", "user"];
  tableDataSource = new MatTableDataSource([]);

  constructor(private readonly tripService: TripService) {
  }

  ngOnInit() {
    this.tripService.findLatestsTrips().subscribe(trips => this.tableDataSource.data = trips);
  }

  //TODO: Mostrar la fecha usando Moment

}
