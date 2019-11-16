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

  relations: Relation[] = [];
  subscribtion: Subscription;
  isFetching = false;
  error: string;

  constructor(private relationsService: RelationsService) { }

  ngOnInit() {

    this.refreshData();

    this.subscribtion = this.relationsService
      .relationsChanged.subscribe(() => this.refreshData());
  }

  refreshData() {

    this.isFetching = true;
    this.relationsService
      .getAllRelations()
      .subscribe( responseData => {
        this.relations = responseData;
        this.isFetching = false;
      }, error => {
        this.error=error.message;
        console.log(error);
      });

  }

  onRelationClick(code: string) {
    this.relationsService.relationEditing.next(code);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

}
