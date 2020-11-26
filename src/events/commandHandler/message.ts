import { MessageEmbed } from 'discord.js';
import dotenv from 'dotenv';
import colours from '../../json/colours.json';
import serverSettings from '../../models/serverSettings';

dotenv.config();

export = async (bot, message) => {
  if (message.author.bot) return;

  // Using prefix set by user, if it doesn't exist use default.
  let prefix: string;

  const config = await serverSettings.findOne({
	guildID: message.guild.id,
  });

  if (!config) {
	prefix = process.env.PREFIX;
  } else {
	prefix = config.prefix;
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return;
  const commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

  if (!commandfile) {
    return message.channel.send(`Command does not exist, use ${prefix}help for a full list of commands.`);
  }

  // Server Only config option
  const { ServerOnly } = commandfile.config;

  if (ServerOnly === undefined) {
    throw new Error(`[ERROR:] ServerOnly config option not found in command ${commandfile.config.name}.\nAdd the following to your config options... ServerOnly: true/false`);
  }

  if (ServerOnly === true && message.channel.type === 'dm') {
    return message.author.send('Server only command.');
  }

  // Running command and sending message if an error occurs.
  try {
    await commandfile.run(bot, message, args);
  } catch (errorMessage) {
    console.error(errorMessage);
	message.channel.send(new MessageEmbed()
	.setTitle('❌ Something went wrong!')
	.setDescription(`Uh oh! Looks like Dashoo has hit some of the wrong buttons, causing an error. You can try... \n\n• Reporting the bug over to our developers with \`${prefix}bugreport\`\n• Coming back later and trying again\n• Checking out Dashty's social medias whilst you wait 😏`)
	.setThumbnail('https://i.ibb.co/G2HNbNQ/Error-Image.png')
	.setColor(colours.red));   
  }
}; 