import { TestBed } from '@angular/core/testing';

import { BeneficiaryResolver } from './beneficiary-resolver.service';

describe('BeneficiaryResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeneficiaryResolver = TestBed.get(BeneficiaryResolver);
    expect(service).toBeTruthy();
  });
});
