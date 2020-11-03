import dotenv from 'dotenv';

dotenv.config();
const prefix = process.env.PREFIX;

export = async (bot, message) => {
  if (message.author.bot || message.channel.type === 'dm') return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return;
  const commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
  if (commandfile) commandfile.run(bot, message, args);

  if (message.content.startsWith(prefix) && !commandfile) {
    message.channel.send('Command does not exist, use .help for a full list of commands.');
  }
};
