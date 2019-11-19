import { Injectable } from '@angular/core';
import { Beneficiary } from './beneficiary.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {

  // beneficiariesList: Beneficiary[] = [
  //   new Beneficiary('001', 'رامي', 'أخ'),
  //   new Beneficiary('002', 'سامر', 'أخت')
  //   ];

  beneficiariesList: Beneficiary[] = [];

  beneficiariesListChanged = new Subject<Beneficiary[]>();

  constructor() { }

  setBeneficiariesData(beneficiariesData: Beneficiary[]) {
    this.beneficiariesList = beneficiariesData;
    this.beneficiariesListChanged.next(this.beneficiariesList.slice());
  }

  getAllBeneficiaries() {
    return this.beneficiariesList.slice();
  }

  getBeneficiaryByCode(code: string) {
    return this.beneficiariesList.find(b => b.code === code);
  }

  getBeneficiaryByCodeAsync(code: string): Promise<Beneficiary> {

    const promise = new Promise<Beneficiary>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.beneficiariesList.find(b => b.code === code));
      }, 3000);
    });

    return promise;
  }

  getBeneficiaryByIndex(index: number) {
    return this.beneficiariesList[index];
  }

  getBeneficiariesByName(name: string) {
    return this.beneficiariesList.filter(b => b.name.includes(name));
  }

  getBeneficiariesByRelation(relation: string) {
    return this.beneficiariesList.filter(b => b.relation === relation);
  }

  addNewBeneficiary(newBeneficiary: Beneficiary) {
    this.beneficiariesList.push(newBeneficiary);
    this.beneficiariesListChanged.next(this.getAllBeneficiaries());
  }

  updateBeneficiary(newBeneficiary: Beneficiary) {
    const currentBeneficiary = this.getBeneficiaryByCode(newBeneficiary.code);
    if (currentBeneficiary) {
      currentBeneficiary.name = newBeneficiary.name;
      currentBeneficiary.relation = newBeneficiary.relation;
      currentBeneficiary.mobile = newBeneficiary.mobile;
      currentBeneficiary.email = newBeneficiary.email;
      this.beneficiariesListChanged.next(this.getAllBeneficiaries());
    }
  }

  deleteBeneficiary(code: string) {
    const currentBeneficiary = this.getBeneficiaryByCode(code);
    if (currentBeneficiary) {
      const index = this.beneficiariesList.indexOf(currentBeneficiary);
      this.beneficiariesList.splice(index, 1);
      this.beneficiariesListChanged.next(this.beneficiariesList);
    }
  }

}
