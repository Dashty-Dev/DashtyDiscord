import { MessageEmbed } from 'discord.js';
import item from '../../models/item';
import colours from '../../json/colours.json';

export = {
	config: {
		name: 'additem',
		description: 'Adds an item to the MongoDB database',
		usage: '<prefix>additem',
		accessableby: 'Developers',
		aliases: ['addnewitem', 'newitem', 'createitem'],
		DevOnly: true,
		BotPermissions: ['EMBED_LINKS'],
	},
	run: async (bot, message) => {
		const filter = (userMessage) => userMessage.author.id === message.author.id;

		function cancel(msg) {
			if (msg.content.toLowerCase() === 'cancel')
				return message.channel.send(
					new MessageEmbed()
						.setTitle('Creation Cancelled!') //
						.setDescription(`Creation of item has been cancelled successfully!`)
						.setFooter(`Setup by ${message.author.tag}`, message.author.displayAvatarURL())
						.setColor(colours.green)
						.setThumbnail(bot.user.displayAvatarURL())
				);
		}

		// try {
		message.channel.send(
			new MessageEmbed()
				.setTitle('Prompt [1/8]') //
				.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What name would you like to give the item?**\n\nInput **cancel** to cancel your item creation.`)
				.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
				.setColor(colours.blurple)
				.setThumbnail(bot.user.displayAvatarURL())
		);

		const collectingItemName = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
		const itemName = collectingItemName.first();

		if (cancel(itemName)) return;

		message.channel.send(
			new MessageEmbed()
				.setTitle('Prompt [2/8]') //
				.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What if the price you would like to give for ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
				.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
				.setColor(colours.blurple)
				.setThumbnail(bot.user.displayAvatarURL())
		);

		const collectingItemPrice = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
		const itemPrice = collectingItemPrice.first();

		if (cancel(itemPrice)) return;
		if (Number.isNaN(+itemPrice.content)) {
			return message.channel.send('Input a number.');
		}

		message.channel.send(
			new MessageEmbed()
				.setTitle('Prompt [3/8]') //
				.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What description would you like to give ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
				.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
				.setColor(colours.blurple)
				.setThumbnail(bot.user.displayAvatarURL())
		);

		const collectingItemDesc = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
		const itemDescription = collectingItemDesc.first();

		if (cancel(itemDescription)) return;

		message.channel.send(
			new MessageEmbed()
				.setTitle('Prompt [4/8]') //
				.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What category would you like to give ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
				.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
				.setColor(colours.blurple)
				.setThumbnail(bot.user.displayAvatarURL())
		);

		const collectingItemCategory = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
		const itemCategory = collectingItemCategory.first();

		if (cancel(itemCategory)) return;

		message.channel.send(
			new MessageEmbed()
				.setTitle('Prompt [5/8]') //
				.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What emoji would you like to give ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
				.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
				.setColor(colours.blurple)
				.setThumbnail(bot.user.displayAvatarURL())
		);

		const collectingItemEmoji = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
		const itemEmoji = collectingItemEmoji.first();

		if (cancel(itemEmoji)) return;

		message.channel.send(
			new MessageEmbed()
				.setTitle('Prompt [6/8]') //
				.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What image would you like to give ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
				.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
				.setColor(colours.blurple)
				.setThumbnail(bot.user.displayAvatarURL())
		);

		const collectingItemImage = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
		const itemImage = collectingItemImage.first();

		if (cancel(itemImage)) return;

		message.channel.send(
			new MessageEmbed()
				.setTitle('Prompt [7/8]') //
				.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **Would you like to show ${itemName} in the shop?**\n*Respond with either true or false*\n\nInput **cancel** to cancel your item creation.`)
				.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
				.setColor(colours.blurple)
				.setThumbnail(bot.user.displayAvatarURL())
		);

		const collectingItemInshop = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
		const itemInshop = collectingItemInshop.first();

		if (cancel(itemInshop)) return;

		message.channel.send(
			new MessageEmbed()
				.setTitle('Prompt [8/8]') //
				.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **Would you like to make ${itemName} multipurchase??**\n*Respond with either true or false*\n\nInput **cancel** to cancel your item creation.`)
				.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
				.setColor(colours.blurple)
				.setThumbnail(bot.user.displayAvatarURL())
		);

		const collectingItemMultiPurchase = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
		const itemMultipurchase = collectingItemMultiPurchase.first();

		if (cancel(itemMultipurchase)) return;

		const newItem = await item.create({
			itemName: itemName.content,
			itemPrice: itemPrice.content,
			itemDescription: itemCategory.content,
			itemCategory: itemCategory.content,
			itemEmoji: itemEmoji.content,
			itemImage: itemImage.content,
			itemInshop: itemInshop.content,
			itemMultipurchase: itemMultipurchase.content,
		});

		await newItem.save();
		return message.channel.send(
			new MessageEmbed()
				.setTitle('✅ Success!') //
				.setColor(colours.green)
				.setDescription(`${itemName} has been created!`)
				.setTimestamp()
		);
		// } catch (err) {
		// 	return message.channel.send("You didn't fill out the prompt in time!");
		// }
	},
};
