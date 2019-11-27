import { Injectable } from '@angular/core';
import { Relation } from './relation.model';
import { Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';


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

      this.getAllRelations().subscribe(responseData => {

        if (!responseData) {
          reject(new Error('Not Found'));
        }

        const relationItem = responseData.find(r => r.code === relationCode);

        if (relationItem) {
          resolve(relationItem);
        } else {
          reject(new Error('Not Found'));
        }
      }, errorRes => {
        reject(new Error(errorRes.message));
      });
    });

    return promise;

    }

  findRelationByName(relationName: string): Promise<Relation> {

    const promise = new Promise<Relation>((resolve, reject) => {

      this.getAllRelations().subscribe(responseData => {

        if (!responseData) {
          reject(new Error('Not Found'));
        }

        const relationItem = responseData.find(r => r.code === relationName);

        if (relationItem) {
          resolve(relationItem);
        } else {
          reject(new Error('Not Found'));
        }
      }, errorRes => {
        reject(new Error(errorRes.message));
      });
    });

    return promise;
  }

  addNewRelation(newRelation: Relation) {

    this.http
      .post<{code: string, name: string}>('https://budget-c0999.firebaseio.com/relations.json'
        , {code: newRelation.code, name: newRelation.name}, {observe : 'response'})
      .subscribe(responseData => {
        console.log(responseData.body);
        this.relationsChanged.next();
      }, error => {
        this.error.next(error.message);
      });

  }

  updateRelation(newRelation: Relation) {

    this.findRelationByCode(newRelation.code).then(currentRelation => {

      if (!currentRelation) {
        return;
      }

      currentRelation.name = newRelation.name;
      currentRelation.code = newRelation.code;

      this.http.patch<{code: string, name: string}>('https://budget-c0999.firebaseio.com/relations/' + currentRelation.id + '.json',
        {code: currentRelation.code, name: currentRelation.name}, {observe: 'body'})
        .subscribe(responseBody => {
          console.log(responseBody);
          this.relationsChanged.next();
        }, error => {
          this.error.next(error.message);
        });

    }).catch((reason: Error) => {

      console.log(reason.message);
      return ;
    });
  }

  async deleteRelation(relationCode: string) {

    try {

      const currentRelation = await this.findRelationByCode(relationCode);

    } catch (e) {
      console.log(e);
      return;
    }
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
