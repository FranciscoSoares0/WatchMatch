import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingSubmittedChoicesComponent } from './matching-submitted-choices.component';

describe('MatchingSubmittedChoicesComponent', () => {
  let component: MatchingSubmittedChoicesComponent;
  let fixture: ComponentFixture<MatchingSubmittedChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingSubmittedChoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchingSubmittedChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
