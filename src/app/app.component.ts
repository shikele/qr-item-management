import { Component } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {QRItem} from "./item/item";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {QRItemDialogComponent, QRItemDialogResult} from "./qr-item-dialog/qr-item-dialog.component";
import {BehaviorSubject, Observable} from "rxjs";

const getObservable = (collection: AngularFirestoreCollection<QRItem>) => {
  const subject = new BehaviorSubject<QRItem[]>([]);
  collection.valueChanges({ idField: 'id' }).subscribe((val: QRItem[]) => {
    subject.next(val);
  });
  return subject;
};

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
  storage_0001 = getObservable(this.store.collection('0001')) as Observable<QRItem[]>;
  storage_0002 = getObservable(this.store.collection('0002')) as Observable<QRItem[]>;
  storage_0003 = getObservable(this.store.collection('0003')) as Observable<QRItem[]>;

  // inProgress: QRItem[] = [];
  // done: QRItem[] = [];

  editItem(list: '0001' | '0002' | '0003', item: QRItem): void {
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

  drop(event: CdkDragDrop<QRItem[]|null>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.previousContainer.data || !event.container.data) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];
    this.store.firestore.runTransaction(() => {
      const promise = Promise.all([
        this.store.collection(event.previousContainer.id).doc(item.id).delete(),
        this.store.collection(event.container.id).add(item),
      ]);
      return promise;
    });
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
  newQrItem(): void {
    const dialogRef = this.dialog.open(QRItemDialogComponent, {
      width: '400px',
      data: {
        item: {},
        storageSelection: '0001'
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: QRItemDialogResult) => {
        if (!result) {
          return;
        }
        console.log(result)
        this.store.collection(result.storageSelection).add(result.item);
      });
  }
}
