import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLogsComponent } from './history-logs.component';

describe('HistoryLogsComponent', () => {
  let component: HistoryLogsComponent;
  let fixture: ComponentFixture<HistoryLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryLogsComponent]
    });
    fixture = TestBed.createComponent(HistoryLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
