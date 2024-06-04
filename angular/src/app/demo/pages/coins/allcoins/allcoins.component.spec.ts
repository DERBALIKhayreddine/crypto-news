import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcoinsComponent } from './allcoins.component';

describe('AllcoinsComponent', () => {
  let component: AllcoinsComponent;
  let fixture: ComponentFixture<AllcoinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllcoinsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllcoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
