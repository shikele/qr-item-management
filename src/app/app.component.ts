import { Component } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {QRItem} from "./item/item";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qr-item-management';
  constructor(private store: AngularFirestore) {
  }
  qrItems: QRItem[] = [
    {
      name: '麻辣烫粉',
      count: 5,
      best_before: new Date()
    },
    {
      name: '老坛酸菜牛肉面',
      count: 6,
      best_before: new Date()
    }
  ];

  inProgress: QRItem[] = [];
  done: QRItem[] = [];

  editTask(list: string, qrItem: QRItem): void {}

  drop(event: CdkDragDrop<QRItem[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
