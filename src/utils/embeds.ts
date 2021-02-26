import { Message, MessageEmbed } from 'discord.js';
import { EMBED_COLOURS } from '../utils/constants';


export function TESTING_EMBED(message: Message, test: string, colour: string): void {
  message.channel.send(
    new MessageEmbed() //
      .setTitle(test)
      .setDescription('test')
      .setColor(colour)
  );
}

export function TESTING_EMBED2(message: Message, test: string): void {
  message.channel.send(
    new MessageEmbed() //
      .setTitle(test)
      .setDescription('test')
      .setColor(EMBED_COLOURS.red)
  );
}
