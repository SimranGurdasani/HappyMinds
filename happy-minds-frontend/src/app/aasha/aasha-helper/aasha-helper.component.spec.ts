import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AashaHelperComponent } from './aasha-helper.component';

describe('AashaHelperComponent', () => {
  let component: AashaHelperComponent;
  let fixture: ComponentFixture<AashaHelperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AashaHelperComponent]
    });
    fixture = TestBed.createComponent(AashaHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
