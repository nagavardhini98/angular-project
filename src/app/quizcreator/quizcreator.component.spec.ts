import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizcreatorComponent } from './quizcreator.component';

describe('QuizcreatorComponent', () => {
  let component: QuizcreatorComponent;
  let fixture: ComponentFixture<QuizcreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizcreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
