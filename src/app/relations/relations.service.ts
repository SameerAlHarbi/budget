import { Injectable } from '@angular/core';
import { Relation } from './relation.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelationsService {

  relations: Relation[] = [
    new Relation('001', 'Father'),
    new Relation('002', 'Mother'),
    new Relation('003', 'Brother'),
    new Relation('004', 'Sister'),
    new Relation('005', 'Wife')
  ];

  relationsChanged = new Subject<Relation[]>();
  relationEditing = new Subject<number>();

  constructor() { }

  getAllRelations() {
    return this.relations.slice();
  }

  findRelationByCode(relationCode: string) {
    return this.relations.find(r => r.code === relationCode);
  }

  findRelationByName(relationName: string) {
    return this.relations.find(r => r.name === relationName);
  }

  findRelationByIndex(relationIndex: number) {
    return this.relations[relationIndex];
  }

  addNewRelation(newRelation: Relation) {
    this.relations.push(newRelation);
    this.relationsChanged.next(this.getAllRelations());
  }

  updateRelation(newRelation: Relation) {
    const currentRelation = this.findRelationByCode(newRelation.code);
    if (currentRelation) {
      currentRelation.name = newRelation.name;
      this.relationsChanged.next(this.getAllRelations());
    }
  }

  deleteRelation(relationCode: string) {
    const currentRelation = this.findRelationByCode(relationCode);
    if (currentRelation) {
      const index = this.relations.indexOf(currentRelation);
      this.relations.splice(index, 1);
      this.relationsChanged.next(this.getAllRelations());
    }
  }

}
