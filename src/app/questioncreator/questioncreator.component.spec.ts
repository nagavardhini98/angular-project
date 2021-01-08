import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioncreatorComponent } from './questioncreator.component';

describe('QuestioncreatorComponent', () => {
  let component: QuestioncreatorComponent;
  let fixture: ComponentFixture<QuestioncreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestioncreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestioncreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
