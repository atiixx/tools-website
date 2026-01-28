import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampListitemComponent } from './champ-listitem.component';

describe('ChampListitemComponent', () => {
  let component: ChampListitemComponent;
  let fixture: ComponentFixture<ChampListitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampListitemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampListitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
