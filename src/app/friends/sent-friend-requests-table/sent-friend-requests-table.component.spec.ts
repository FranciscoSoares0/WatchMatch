import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentFriendRequestsTableComponent } from './sent-friend-requests-table.component';

describe('SentFriendRequestsTableComponent', () => {
  let component: SentFriendRequestsTableComponent;
  let fixture: ComponentFixture<SentFriendRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentFriendRequestsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentFriendRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
