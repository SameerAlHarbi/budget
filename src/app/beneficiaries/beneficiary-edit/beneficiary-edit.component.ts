import { Component, OnInit } from '@angular/core';
import { Beneficiary } from '../beneficiary.model';
import { BeneficiariesService } from '../beneficiaries.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Relation } from 'src/app/relations/relation.model';
import { RelationsService } from 'src/app/relations/relations.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-beneficiary-edit',
  templateUrl: './beneficiary-edit.component.html',
  styleUrls: ['./beneficiary-edit.component.css']
})
export class BeneficiaryEditComponent implements OnInit {

  editMode = false;
  editingItemIndex: number;
  editingItem: Beneficiary;

  relationsList: Relation[];
  relationsSubscription: Subscription;

  beneficiariesForm: FormGroup;

  constructor(private beneficiariesService: BeneficiariesService
            , private relationsService: RelationsService
            , private router: Router
            , private route: ActivatedRoute) { }

  ngOnInit() {
    this.relationsList = this.relationsService.getAllRelations();
    this.relationsSubscription = this.relationsService.relationsChanged.subscribe(
      (relations: Relation[]) => {
        this.relationsList = relations;
      });

    this.beneficiariesForm = new FormGroup({
        code: new FormControl('0099', Validators.required),
        name: new FormControl(null, Validators.required),
        relation: new FormControl('Brother', Validators.required),
        mobile: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email])
      });
  }

  onSubmit() {
    console.log(this.beneficiariesForm);
  }

}
