import serverSettings from '../../models/serverSettings';

export = {
  config: {
    name: 'prefix',
    description: 'Change the bots prefix to something custom.',
    usage: '.prefix <prefix>',
    accessableby: 'MANAGE_MESSAGES',
    aliases: ['changeprefix', 'newprefix'],
    ServerOnly: true,
  },
  run: async (bot, message, args) => {
    const userPrefix = args.join(' ');

    if (!message.member.hasPermission('MANAGE_GUILD')) {
      return message.channel.send('No permission to run this.');
    }

    if (userPrefix.length < 1) {
      return message.channel.send('Specify a prefix');
    }

    if (userPrefix.length > 10) {
      return message.channel.send('Your prefix can only contain 10 characters.');
    }

    console.log(userPrefix.length);

    const config = await serverSettings.findOne({
      guildID: message.guild.id,
    });

    console.log(config);

    if (!config) {
      const newSettings = await serverSettings.create({
        guildName: message.guild.name,
        guildID: message.guild.id,
        prefix: userPrefix,
      });

      await newSettings.save();
      return message.channel.send('Prefix created and changed.');
    }

    await config.updateOne({
      prefix: userPrefix,
    });

    return message.channel.send('prefix has been changed');
  },
};
