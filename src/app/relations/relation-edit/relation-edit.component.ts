import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Relation } from '../relation.model';
import { Subscription } from 'rxjs';
import { RelationsService } from '../relations.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-relation-edit',
  templateUrl: './relation-edit.component.html',
  styleUrls: ['./relation-edit.component.css']
})
export class RelationEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) form: NgForm;
  @ViewChild('nameInput', {static: false}) nameInput: ElementRef;

  editMode = false;
  editingItemCode: string;
  editingItem: Relation;

  subscribtion: Subscription;
  errorSub: Subscription;

  error: string;

  constructor(private relationsService: RelationsService) { }

  ngOnInit() {
    this.subscribtion = this.relationsService
      .relationEditing.subscribe(
        (itemCode: string) => {
          this.editMode = true;
          this.editingItemCode = itemCode;
          this.relationsService
            .findRelationByCode(this.editingItemCode)
            .then((relation: Relation) => {
              this.editingItem = relation;
              this.form.setValue({
                code: this.editingItem.code ,
                name: this.editingItem.name
              });
              this.nameInput.nativeElement.focus();
            });
        });

    this.errorSub = this.relationsService
          .error.subscribe(errorMessage => {
            this.error = errorMessage;
          });
      }

  onSubmit() {
    const value = this.form.value;
    const newRelation = new Relation('0', value.code, value.name);
    if (this.editMode) {
      this.relationsService.updateRelation(newRelation);
    } else {
      this.relationsService.addNewRelation(newRelation);
    }
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    if (!confirm('هل أنت متأكد من حذف العلاقة ؟')) {
      return;
    }
    this.relationsService.deleteRelation(this.editingItem.code);
    this.onClear();
  }

  onClear() {
    this.form.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
    this.errorSub.unsubscribe();
  }

}
