import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecategoryPage } from './createcategory.page';

describe('CreatecategoryPage', () => {
  let component: CreatecategoryPage;
  let fixture: ComponentFixture<CreatecategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
