import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { getAuth } from 'firebase/auth';

import Donor from 'src/app/models/donor.model';
import { DonorService } from 'src/app/services/donor.service';
import Swal from 'sweetalert2';

import { AgeValidator } from './age.validator';


@Component({
  selector: 'app-add-donor',
  templateUrl: './add-donor.component.html',
  styleUrls: ['./add-donor.component.css']
})
export class AddDonorComponent {

  isSubmitted = false;
  donor: Donor = new Donor();
  submitted = false;
  public addForm!: FormGroup;
  user = getAuth();

  bloodtypes = [
    {value: "A+", name: "A RhD positive (A+)"},
    {value: "A-", name: "A RhD negative (A-)"},
    {value: "B+", name: "B RhD positive (B+)"},
    {value: "B-", name: "B RhD negative (B-)"},
    {value: "O+", name: "O RhD positive (O+)"},
    {value: "O-", name: "O RhD negative (O-)"},
    {value: "AB+", name: "AB RhD positive (AB+)"},
    {value: "AB-", name: "AB RhD negative (AB-)"}
  ]

  ngOnInit() {}


  constructor(private donorService: DonorService, formBuilder: FormBuilder)
  {

    this.addForm = formBuilder.group({
      fname: ['',[Validators.minLength(3),Validators.required,Validators.pattern('[a-zA-Z]+$')]],
      lname: ['',[Validators.minLength(3),Validators.required,Validators.pattern('[a-zA-Z]+$')]],
      phone: ['',[Validators.required,Validators.pattern('^((\\+212-?)|0)?[0-9]{10}$')]],
      sexe: ['',[Validators.required]],
      age: ['',[Validators.required,AgeValidator]],
    })

  }

  get fn() { return this.addForm.controls }
  get ln() { return this.addForm.controls }
  get phone() { return this.addForm.controls }
  get age() { return this.addForm.get('age') }
  get agee() {return this.addForm.controls}
  get sexe() {return this.addForm.controls}


  saveDonor(login: any): void {
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

