import { Client, Message } from 'discord.js';

export = {
  config: {
    name: 'help',
    description: "Displays a list of all Dashty's commands.",
    usage: '.help',
    accessableby: 'Public',
    aliases: ['dashty', 'commands', 'cmds'],
    ServerOnly: false,
    BotPermissions: ['SEND_MESSAGES'],
    Cooldown: 10,
  },
  run: async (bot: Client, message: Message) => {
    message.channel.send('you are a noob now be quiet');
  },
};
