export = {
  config: {
    name: 'test',
    description: 'Displays the users balance.',
    usage: '?bal',
    accessableby: 'Public',
    aliases: ['bal', 'b', 'money', 'coins', 'cash'],
    ServerOnly: false,
  },
  run: async (bot, message, args) => {
    message.channel.send('you are a noob now be quiet');
  },
};
