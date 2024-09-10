import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroVirtualComponent } from './tablero-virtual.component';

describe('TableroVirtualComponent', () => {
  let component: TableroVirtualComponent;
  let fixture: ComponentFixture<TableroVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableroVirtualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableroVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
