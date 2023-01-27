import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getAuth } from 'firebase/auth';

import Donor from 'src/app/models/donor.model';
import { DonorService } from 'src/app/services/donor.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.css']
})
export class AddDonorComponent {

  donor: Donor = new Donor();
  submitted = false;

  user = getAuth();

  bloodtypes = [
    {value: "A+", name: "A RhD positive (A+)"},
    {value: "A-", name: "A RhD negative (A-)"},
    {value: "B+", name: "B RhD positive (B+)"},
    {value: "B-", name: "B RhD negative (B-)"},
    {value: "O+", name: "O RhD positive (O+)"},
    {value: "O-", name: "O RhD negative (O-)"},
    {value: "AB+", name: "AB RhD positive (AB+)"}
  ]



  constructor(
    private donorService: DonorService
  ) { }


  saveDonor(login :NgForm): void {
    this.donor.userId = this.user.currentUser?.uid;
    this.donorService.create(this.donor).then(() =>{
      Swal.fire('Done','saved with success','success');
      login.reset();
    })
  }

  newDonor(): void {
    this.submitted = false;
    this.donor = new Donor();
  }

}
