import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteArticlesComponent } from './delete-articles.component';

describe('DeleteArticlesComponent', () => {
  let component: DeleteArticlesComponent;
  let fixture: ComponentFixture<DeleteArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteArticlesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
