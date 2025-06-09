import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarousselSkeletonLoaderComponent } from './caroussel-skeleton-loader.component';

describe('CarousselSkeletonLoaderComponent', () => {
  let component: CarousselSkeletonLoaderComponent;
  let fixture: ComponentFixture<CarousselSkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarousselSkeletonLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarousselSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
