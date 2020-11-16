import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserOrdersPage } from './user-orders.page';

describe('UserOrdersPage', () => {
  let component: UserOrdersPage;
  let fixture: ComponentFixture<UserOrdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrdersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
