import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Beneficiary, BeneficiaryResolved } from './beneficiary.model';
import { BeneficiariesService } from './beneficiaries.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryResolver implements Resolve<Beneficiary> {

  constructor(private router: Router ,private beneficiariesService: BeneficiariesService) { }

  resolve(route: ActivatedRouteSnapshot
        , state: RouterStateSnapshot): Observable<BeneficiaryResolved> | Promise<BeneficiaryResolved> | BeneficiaryResolved {


          const code = route.paramMap.get('code');
          if (isNaN(+code)) {
            const message = `beneficiary code was not a number: ${code}`;
            console.error(message);
            return of({ beneficiary: null, error: message });
            }

            // return this.productService.getProduct(+id)
            // .pipe(
            //   map(product => ({ product: product })),
            //   catchError(error => {
            //     const message = `Retrieval error: ${error}`;
            //     console.error(message);
            //     return of({ product: null, error: message });
            //   })
            // );

            // https://stackoverflow.com/questions/43898934/how-to-handle-error-in-a-resolver

          this.router.navigate(['/']);

          return this.beneficiariesService
            .getBeneficiaryByCode(route.params.code);
        }
}
