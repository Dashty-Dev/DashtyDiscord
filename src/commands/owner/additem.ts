import { Client, Message, MessageEmbed } from 'discord.js';
import item from '../../models/item';
import { EMBED_COLOURS } from '../../utils/constants';

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
  run: async (bot: Client, message: Message) => {
    const filter = (userMessage: any) => userMessage.author.id === message.author.id;
    const reactionFilter = (reaction: any, user: any) => ['🇹', '🇫'].includes(reaction.emoji.name) && user.id === message.author.id;

    const cancelEmbed = new MessageEmbed()
      .setTitle('Creation Cancelled!') //
      .setDescription(`Creation of item has been cancelled successfully!`)
      .setFooter(`Setup by ${message.author.tag}`, message.author.displayAvatarURL())
      .setColor(EMBED_COLOURS.green)
      .setThumbnail(bot.user!.displayAvatarURL());

    function cancel(msg: any) {
      if (msg.content.toLowerCase() === 'cancel') return message.channel.send(cancelEmbed);
    }

    try {
      message.channel.send(
        new MessageEmbed()
          .setTitle('Prompt [1/8]') //
          .setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What name would you like to give the item?**\n\nInput **cancel** to cancel your item creation.`)
          .setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
          .setColor(EMBED_COLOURS.blurple)
          .setThumbnail(bot.user!.displayAvatarURL())
      );

      const collectingItemName = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
      const itemName = collectingItemName.first();

      if (cancel(itemName)) return;

      message.channel.send(
        new MessageEmbed()
          .setTitle('Prompt [2/8]') //
          .setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What if the price you would like to give for ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
          .setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
          .setColor(EMBED_COLOURS.blurple)
          .setThumbnail(bot.user!.displayAvatarURL())
      );

      const collectingItemPrice = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
      const itemPrice = collectingItemPrice.first();

      if (cancel(itemPrice)) return;
      if (Number.isNaN(+itemPrice!.content)) {
        return message.channel.send('Input a number.');
      }

      message.channel.send(
        new MessageEmbed()
          .setTitle('Prompt [3/8]') //
          .setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What description would you like to give ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
          .setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
          .setColor(EMBED_COLOURS.blurple)
          .setThumbnail(bot.user!.displayAvatarURL())
      );

      const collectingItemDesc = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
      const itemDescription = collectingItemDesc.first();

      if (cancel(itemDescription)) return;

      message.channel.send(
        new MessageEmbed()
          .setTitle('Prompt [4/8]') //
          .setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What category would you like to give ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
          .setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
          .setColor(EMBED_COLOURS.blurple)
          .setThumbnail(bot.user!.displayAvatarURL())
      );

      const collectingItemCategory = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
      const itemCategory = collectingItemCategory.first();

      if (cancel(itemCategory)) return;

      message.channel.send(
        new MessageEmbed()
          .setTitle('Prompt [5/8]') //
          .setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What emoji would you like to give ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
          .setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
          .setColor(EMBED_COLOURS.blurple)
          .setThumbnail(bot.user!.displayAvatarURL())
      );

      const collectingItemEmoji = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
      const itemEmoji = collectingItemEmoji.first();

      if (cancel(itemEmoji)) return;

      message.channel.send(
        new MessageEmbed()
          .setTitle('Prompt [6/8]') //
          .setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **What image would you like to give ${itemName}?**\n\nInput **cancel** to cancel your item creation.`)
          .setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
          .setColor(EMBED_COLOURS.blurple)
          .setThumbnail(bot.user!.displayAvatarURL())
      );

      const collectingItemImage = await message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] });
      const itemImage = collectingItemImage.first();

      if (cancel(itemImage)) return;

      const InShopEmbed = await message.channel.send(
        new MessageEmbed()
          .setTitle('Prompt [7/8]') //
          .setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **Would you like to show ${itemName} in the shop?**\n\nReact with 🇹 for true or 🇫 for false\n\nInput **cancel** to cancel your item creation.`)
          .setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
          .setColor(EMBED_COLOURS.blurple)
          .setThumbnail(bot.user!.displayAvatarURL())
      );

      InShopEmbed.react('🇹');
      InShopEmbed.react('🇫');

      const collectingReactionInShop = await InShopEmbed.awaitReactions(reactionFilter, { time: 120000, max: 1, errors: ['time'] });
      let itemInshop: Boolean;

      if (collectingReactionInShop?.first()?.emoji.name === '🇹') {
        itemInshop = true;
      } else itemInshop = false;

      const MultipurchaseEmbed = await message.channel.send(
        new MessageEmbed()
          .setTitle('Prompt [8/8]') //
          .setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to add a new item.\n\n❓ **Would you like to make ${itemName} multipurchase??**\n\nReact with 🇹 for true or 🇫 for false\n\nInput **cancel** to cancel your item creation.`)
          .setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
          .setColor(EMBED_COLOURS.blurple)
          .setThumbnail(bot.user!.displayAvatarURL())
      );

      MultipurchaseEmbed.react('🇹');
      MultipurchaseEmbed.react('🇫');

      const collectingReactionMultipurchase = await MultipurchaseEmbed.awaitReactions(reactionFilter, { time: 120000, max: 1, errors: ['time'] });
      let itemMultipurchase: Boolean;

      if (collectingReactionMultipurchase?.first()?.emoji.name === '🇹') {
        itemMultipurchase = true;
      } else itemMultipurchase = false;

      console.log(itemMultipurchase);

      const confirmEmbed = await message.channel.send(
        new MessageEmbed()
          .setTitle('Final Confirmation')
          .setDescription(
            //
            `Please confirm this following prompt to add an item.\n\n❓ **Are the following fields correct for ${itemName}**?\n\n• \`Item Name\` - **${itemName}**\n• \`Item Price\` - **${itemPrice}**\n• \`Item Description\` - **${itemDescription}**\n• \`Item Category\` - **${itemCategory}**\n• \`Item Emoji\` - ${itemEmoji}\n• \`Item Image\` - **${itemImage}**\n• \`Item InShop\` - **${itemInshop}**\n• \`Item Multipurchase\` - **${itemMultipurchase}**\n\nIf the fields above look correct you can add this item by reacting with a ✅ or cancel the creation with ❌ if these fields don't look right.`
          )
          .setFooter(`Setup by ${message.author.tag} | Prompt will timeout in 2 mins`, message.author.displayAvatarURL())
          .setColor(EMBED_COLOURS.red)
      );

      confirmEmbed.react('✅');
      confirmEmbed.react('❌');

      const collectingConfirmation = await confirmEmbed.awaitReactions((reaction: any, user: any) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id, { time: 120000, max: 1, errors: ['time'] });
      const ConfirmationResult = collectingConfirmation.first()?.emoji.name;

      if (ConfirmationResult === '✅') {
        const newItem = await item.create({
          itemName: itemName!.content,
          itemPrice: itemPrice!.content,
          itemDescription: itemCategory!.content,
          itemCategory: itemCategory!.content,
          itemEmoji: itemEmoji!.content,
          itemImage: itemImage!.content,
          itemInshop,
          itemMultipurchase,
        });

        await newItem.save();
        message.channel.send(
          new MessageEmbed()
            .setTitle('✅ Success!') //
            .setColor(EMBED_COLOURS.green)
            .setDescription(`${itemName} has been created!`)
            .setTimestamp()
        );
      } else return message.channel.send(cancelEmbed);
    } catch (err) {
      return message.channel.send("You didn't fill out the prompt in time!");
    }
  },
};
