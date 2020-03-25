import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEditPage } from './order-edit.page';

describe('OrderEditPage', () => {
  let component: OrderEditPage;
  let fixture: ComponentFixture<OrderEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
