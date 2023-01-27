import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { getAuth } from 'firebase/auth';
import Donor from '../models/donor.model';

@Injectable({
  providedIn: 'root'
})

export class DonorService {

  private dbPath = '/donors';

  donorsRef!: AngularFireList<Donor>;

  uid: any;


  constructor(private db: AngularFireDatabase) {
    this.uid = localStorage.getItem('uid');    
    this.donorsRef = db.list(this.dbPath,ref => {return ref.orderByChild('userId').equalTo(this.uid)});
  }

  getAll(): AngularFireList<Donor> {
    return this.donorsRef;
  }

  create(donor: Donor): any {
    return this.donorsRef.push(donor);
  }

  update(key: string, value: any):Promise<void> {
    return this.donorsRef.update(key, value);
  }


  delete(key: string): Promise<void> {
    return this.donorsRef.remove(key);
  }

  deleteAll():Promise<void> {
    return this.donorsRef.remove();
  }



}
