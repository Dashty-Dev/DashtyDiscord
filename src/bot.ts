import { Client } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Client();

bot.on('ready', (): void => {
  console.log(`${bot.user.username} is online!`);
});

const token = process.env.TEST === 'true' ? process.env.DISCORD_TESTTOKEN : process.env.DISCORD_TOKEN;
bot.login(token);
