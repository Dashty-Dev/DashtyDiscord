import { MessageEmbed } from 'discord.js';
import serverSettings from '../../models/serverSettings';
import colours from '../../json/colours.json';

export = {
  config: {
    name: 'prefix',
    description: 'Change the bots prefix to something custom.',
    usage: '.prefix <prefix>',
    accessableby: 'MANAGE_MESSAGES',
    aliases: ['changeprefix', 'newprefix'],
	UserPermissions: ['MANAGE_GUILD'],
	BotPermissions: ['EMBED_LINKS']
  },
  run: async (bot, message, args) => {
    const userPrefix = args.join(' ');

    if (userPrefix.length < 1) {
	return message.channel.send(new MessageEmbed()
		.setTitle('<:DashtyError:781911625183658014> No prefix!')
		.setDescription('That doesn\'t seem quite right! Please make sure you **input a prefix** as displayed below.')
		.setColor(colours.red)
		.setImage('https://s8.gifyu.com/images/Prefix.gif')
		.setFooter('Input a prefix')
		.setTimestamp());
    }

    if (userPrefix.length > 10) {
		return message.channel.send(new MessageEmbed()
		.setTitle('<:DashtyError:781911625183658014> Too many letters!')
		.setDescription('That doesn\'t seem quite right! Please make sure you input a prefix that contains **10 or less characters** as displayed below.')
		.setColor(colours.red)
		.setImage('https://s8.gifyu.com/images/Prefix.gif')
		.setFooter('Too many characters')
		.setTimestamp());
    }

    const config = await serverSettings.findOne({
      guildID: message.guild.id,
    });

    if (!config) {
      if (userPrefix === process.env.PREFIX) {
        return message.channel.send(new MessageEmbed()
		.setTitle('<:DashtyError:781911625183658014> Already Prefix!')
		.setDescription('That doesn\'t seem quite right! Please make sure you input a prefix that **isn\'t the current prefix set in this server**, as displayed below.')
		.setColor(colours.red)
		.setImage('https://s8.gifyu.com/images/Prefix.gif')
		.setFooter('Same prefix')
		.setTimestamp());
      }

      const newSettings = await serverSettings.create({
        guildName: message.guild.name,
        guildID: message.guild.id,
        prefix: userPrefix,
      });

      await newSettings.save();
		return message.channel.send(new MessageEmbed()
			.setTitle('✅ Success!')
			.setColor(colours.green)
			.setDescription(`Prefix has successfully been changed to \`${userPrefix}\``)
			.setTimestamp());
    }

    if ((userPrefix === process.env.PREFIX && userPrefix === config.prefix) || userPrefix === config.prefix) {
		return message.channel.send(new MessageEmbed()
		.setTitle('<:DashtyError:781911625183658014> Already Prefix!')
		.setDescription('That doesn\'t seem quite right! Please make sure you input a prefix that **isn\'t the current prefix set in this server**, as displayed below.')
		.setColor(colours.red)
		.setImage('https://s8.gifyu.com/images/Prefix.gif')
		.setFooter('Same prefix')
		.setTimestamp());
    }

    await config.updateOne({
      prefix: userPrefix,
    });

    return message.channel.send(new MessageEmbed()
			.setTitle('✅ Success!')
			.setColor(colours.green)
			.setDescription(`Prefix has successfully been changed to \`${userPrefix}\``)
			.setTimestamp());
  },
};
