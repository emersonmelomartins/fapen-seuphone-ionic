import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductCartPage } from './product-cart.page';

describe('ProductCartPage', () => {
  let component: ProductCartPage;
  let fixture: ComponentFixture<ProductCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
