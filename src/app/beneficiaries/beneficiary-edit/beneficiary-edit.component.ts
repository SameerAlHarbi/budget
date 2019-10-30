import { Component, OnInit } from '@angular/core';
import { Beneficiary } from '../beneficiary.model';
import { BeneficiariesService } from '../beneficiaries.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beneficiary-edit',
  templateUrl: './beneficiary-edit.component.html',
  styleUrls: ['./beneficiary-edit.component.css']
})
export class BeneficiaryEditComponent implements OnInit {

  editMode = false;
  editingItemIndex: number;
  editingItem: Beneficiary;

  constructor(private beneficiariesService: BeneficiariesService
    , private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit() {
    
  }

}
