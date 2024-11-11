import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeGuessingComponent } from './age-guessing.component';

describe('AgeGuessingComponent', () => {
  let component: AgeGuessingComponent;
  let fixture: ComponentFixture<AgeGuessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeGuessingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeGuessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
