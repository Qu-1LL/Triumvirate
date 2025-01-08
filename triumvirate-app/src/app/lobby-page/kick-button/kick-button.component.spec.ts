import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KickButtonComponent } from './kick-button.component';

describe('KickButtonComponent', () => {
  let component: KickButtonComponent;
  let fixture: ComponentFixture<KickButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KickButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KickButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
