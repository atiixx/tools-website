import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterHunterComponent } from './monster-hunter.component';

describe('MonsterHunterComponent', () => {
  let component: MonsterHunterComponent;
  let fixture: ComponentFixture<MonsterHunterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonsterHunterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonsterHunterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
