export = {
  config: {
    name: 'help',
    description: "Displays a list of all Dashty's commands.",
    usage: '.help',
    accessableby: 'Public',
    aliases: ['dashty', 'commands', 'cmds'],
    ServerOnly: false,
  },
  run: async (bot, message, args) => {
    message.channel.send('you are a noob now be quiet');
  },
};
