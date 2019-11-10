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
  editingItemIndex: number;
  editingItem: Relation;

  subscribtion: Subscription;

  constructor(private relationsService: RelationsService) { }

  ngOnInit() {
    // this.subscribtion = this.relationsService
    //   .relationEditing.subscribe(
    //     (itemIndex: number) => {
    //       this.editMode = true;
    //       this.editingItemIndex = itemIndex;
    //       this.editingItem = this.relationsService
    //         .findRelationByIndex(this.editingItemIndex);
    //       this.form.setValue({
    //           code: this.editingItem.code ,
    //           name: this.editingItem.name
    //         });
    //       this.nameInput.nativeElement.focus();
    //     });
  }

  onSubmit() {
    const value = this.form.value;
    const newRelation = new Relation('0',value.code, value.name);
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
  }

}
