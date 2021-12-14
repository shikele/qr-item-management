import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrItemDialogComponent } from './qr-item-dialog.component';

describe('QrItemDialogComponent', () => {
  let component: QrItemDialogComponent;
  let fixture: ComponentFixture<QrItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrItemDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
