import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryModalComponent } from './data-entry-modal.component';

describe('DataEntryModalComponent', () => {
  let component: DataEntryModalComponent;
  let fixture: ComponentFixture<DataEntryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataEntryModalComponent]
    });
    fixture = TestBed.createComponent(DataEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
