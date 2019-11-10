import { Injectable } from '@angular/core';
import { Relation } from './relation.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

@Injectable({
  providedIn: 'root'
})
export class RelationsService {

  relationsChanged = new Subject<void>();
  relationEditing = new Subject<number>();

  constructor(private http: HttpClient) { }

  getAllRelations() {

    return this.http.get<{[key: string]: Relation}>('https://budget-c0999.firebaseio.com/relations.json')
      .pipe(map(responseData => {
        const relationsArray: Relation[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            relationsArray.push({ ...responseData[key], id: key});
          }
        }
        return relationsArray;
      }));

  }

  findRelationByCode(relationCode: string): Promise<Relation> {
    
    var promise = new Promise<Relation>((resolve,reject) => {
      this.getAllRelations().subscribe( responseData => 
        resolve(responseData.find(r => r.code === relationCode)));
    });

    return promise;
  }


  findRelationByName(relationName: string): Promise<Relation> {

    var promise = new Promise<Relation>((resolve,reject) => {
      this.getAllRelations().subscribe( responseData => 
        resolve(responseData.find(r => r.name === relationName)));
    });

    return promise;
  }

  findRelationByIndex(relationIndex: number): Promise<Relation> {

    var promise = new Promise<Relation>((resolve,reject) => {
      this.getAllRelations().subscribe( responseData => 
        resolve(responseData[relationIndex]));
    });

    return promise;
  }

  addNewRelation(newRelation: Relation) {

    this.http.post<{code: string, name: string}>('https://budget-c0999.firebaseio.com/relations.json', newRelation)
      .subscribe(responseData => {
        console.log(responseData);
        this.relationsChanged.next();
      });

    // this.relations.push(newRelation);
    // this.relationsChanged.next(this.getAllRelations());
  }

  updateRelation(newRelation: Relation) {
    // const currentRelation = this.findRelationByCode(newRelation.code);
    // if (currentRelation) {
    //   currentRelation.name = newRelation.name;
    //   this.relationsChanged.next(this.getAllRelations());
    // }
  }

  deleteRelation(relationCode: string) {
    // const currentRelation = this.findRelationByCode(relationCode);
    // if (currentRelation) {
    //   const index = this.relations.indexOf(currentRelation);
    //   this.relations.splice(index, 1);
    //   this.relationsChanged.next(this.getAllRelations());
    // }
  }

}
