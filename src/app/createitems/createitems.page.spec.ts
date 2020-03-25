import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateitemsPage } from './createitems.page';

describe('CreateitemsPage', () => {
  let component: CreateitemsPage;
  let fixture: ComponentFixture<CreateitemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateitemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateitemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
