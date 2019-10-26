import { Component, OnInit, OnDestroy } from '@angular/core';
import { Relation } from '../relation.model';
import { RelationsService } from '../relations.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-relations-list',
  templateUrl: './relations-list.component.html',
  styleUrls: ['./relations-list.component.css']
})
export class RelationsListComponent implements OnInit, OnDestroy {

  relations: Relation[];
  subscribtion: Subscription;

  constructor(private relationsService: RelationsService) { }

  ngOnInit() {
    this.relations = this.relationsService.getAllRelations();
    this.subscribtion = this.relationsService.relationsChanged.subscribe(
      (rlationsList: Relation[]) => {
        this.relations = rlationsList;
      });
  }

  onRelationClick(index: number) {
    this.relationsService.relationEditing.next(index);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

}
