import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafiComponent } from './safi.component';

describe('SafiComponent', () => {
  let component: SafiComponent;
  let fixture: ComponentFixture<SafiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
