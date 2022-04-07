import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPresentationComponent } from './question-presentation.component';

describe('QuestionPresentationComponent', () => {
  let component: QuestionPresentationComponent;
  let fixture: ComponentFixture<QuestionPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
