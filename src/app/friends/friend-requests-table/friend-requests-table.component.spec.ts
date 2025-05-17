import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendRequestsTableComponent } from './friend-requests-table.component';

describe('FriendRequestsTableComponent', () => {
  let component: FriendRequestsTableComponent;
  let fixture: ComponentFixture<FriendRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendRequestsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
