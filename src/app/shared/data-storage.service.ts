import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BeneficiariesService } from '../beneficiaries/beneficiaries.service';
import { Beneficiary } from '../beneficiaries/beneficiary.model';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private http: HttpClient, private beneficiariesService: BeneficiariesService) { }

    storeBeneficiaries() {
        const beneficiaries = this.beneficiariesService.getAllBeneficiaries();
        this.http.put('https://budget-c0999.firebaseio.com/beneficiaries.json', beneficiaries)
            .subscribe(response => {
                console.log(response);
            }, error => {
                console.log(error.message);
            });
    }

    fetchBeneficiaries() {
        return this.http.get<Beneficiary[]>('https://budget-c0999.firebaseio.com/beneficiaries.json')
        .pipe(map(responseData => {
            return responseData.map(beneficiary => {
                // return {...beneficiary, accounts: beneficiary.accounst ? beneficiary.account : []}
                return beneficiary;
            });
        }),
        tap(responseDate => {
            this.beneficiariesService.setBeneficiariesData(responseDate);
            console.log(responseDate);
        }));
    }

}
