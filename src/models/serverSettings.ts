import { model, Schema } from 'mongoose';
import { ServerSettingsTypes } from '../types/serverSettings';

const settingsSchema: Schema = new Schema({
  guildName: { type: String },
  guildID: { type: String },
  prefix: { type: String },
});

export = model<ServerSettingsTypes>('serverSettings', settingsSchema);
