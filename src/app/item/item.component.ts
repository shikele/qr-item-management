import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QRItem} from "./item";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent{

  @Input() qrItemIn: QRItem | null = null;
  @Output() edit = new EventEmitter<QRItem>();

}
