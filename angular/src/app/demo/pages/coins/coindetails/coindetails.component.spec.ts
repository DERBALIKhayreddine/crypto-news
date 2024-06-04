import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoindetailsComponent } from './coindetails.component';

describe('CoindetailsComponent', () => {
  let component: CoindetailsComponent;
  let fixture: ComponentFixture<CoindetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoindetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoindetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
