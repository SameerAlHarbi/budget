import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationEditComponent } from './relation-edit.component';

describe('RelationEditComponent', () => {
  let component: RelationEditComponent;
  let fixture: ComponentFixture<RelationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
