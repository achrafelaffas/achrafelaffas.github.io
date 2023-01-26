import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import Donor from 'src/app/models/donor.model';
import { DonorService } from 'src/app/services/donor.service';

import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-donors-list',
  templateUrl: './donors-list.component.html',
  styleUrls: ['./donors-list.component.css']
})
export class DonorsListComponent implements OnInit {

  @ViewChild('myModalClose') modalClose: any;

  donors?: Donor[];
  currentDonor?: Donor;
  currentIndex = -1;
  title = '';

  constructor (
    private donoservice: DonorService,
  ) { }

  ngOnInit(): void {
    this.retrieveDonors();
  }


  refreshList(): void {
    this.currentDonor = undefined;
    this.currentIndex = -1;
    this.retrieveDonors();
    
  }


  retrieveDonors(): void {
    this.donoservice.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )).subscribe(data => {
      this.donors = data;
    });
  }


 
  setActiveDonor(donor: Donor, index: number): void {
    this.currentDonor = donor;
    this.currentIndex = index;
  }


  removeAllDonors(): void {
    this.donoservice.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

}
