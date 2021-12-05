import { Component } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {QRItem} from "./item/item";

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
}
