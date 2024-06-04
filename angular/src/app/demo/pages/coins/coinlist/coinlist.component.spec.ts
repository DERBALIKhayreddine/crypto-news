import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinlistComponent } from './coinlist.component';

describe('CoinlistComponent', () => {
  let component: CoinlistComponent;
  let fixture: ComponentFixture<CoinlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoinlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoinlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
