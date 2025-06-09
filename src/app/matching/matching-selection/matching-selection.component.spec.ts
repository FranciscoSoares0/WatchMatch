import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingSelectionComponent } from './matching-selection.component';

describe('MatchingSelectionComponent', () => {
  let component: MatchingSelectionComponent;
  let fixture: ComponentFixture<MatchingSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchingSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
