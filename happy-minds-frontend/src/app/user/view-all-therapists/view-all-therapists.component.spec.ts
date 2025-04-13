import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllTherapistsComponent } from './view-all-therapists.component';

describe('ViewAllTherapistsComponent', () => {
  let component: ViewAllTherapistsComponent;
  let fixture: ComponentFixture<ViewAllTherapistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllTherapistsComponent]
    });
    fixture = TestBed.createComponent(ViewAllTherapistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
