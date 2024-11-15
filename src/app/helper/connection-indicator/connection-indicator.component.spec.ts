import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionIndicatorComponent } from './connection-indicator.component';

describe('ConnectionIndicatorComponent', () => {
  let component: ConnectionIndicatorComponent;
  let fixture: ComponentFixture<ConnectionIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
