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
		BotPermissions: ['EMBED_LINKS', 'ATTACH_FILES'],
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

		try {
			message.channel.send(
				new MessageEmbed()
					.setTitle('Prompt [1/8]') //
					.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What name would you like to give the item?**\n\nInput **cancel** to cancel your item creation.`)
					.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
					.setColor(colours.blurple)
					.setThumbnail(bot.user.displayAvatarURL())
			);

			const collectingItemName = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
			const ItemNameCollected = collectingItemName.first();
			const itemName = ItemNameCollected.content;

			if (cancel(ItemNameCollected)) return;

			message.channel.send(
				new MessageEmbed()
					.setTitle('Prompt [2/8]') //
					.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What if the price you would like to give for ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
					.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
					.setColor(colours.blurple)
					.setThumbnail(bot.user.displayAvatarURL())
			);

			const collectingItemPrice = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
			const ItemPriceCollected = collectingItemPrice.first();
			const itemPrice = ItemPriceCollected.content;

			if (cancel(ItemPriceCollected)) return;
			if (Number.isNaN(+itemPrice)) {
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
			const ItemDescCollected = collectingItemDesc.first();
			const itemDescription = ItemDescCollected.content;

			if (cancel(ItemDescCollected)) return;

			message.channel.send(
				new MessageEmbed()
					.setTitle('Prompt [4/8]') //
					.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What category would you like to give ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
					.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
					.setColor(colours.blurple)
					.setThumbnail(bot.user.displayAvatarURL())
			);

			const collectingItemCategory = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
			const ItemCategoryCollected = collectingItemCategory.first();
			const itemCategory = ItemCategoryCollected.content;

			if (cancel(ItemCategoryCollected)) return;

			message.channel.send(
				new MessageEmbed()
					.setTitle('Prompt [5/8]') //
					.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What emoji would you like to give ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
					.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
					.setColor(colours.blurple)
					.setThumbnail(bot.user.displayAvatarURL())
			);

			const collectingItemEmoji = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
			const ItemEmojiCollected = collectingItemEmoji.first();
			const itemEmoji = ItemEmojiCollected.content;

			if (cancel(ItemEmojiCollected)) return;

			message.channel.send(
				new MessageEmbed()
					.setTitle('Prompt [6/8]') //
					.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What image would you like to give ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
					.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
					.setColor(colours.blurple)
					.setThumbnail(bot.user.displayAvatarURL())
			);

			const collectingItemImage = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
			const ItemImageCollected = collectingItemImage.first();
			const itemImage = ItemImageCollected.content;

			if (cancel(ItemImageCollected)) return;

			message.channel.send(
				new MessageEmbed()
					.setTitle('Prompt [7/8]') //
					.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **Would you like to show ${itemName} in the shop?**\n*Respond with either true or false*\n\nInput **cancel** to cancel your item creation.`)
					.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
					.setColor(colours.blurple)
					.setThumbnail(bot.user.displayAvatarURL())
			);

			const collectingItemInshop = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
			const ItemInshopCollected = collectingItemInshop.first();
			const itemInshop = ItemInshopCollected.content;

			if (cancel(ItemInshopCollected)) return;

			message.channel.send(
				new MessageEmbed()
					.setTitle('Prompt [8/8]') //
					.setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **Would you like to make ${itemName} multipurchase??**\n*Respond with either true or false*\n\nInput **cancel** to cancel your item creation.`)
					.setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
					.setColor(colours.blurple)
					.setThumbnail(bot.user.displayAvatarURL())
			);

			const collectingItemMultiPurchase = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
			const ItemMultipurchaseCollected = collectingItemMultiPurchase.first();
			const itemMultipurchase = ItemMultipurchaseCollected.content;

			if (cancel(ItemMultipurchaseCollected)) return;

			const newItem = await item.create({
				itemName,
				itemPrice,
				itemDescription,
				itemCategory,
				itemEmoji,
				itemImage,
				itemInshop,
				itemMultipurchase,
			});

			await newItem.save();
			return message.channel.send(
				new MessageEmbed()
					.setTitle('✅ Success!') //
					.setColor(colours.green)
					.setDescription(`${itemName} has been created!`)
					.setTimestamp()
			);
		} catch (err) {
			return message.channel.send("You didn't fill out the prompt in time!");
		}
	},
};
