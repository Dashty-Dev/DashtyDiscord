import { Client, Collection } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const bot: any = new Client({
  disableMentions: 'everyone',
});

bot.commands = new Collection();
bot.aliases = new Collection();

['commands', 'aliases'].forEach((collection) => {
  bot[collection] = new Collection();
});
['loadCommands', 'loadEvents'].forEach((handlerFile) => require(`./handlers/${handlerFile}.js`)(bot));

const token = process.env.TEST === 'true' ? process.env.DISCORD_TESTTOKEN : process.env.DISCORD_TOKEN;
bot.login(token);
