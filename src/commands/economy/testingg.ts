import { Client, Message } from 'discord.js';

export = {
	config: {
		name: 'testingg',
		description: "Displays a list of all Dashty's commands.",
		usage: '.help',
		accessableby: 'Public',
		aliases: ['dashty', 'commands', 'cmds'],
		ServerOnly: false,
	},
	run: async (_bot: Client, message: Message) => {
		message.channel.send('you are a noob now be quiet');
	},
};
