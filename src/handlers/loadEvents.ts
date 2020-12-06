import { Client } from 'discord.js';
import { readdirSync } from 'fs';

export = (bot: Client) => {
	const load = (directories: string) => {
		const events: string[] = readdirSync(`${__dirname}../../events/${directories}/`).filter((directoryFile: string) => directoryFile.endsWith('.js'));
		if (events.length <= 0) throw new Error(`The folder ${directories} could not be loaded. Please ensure a file is added in it to be loaded.`);

		events.forEach((eventFile: string) => {
			const event = require(`${__dirname}../../events/${directories}/${eventFile}`);
			const eventName: string = eventFile.split('.')[0];

			bot.on(eventName, event.bind(null, bot));
		});
	};
	['bot', 'discordServer', 'commandHandler'].forEach((folder) => load(folder));
};
