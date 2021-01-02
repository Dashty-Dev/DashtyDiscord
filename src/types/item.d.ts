import { Document } from 'mongoose';

export interface itemTypes extends Document {
  itemName: String;
  itemPrice: Number;
  itemDescription: String;
  itemCategory: String;
  itemEmoji: String;
  itemImage: String;
  itemInshop: Boolean;
  itemMultipurchase: Boolean;
}
