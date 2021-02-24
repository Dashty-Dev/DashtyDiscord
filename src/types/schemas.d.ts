import { Document } from 'mongoose';

// --- Item Schema ---

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

// --- Server Settings Schema ---

export interface ServerSettingsTypes extends Document {
  guildName: String;
  guildID: String;
  prefix: String;
}
