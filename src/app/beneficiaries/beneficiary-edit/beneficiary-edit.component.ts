import { Component, OnInit } from '@angular/core';
import { Beneficiary } from '../beneficiary.model';
import { BeneficiariesService } from '../beneficiaries.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Relation } from 'src/app/relations/relation.model';
import { RelationsService } from 'src/app/relations/relations.service';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-beneficiary-edit',
  templateUrl: './beneficiary-edit.component.html',
  styleUrls: ['./beneficiary-edit.component.css']
})
export class BeneficiaryEditComponent implements OnInit {

  editMode = false;
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

    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params.code != null;
        if (this.editMode) {
          this.editingItem = this.beneficiariesService
            .getBeneficiaryByCode(params.code);
        }
        this.initForm();
      });

  }

  initForm() {

    if (!this.editMode) {
      this.editingItem = new Beneficiary(null, null, null, null, null);
    }

    this.beneficiariesForm = new FormGroup({
      code: new FormControl(this.editingItem.code, [Validators.required,
        Validators.pattern(/^\d{3}$/), this.validCode.bind(this)], this.dublicateCode.bind(this)),
      name: new FormControl(this.editingItem.name, Validators.required),
      relation: new FormControl(this.editingItem.relation, Validators.required),
      mobile: new FormControl(this.editingItem.mobile, Validators.required),
      email: new FormControl(this.editingItem.email, [Validators.required, Validators.email])
    });

  }

  get beneficiaryCodeControl() {
    return this.beneficiariesForm.get('code');
  }

  validCode(control: FormControl): { [s: string]: boolean} {
    if (control.value === '000') {
      return { invalidCode : true};
    }
    return null;
  }

  dublicateCode(control: FormControl): Promise<any> | Observable<any> {

    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (this.beneficiariesService.getBeneficiaryByCode(control.value)) {
          resolve({codeIsDuplicate: true});
        }
        resolve(null);
      }, 5000);
    });

    return promise;
  }

  onSubmit() {
    console.log(this.beneficiariesForm);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
