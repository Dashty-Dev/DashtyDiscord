import mongoose from 'mongoose';
import { ServerSettingsTypes } from '../types/serverSettings';

const settingsSchema = new mongoose.Schema({
	guildName: { type: String },
	guildID: { type: String },
	prefix: { type: String },
});

export = mongoose.model<ServerSettingsTypes>('serverSettings', settingsSchema);
