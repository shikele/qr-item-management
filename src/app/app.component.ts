import { Component } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {QRItem} from "./item/item";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {QRItemDialogComponent, QRItemDialogResult} from "./qr-item-dialog/qr-item-dialog.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qr-item-management';

  constructor(private store: AngularFirestore,
              private dialog: MatDialog) {
  }
  // qrItems: QRItem[] = [
  //   {
  //     name: '麻辣烫粉',
  //     count: 5,
  //     best_before: '2021-03-26'
  //   },
  //   {
  //     name: '老坛酸菜牛肉面',
  //     count: 6,
  //     best_before: '2021-06-30'
  //   }
  // ];
  qrItems = this.store.collection('0001').valueChanges({ idField: 'id' }) as Observable<QRItem[]>;
  inProgress = this.store.collection('0002').valueChanges({ idField: 'id' }) as Observable<QRItem[]>;
  done = this.store.collection('0003').valueChanges({ idField: 'id' }) as Observable<QRItem[]>;

  // inProgress: QRItem[] = [];
  // done: QRItem[] = [];

  editItem(list: 'done' | 'qrItems' | 'inProgress', item: QRItem): void {
    const dialogRef = this.dialog.open(QRItemDialogComponent, {
      width: '270px',
      data: {
        item,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: QRItemDialogResult|undefined) => {
      if (!result) {
        return;
      }
      if (result.delete) {
        this.store.collection(list).doc(item.id).delete();
      } else {
        this.store.collection(list).doc(item.id).update(item);
      }
    });
  }

  // drop(event: CdkDragDrop<QRItem[]>): void {
  //   if (event.previousContainer === event.container) {
  //     return;
  //   }
  //   const item = event.previousContainer.data[event.previousIndex];
  //   this.store.firestore.runTransaction(() => {
  //     const promise = Promise.all([
  //       this.store.collection(event.previousContainer.id).doc(item.id).delete(),
  //       this.store.collection(event.container.id).add(item),
  //     ]);
  //     return promise;
  //   });
  //   transferArrayItem(
  //     event.previousContainer.data,
  //     event.container.data,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  // }
  newQrItem(): void {
    const dialogRef = this.dialog.open(QRItemDialogComponent, {
      width: '400px',
      data: {
        item: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: QRItemDialogResult) => {
        if (!result) {
          return;
        }
        this.store.collection('todo').add(result.item);
      });
  }
}
