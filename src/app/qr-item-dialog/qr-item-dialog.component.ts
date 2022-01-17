import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QRItem} from "../item/item";

@Component({
  selector: 'app-qr-item-dialog',
  templateUrl: './qr-item-dialog.component.html',
  styleUrls: ['./qr-item-dialog.component.css']
})
export class QRItemDialogComponent{

  private backupItem: Partial<QRItem> = { ...this.qrData.item };

  constructor(
    public dialogRef: MatDialogRef<QRItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public qrData: QRItemDialogData
  ) {

    console.log(qrData)
  }

  cancel(): void {
    this.qrData.item.name = this.backupItem.name;
    this.qrData.item.count = this.backupItem.count;
    this.dialogRef.close(this.qrData);
  }
}

export interface QRItemDialogData {
  item: Partial<QRItem>;
  storageSelection: string;
  enableDelete: boolean;
}

export interface QRItemDialogResult {
  item: QRItem;
  storageSelection: string;
  delete?: boolean;
}
