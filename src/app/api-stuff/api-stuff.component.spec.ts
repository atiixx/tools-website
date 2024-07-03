import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiStuffComponent } from './api-stuff.component';

describe('ApiStuffComponent', () => {
  let component: ApiStuffComponent;
  let fixture: ComponentFixture<ApiStuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiStuffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
