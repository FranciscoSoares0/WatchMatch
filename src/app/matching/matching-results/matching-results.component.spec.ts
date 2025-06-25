import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingResultsComponent } from './matching-results.component';

describe('MatchingResultsComponent', () => {
  let component: MatchingResultsComponent;
  let fixture: ComponentFixture<MatchingResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchingResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
