import { Component, OnInit } from '@angular/core';
import { DonorService } from 'src/app/services/donor.service';

import { map } from 'rxjs/operators';
import Donor from 'src/app/models/donor.model';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  WomenDonors: any=[];
  MenDonors: any=[];
  donors: any=[];
  MPP: any=[];
  WPP: any=[];


  public chart: any;


  aPlus!: number;
  aMinus!: number;
  bPlus!: number;
  bMinus!: number;
  oPlus!: number;
  oMinus!: number;
  abPlus!: number;
  abMinus!: number;




  constructor(private donoservice: DonorService) {}
  ngOnInit(): void {
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
      this.WomenDonors = data.filter(this.female)
      this.MenDonors = data.filter(this.male)
      this.MPP = (this.MenDonors.length*100)/this.donors.length
      this.WPP = (this.WomenDonors.length*100)/this.donors.length

      this.aPlus = data.filter(this.APlus).length;
      this.aMinus = data.filter(this.AMinus).length;
      this.bPlus = data.filter(this.BPlus).length;
      this.bMinus = data.filter(this.BMinus).length;
      this.oPlus = data.filter(this.OPlus).length;
      this.oMinus = data.filter(this.OMinus).length;
      this.abPlus = data.filter(this.ABPlus).length;
      this.abMinus = data.filter(this.ABMinus).length;

      this.chart = new Chart("MyChart", {
        type: 'bar',
  
        data: {
          labels: [
                    'positive (A+)',
                    'negative (A-)',
                    'positive (B+)',
                    'negative (B-)', 
                    'positive (O+)',
                    'negative (O-)',
                    'positive (AB+)',
                    'negative (AB-)' 
                  ], 
           datasets: [
            {
              label: "Count",
              data: [ this.aPlus,this.aMinus,this.bPlus,this.bMinus,this.oPlus,this.oMinus,this.abPlus,this.abMinus],
              backgroundColor: [
                '#ff6384',
                '#36a2eb',
                '#cc65fe',
                '#ffce56',
                '#1ABC9C',
                '#CD6155',
                '#99DC33',
                '#33DCCB'
              ]
            },
          ]
        },
        options: {
          aspectRatio:2.5
        }
        
      });


    });

  }


  female(element: Donor) { return (element.sexe == "female");} 
  male(element: Donor) { return (element.sexe == "male");}
  APlus(element: Donor) { return (element.bloodType == "A+");}
  AMinus(element: Donor) { return (element.bloodType == "A-");}
  BPlus(element: Donor) { return (element.bloodType == "B+");}
  BMinus(element: Donor) { return (element.bloodType == "B-");}
  OPlus(element: Donor) { return (element.bloodType == "O+");}
  OMinus(element: Donor) { return (element.bloodType == "O-");}
  ABPlus(element: Donor) { return (element.bloodType == "AB+");}
  ABMinus(element: Donor) { return (element.bloodType == "AB-");} 


}
