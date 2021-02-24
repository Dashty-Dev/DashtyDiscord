import { model, Schema } from 'mongoose';
import { itemTypes } from '../types/schemas';

const itemSchema: Schema = new Schema({
  itemName: { type: String },
  itemPrice: { type: Number },
  itemDescription: { type: String },
  itemCategory: { type: String },
  itemEmoji: { type: String },
  itemImage: { type: String },
  itemInshop: { type: Boolean },
  itemMultipurchase: { type: Boolean },
});

export = model<itemTypes>('items', itemSchema);
