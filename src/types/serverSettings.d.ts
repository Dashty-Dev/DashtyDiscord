import mongoose from 'mongoose';

export interface ServerSettingsTypes extends mongoose.Document {
	guildName: String;
	guildID: String;
	prefix: String;
}
