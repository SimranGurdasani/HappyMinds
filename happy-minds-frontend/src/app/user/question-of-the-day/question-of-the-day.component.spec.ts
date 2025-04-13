import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionOfTheDayComponent } from './question-of-the-day.component';

describe('QuestionOfTheDayComponent', () => {
  let component: QuestionOfTheDayComponent;
  let fixture: ComponentFixture<QuestionOfTheDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionOfTheDayComponent]
    });
    fixture = TestBed.createComponent(QuestionOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
