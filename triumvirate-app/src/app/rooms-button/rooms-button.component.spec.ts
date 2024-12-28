import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsButtonComponent } from './rooms-button.component';

describe('RoomsButtonComponent', () => {
  let component: RoomsButtonComponent;
  let fixture: ComponentFixture<RoomsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
