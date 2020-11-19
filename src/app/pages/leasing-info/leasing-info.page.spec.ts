import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeasingInfoPage } from './leasing-info.page';

describe('LeasingInfoPage', () => {
  let component: LeasingInfoPage;
  let fixture: ComponentFixture<LeasingInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasingInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeasingInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
