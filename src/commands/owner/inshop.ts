import { Client, Message, MessageEmbed } from 'discord.js';
import item from '../../models/item';
import colours from '../../json/colours.json';

export = {
  config: {
    name: 'inshop',
    description: 'Changes whether an item is in the shop or not',
    usage: '<prefix>inshop',
    accessableby: 'Developers',
    aliases: ['changeshop'],
    DevOnly: true,
    BotPermissions: ['EMBED_LINKS'],
  },
  run: async (bot: Client, message: Message) => {
    try {
      const cancel = new MessageEmbed()
        .setTitle('Inshop Cancelled!') //
        .setDescription(`Inshop of item has been cancelled successfully!`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(colours.green)
        .setThumbnail(bot.user!.displayAvatarURL());

      message.channel.send(
        new MessageEmbed()
          .setTitle('Prompt [1/1]') //
          .setDescription(`Hello **${message.author.username}**,\n\nPlease follow the instructions provided to change whether an item is in the shop.\n\n❓ **What is the name of the item you would like to change?**\n\nInput **cancel** to cancel your item change.`)
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

      if (foundItem.itemInshop === false) {
        const confirmation = await message.channel.send(
          new MessageEmbed()
            .setTitle('Are you sure?') //
            .setDescription(`Please confirm this final prompt to change an item.\n\n❓ **Are you sure you want to put the item ${itemName} in the shop**?\n\nDoing this will make the item purchasable for users who have the necessary currency.`)
            .setFooter(`Requested by ${message.author.tag} | Add reaction`, message.author.displayAvatarURL())
            .setColor(colours.red)
        );
        confirmation.react('✅');
        confirmation.react('❌');

        const collectingReaction = await confirmation.awaitReactions((reaction: any, user: any) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id, { time: 120000, max: 1, errors: ['time'] });

        if (collectingReaction.first()?.emoji.name === '✅') {
          foundItem.itemInshop = true;
          foundItem.save();

          return message.channel.send(
            new MessageEmbed()
              .setTitle('✅ Success!') //
              .setColor(colours.green)
              .setDescription(`${itemName} is now in the shop!`)
              .setTimestamp()
          );
        }
        return message.channel.send(cancel);
      }

      if (foundItem.itemInshop === true) {
        const confirmation = await message.channel.send(
          new MessageEmbed()
            .setTitle('Are you sure?') //
            .setDescription(`Please confirm this final prompt to change an item.\n\n❓ **Are you sure you want to remove the item ${itemName} from the shop**?\n\nDoing this will make the item un-purchasable for users who have the necessary currency, taking the item offsale.`)
            .setFooter(`Requested by ${message.author.tag} | Add reaction`, message.author.displayAvatarURL())
            .setColor(colours.red)
        );
        confirmation.react('✅');
        confirmation.react('❌');

        const collectingReaction = await confirmation.awaitReactions((reaction: any, user: any) => ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.author.id, { time: 120000, max: 1, errors: ['time'] });

        if (collectingReaction.first()?.emoji.name === '✅') {
          foundItem.itemInshop = false;
          foundItem.save();

          return message.channel.send(
            new MessageEmbed()
              .setTitle('✅ Success!') //
              .setColor(colours.green)
              .setDescription(`${itemName} has now been removed from the shop!`)
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
