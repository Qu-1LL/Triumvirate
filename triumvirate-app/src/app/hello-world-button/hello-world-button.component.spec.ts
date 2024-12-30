import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloWorldButtonComponent } from './hello-world-button.component';

describe('HelloWorldButtonComponent', () => {
  let component: HelloWorldButtonComponent;
  let fixture: ComponentFixture<HelloWorldButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloWorldButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloWorldButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
