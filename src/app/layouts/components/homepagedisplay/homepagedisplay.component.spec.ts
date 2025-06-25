import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagedisplayComponent } from './homepagedisplay.component';

describe('HomepagedisplayComponent', () => {
  let component: HomepagedisplayComponent;
  let fixture: ComponentFixture<HomepagedisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepagedisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepagedisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
