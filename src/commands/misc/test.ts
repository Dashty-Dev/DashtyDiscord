import { Client, Message } from 'discord.js';

export = {
  config: {
    name: 'test',
    description: 'Displays the users balance.',
    usage: '?bal',
    accessableby: 'Public',
    aliases: ['bal', 'b', 'money', 'coins', 'cash'],
    ServerOnly: false,
  },
  run: async (bot: Client, message: Message, args: string[]) => {
    message.channel.send('you are a noob now be quiet');
  },
};
