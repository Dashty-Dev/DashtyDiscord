import { Client, Message, MessageEmbed } from 'discord.js';
import item from '../../models/item';
import colours from '../../json/colours.json';

export = {
	config: {
		name: 'multi',
		description: 'Changes whether an item is multipurchase or not.',
		usage: '<prefix>multi',
		accessableby: 'Developers',
		aliases: ['multipurchase'],
		DevOnly: true,
		BotPermissions: ['EMBED_LINKS'],
	},
	run: async (bot: Client, message: Message) => {
		try {
			const cancel = new MessageEmbed()
				.setTitle('Multipurchase Cancelled!') //
				.setDescription(`Multipurchase of item has been cancelled successfully!`)
				.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
				.setColor(colours.green)
				.setThumbnail(bot.user!.displayAvatarURL());

			message.channel.send(
				new MessageEmbed()
					.setTitle('Prompt [1/1]') //
					.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to change whether an item is multipurchase.\n\n❓ **What is the name of the item you would like to change?**\n\nInput **cancel** to cancel your item change.`)
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

			if (foundItem.itemMultipurchase === false) {
				const confirmation = await message.channel.send(
					new MessageEmbed()
						.setTitle('Are you sure?') //
						.setDescription(`Please confirm this final prompt to change an item.\n\n❓ **Are you sure you want to make the item ${itemName} multipurchase**?\n\nDoing this will allow users to purchase the item multiple times.`)
						.setFooter(`Requested by ${message.author.tag} | Add reaction`, message.author.displayAvatarURL())
						.setColor(colours.red)
				);
				confirmation.react('✅');
				confirmation.react('❌');

				const collectingReaction = await confirmation.awaitReactions((reaction: any, user: any) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id, { time: 120000, max: 1, errors: ['time'] });

				if (collectingReaction.first()?.emoji.name === '✅') {
					foundItem.itemMultipurchase = true;
					foundItem.save();

					return message.channel.send(
						new MessageEmbed()
							.setTitle('✅ Success!') //
							.setColor(colours.green)
							.setDescription(`${itemName} is now multipurchase!`)
							.setTimestamp()
					);
				}
				return message.channel.send(cancel);
			}

			if (foundItem.itemMultipurchase === true) {
				const confirmation = await message.channel.send(
					new MessageEmbed()
						.setTitle('Are you sure?') //
						.setDescription(`Please confirm this final prompt to change an item.\n\n❓ **Are you sure you want to remove the item ${itemName} from being multipurchase**?\n\nDoing this will not allow users to purchase this item multiple times.`)
						.setFooter(`Requested by ${message.author.tag} | Add reaction`, message.author.displayAvatarURL())
						.setColor(colours.red)
				);
				confirmation.react('✅');
				confirmation.react('❌');

				const collectingReaction = await confirmation.awaitReactions((reaction: any, user: any) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id, { time: 120000, max: 1, errors: ['time'] });

				if (collectingReaction.first()?.emoji.name === '✅') {
					foundItem.itemMultipurchase = false;
					foundItem.save();

					return message.channel.send(
						new MessageEmbed()
							.setTitle('✅ Success!') //
							.setColor(colours.green)
							.setDescription(`${itemName} has now been removed from being multipurchase!`)
							.setTimestamp()
					);
				}
				return message.channel.send(cancel);
			}
		} catch (err) {
			return message.channel.send("You didn't fill out the prompt in time!");
		}
	},
};
