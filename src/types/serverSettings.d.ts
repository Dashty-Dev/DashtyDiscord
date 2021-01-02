import { Document } from 'mongoose';

export interface ServerSettingsTypes extends Document {
  guildName: String;
  guildID: String;
  prefix: String;
}
