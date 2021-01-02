import { readdirSync } from 'fs';

export = (bot: any) => {
  const load = (directories: string) => {
    const commands: string[] = readdirSync(`${__dirname}../../commands/${directories}/`).filter((directoryFile: string) => directoryFile.endsWith('.js'));
    if (commands.length <= 0) throw new Error(`The folder ${directories} could not be loaded. Please ensure a file is added in it to be loaded.`);

    commands.forEach((commandFile: string) => {
      const command = require(`${__dirname}../../commands/${directories}/${commandFile}`);

      if (!command.config) throw new Error(`The command ${commandFile} was not loaded. Command requires a config for it to be used.`);
      bot.commands.set(command.config.name, command);
      if (command.config.aliases) command.config.aliases.forEach((alias: string) => bot.aliases.set(alias, command.config.name));
    });
  };
  ['misc', 'information', 'owner', 'configuration', 'economy', 'moderation'].forEach((folder) => load(folder));
};
