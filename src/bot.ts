import { Client, Collection } from 'discord.js';
import { config } from 'dotenv';

config();

const bot: any = new Client({
  ws: { intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MESSAGE_REACTIONS'] },
  disableMentions: 'everyone',
});

bot.commands = new Collection();
bot.aliases = new Collection();

['commands', 'aliases'].forEach((collection: string): any => {
  bot[collection] = new Collection();
});
['loadCommands', 'loadEvents'].forEach((handlerFile: string): string => require(`./handlers/${handlerFile}.js`)(bot));

bot.login(process.env.TEST === 'true' ? process.env.DISCORD_TESTTOKEN : process.env.DISCORD_TOKEN);
