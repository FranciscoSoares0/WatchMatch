import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageMatchingCarrousselComponent } from './homepage-matching-carroussel.component';

describe('HomepageMatchingCarrousselComponent', () => {
  let component: HomepageMatchingCarrousselComponent;
  let fixture: ComponentFixture<HomepageMatchingCarrousselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageMatchingCarrousselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageMatchingCarrousselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
