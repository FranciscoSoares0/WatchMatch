import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingCarrousselComponent } from './matching-carroussel.component';

describe('MatchingCarrousselComponent', () => {
  let component: MatchingCarrousselComponent;
  let fixture: ComponentFixture<MatchingCarrousselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchingCarrousselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchingCarrousselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
