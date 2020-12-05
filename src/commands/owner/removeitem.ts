import { Client, Message, MessageEmbed } from 'discord.js';
import item from '../../models/item';
import colours from '../../json/colours.json';

export = {
	config: {
		name: 'removeitem',
		description: 'Removes an item from the MongoDB database.',
		usage: '<prefix>removeitem <itemName>',
		accessableby: 'Developer',
		aliases: ['deleteitem'],
		DevOnly: true,
		BotPermissions: ['EMBED_LINKS', 'ADD_REACTIONS'],
	},
	run: async (bot: Client, message: Message) => {
		try {
			const cancel = new MessageEmbed()
				.setTitle('Deletion Cancelled!') //
				.setDescription(`Deletion of item has been cancelled successfully!`)
				.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
				.setColor(colours.green)
				.setThumbnail(bot.user!.displayAvatarURL());

			message.channel.send(
				new MessageEmbed()
					.setTitle('Prompt [1/1]') //
					.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to delete an item.\n\n❓ **What is the name of the item you would like to delete?**\n\nInput **cancel** to cancel your item deletion.`)
					.setFooter(`Requested by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
					.setColor(colours.blurple)
					.setThumbnail(bot.user!.displayAvatarURL())
			);

			const collectingItemName = await message.channel.awaitMessages((userMessage: any) => userMessage.author.id === message.author.id, { time: 120000, max: 1, errors: ['time'] });
			const itemName = collectingItemName.first()?.content;

			if (itemName?.toLowerCase() === 'cancel') return message.channel.send(cancel);

			const foundItem = await item.findOne({ itemName });

			if (!foundItem) {
				return message.channel.send('Item does not exist.');
			}

			const confirmation = await message.channel.send(
				new MessageEmbed()
					.setTitle('Are you sure?') //
					.setDescription(`Please confirm this final prompt to delete an item.\n\n❓ **Are you sure you want to delete the item ${itemName}**?\n\nDoing this will fully remove the item from the database and will result in it being unobtainable.`)
					.setFooter(`Requested by ${message.author.tag} | Add reaction`, message.author.displayAvatarURL())
					.setColor(colours.red)
			);
			confirmation.react('✅');
			confirmation.react('❌');

			const collectingReaction = await confirmation.awaitReactions((reaction: any, user: any) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id, { time: 120000, max: 1, errors: ['time'] });

			if (collectingReaction.first()?.emoji.name === '✅') {
				await item.deleteOne({ itemName });
				await message.channel.send(
					new MessageEmbed()
						.setTitle('✅ Success!') //
						.setColor(colours.green)
						.setDescription(`${itemName} has been deleted!`)
						.setTimestamp()
				);
			} else return message.channel.send(cancel);
		} catch (err) {
			return message.channel.send("You either didn't fill out the prompt in time or didn't react.");
		}
	},
};
