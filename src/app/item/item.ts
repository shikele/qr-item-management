import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;

export interface QRItem {
  id?: string;
  name: string;
  count: number;
  best_before: Timestamp;
}
