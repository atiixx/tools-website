import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarvecalcComponent } from './carvecalc.component';

describe('CarvecalcComponent', () => {
  let component: CarvecalcComponent;
  let fixture: ComponentFixture<CarvecalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarvecalcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarvecalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
