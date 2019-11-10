import { Component, OnInit, OnDestroy } from '@angular/core';
import { Beneficiary } from '../beneficiary.model';
import { BeneficiariesService } from '../beneficiaries.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beneficiaries-list',
  templateUrl: './beneficiaries-list.component.html',
  styleUrls: ['./beneficiaries-list.component.css']
})
export class BeneficiariesListComponent implements OnInit, OnDestroy {

  beneficiariesList: Beneficiary[];
  subscribtion: Subscription;
  editCode = '0';

  constructor(private beneficiariesService: BeneficiariesService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.beneficiariesList = this.beneficiariesService.getAllBeneficiaries();
    this.subscribtion = this.beneficiariesService
      .beneficiariesListChanged.subscribe(
        (beneficiaries: Beneficiary[]) => {
          this.beneficiariesList = beneficiaries;
        });
  }

  onNewBeneficiary() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  onEdit(code: string) {
    this.editCode = code;
  }

}
