import dotenv from 'dotenv';

dotenv.config();
const prefix = process.env.PREFIX;

export = (bot, message) => {
  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return;
  const commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

  if (!commandfile) {
    return message.channel.send('Command does not exist, use .help for a full list of commands.');
  }
  // Server Only config option
  if (commandfile.config.ServerOnly === undefined && message.channel.type === 'dm') {
    return message.author.send('Server only command.');
  }

  commandfile.run(bot, message, args);
};
