import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AashaAuthComponent } from './aasha-auth.component';

describe('AashaAuthComponent', () => {
  let component: AashaAuthComponent;
  let fixture: ComponentFixture<AashaAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AashaAuthComponent]
    });
    fixture = TestBed.createComponent(AashaAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
