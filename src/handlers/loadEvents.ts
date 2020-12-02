import { readdirSync } from 'fs';

export = (bot) => {
	const load = (directories: string) => {
		const events = readdirSync(`${__dirname}../../events/${directories}/`).filter((directoryFile) => directoryFile.endsWith('.js'));
		events.forEach((eventFile) => {
			const event = require(`${__dirname}../../events/${directories}/${eventFile}`);
			const eventName = eventFile.split('.')[0];
			bot.on(eventName, event.bind(null, bot));
		});
	};
	['bot', 'discordServer', 'commandHandler'].forEach((folder) => load(folder));
};
