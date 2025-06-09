import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowScoreComponent } from './show-score.component';

describe('ShowScoreComponent', () => {
  let component: ShowScoreComponent;
  let fixture: ComponentFixture<ShowScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
