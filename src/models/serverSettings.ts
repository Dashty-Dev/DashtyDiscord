import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  guildName: { type: String },
  guildID: { type: String },
  prefix: { type: String },
});

export = mongoose.model('serverSettings', settingsSchema);
