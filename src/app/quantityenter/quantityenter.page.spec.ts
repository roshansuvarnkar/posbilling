import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityenterPage } from './quantityenter.page';

describe('QuantityenterPage', () => {
  let component: QuantityenterPage;
  let fixture: ComponentFixture<QuantityenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityenterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
