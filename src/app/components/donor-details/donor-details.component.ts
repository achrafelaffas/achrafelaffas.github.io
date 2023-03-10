import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Donor from 'src/app/models/donor.model';
import { DonorService } from 'src/app/services/donor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donor-details',
  templateUrl: './donor-details.component.html',
  styleUrls: ['./donor-details.component.css']
})
export class DonorDetailsComponent {

  router!: Router;
  @Input() donor?: Donor;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  
  currentDonor: Donor = {
    fname: '',
    lname: '',
    age: 1,
    bloodType: '',
    phone:1,
    address: '',
    sexe:''
    
  };


  
  sexeOptions = [
    {value: "male", name: "male"},
    {value: "female", name: "female"}
  ]



  bloodtypesOptions = [
    {value: "A+", name: "A RhD positive (A+)"},
    {value: "A-", name: "A RhD negative (A-)"},
    {value: "B+", name: "B RhD positive (B+)"},
    {value: "B-", name: "B RhD negative (B-)"},
    {value: "O+", name: "O RhD positive (O+)"},
    {value: "O-", name: "O RhD negative (O-)"},
    {value: "AB+", name: "AB RhD positive (AB+)"},
    {value: "AB-", name: "AB RhD negative (AB-)"}
  ]


  
 


  constructor (
    private donorService: DonorService
  ) { }

  
  ngOnInit(): void {

  }


  ngOnChanges(): void {
    this.currentDonor = { ...this.donor };
  }

  updateDonor(): void {
    const data = {
      fname: this.currentDonor.fname,
      lname: this.currentDonor.lname,
      age: this.currentDonor.age,
      bloodType: this.currentDonor.bloodType,
      phone: this.currentDonor.phone,
      address: this.currentDonor.address,
      sexe: this.currentDonor.sexe

    };

    if (this.currentDonor.key) {
      this.donorService.update(this.currentDonor.key, data)
        .then(() => Swal.fire('Done', 'The donor was updated successfully!', 'success'))
        .catch(err => console.log(err));
    }
  }

  deleteDonor(): void {
    this.confirmBox();
    
  }


  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        if (this.currentDonor.key) {
          this.donorService.delete(this.currentDonor.key)
            .then(() => {
              this.refreshList.emit();
              this.router.navigate(['dashboard/donors']);
            })
            .catch(err => console.log(err));
        }
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

}
