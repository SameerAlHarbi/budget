import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Beneficiary } from '../beneficiary.model';

@Component({
  selector: 'app-beneficiary-details',
  templateUrl: './beneficiary-details.component.html',
  styleUrls: ['./beneficiary-details.component.css']
})
export class BeneficiaryDetailsComponent implements OnInit {

  beneficiaryItem: Beneficiary;
  errorMessage: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.data.subscribe(
      (data: Data) => {
        const resolvedData = data.beneficiaryResolved;
        this.beneficiaryItem = resolvedData.beneficiary;
        this.errorMessage = resolvedData.error;
      });

  }

}
