import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFriendFormComponent } from './add-friend-form.component';

describe('AddFriendFormComponent', () => {
  let component: AddFriendFormComponent;
  let fixture: ComponentFixture<AddFriendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFriendFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFriendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
