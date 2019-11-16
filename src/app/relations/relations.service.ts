import { Injectable } from '@angular/core';
import { Relation } from './relation.model';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Timeouts } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class RelationsService {

  relationsChanged = new Subject<void>();
  relationEditing = new Subject<string>();

  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  getAllRelations() {

    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custome', 'key');
    return this.http
      .get<{[key: string]: Relation}>('https://budget-c0999.firebaseio.com/relations.json'
            , { headers: new HttpHeaders({'Custom-Header': 'hello'})
              // , params: new HttpParams().set('print', 'pretty')
              , params: searchParams })
      .pipe(map(responseData => {
        const relationsArray: Relation[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            relationsArray.push({ ...responseData[key], id: key});
          }
        }
        return relationsArray;
      }), catchError(errorRes => {
        // log error to somewere
        console.log(errorRes);
        return throwError(errorRes);
      }));
  }

  findRelationByCode(relationCode: string): Promise<Relation> {

    const promise = new Promise<Relation>((resolve, reject) => {
      this.getAllRelations().subscribe( responseData =>
        resolve(responseData.find(r => r.code === relationCode)));
    });

    return promise;
  }


  findRelationByName(relationName: string): Promise<Relation> {

    const promise = new Promise<Relation>((resolve, reject) => {
      this.getAllRelations().subscribe( responseData =>
        resolve(responseData.find(r => r.name === relationName)));
    });

    return promise;
  }

  addNewRelation(newRelation: Relation) {

    this.http
      .post<{code: string, name: string}>('https://budget-c0999.firebaseio.com/relations.json'
        , newRelation, {observe : 'response'})
      .subscribe(responseData => {
        console.log(responseData.body);
        this.relationsChanged.next();
      }, error => {
        this.error.next(error.message);
      });

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

  deleteAllRelations() {
    return this.http
      .delete('https://budget-c0999.firebaseio.com/relations.json'
        , {observe: 'events', responseType: 'json'})
      .pipe(tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Sent) {
          // ...
        } else if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      }))
      .subscribe(() => {
        this.relationsChanged.next();
      });
  }

}
