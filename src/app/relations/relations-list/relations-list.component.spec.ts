import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationsListComponent } from './relations-list.component';

describe('RelationsListComponent', () => {
  let component: RelationsListComponent;
  let fixture: ComponentFixture<RelationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
