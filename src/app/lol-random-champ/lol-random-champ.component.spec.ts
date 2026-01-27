import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LolRandomChampComponent } from './lol-random-champ.component';

describe('LolRandomChampComponent', () => {
  let component: LolRandomChampComponent;
  let fixture: ComponentFixture<LolRandomChampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LolRandomChampComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LolRandomChampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
