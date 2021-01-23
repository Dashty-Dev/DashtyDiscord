import { Message, MessageEmbed } from 'discord.js';
import { readdirSync } from 'fs';
import duration from 'humanize-duration';
import colours from '../../json/colours.json';
import serverSettings from '../../models/serverSettings';
import botConfig from '../../json/botConfig.json';

const onCooldown = new Set();

export = async (bot: any, message: Message) => {
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;

  const permissions = [
    'ADMINISTRATOR', // prettier-ignore
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS:',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ];

  let NeededPermissions: string = '';
  let NeededBotPermissions: string = '';

  // --- Using Prefix Set By User If It Exists ---
  let prefix: String;

  const config = await serverSettings.findOne({
    guildID: message.guild!.id,
  });

  if (!config) {
    prefix = botConfig.prefix;
  } else {
    prefix = config.prefix;
  }

  if (message.content.startsWith(`<@${bot.user.id}>`) || message.content.startsWith(`<@!${bot.user.id}>`)) {
    prefix = `<@!${bot.user.id}>`;
  }

  const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd: string = args.shift()!.toLowerCase();

  if (!message.content.startsWith(`${prefix}`)) return;
  const commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));

  if (!commandfile) {
    return message.channel.send(`Command does not exist, use ${prefix}help for a full list of commands.`);
  }

  const { DevOnly, UserPermissions, BotPermissions, name } = commandfile.config;

  // --- Cooldown Configuration ---
  let { Cooldown } = commandfile.config;

  if (Cooldown && Number.isNaN(Number(Cooldown))) {
    return console.error(`[ERROR]: Cooldown config option provided is not a number in file ${name}.\nCooldown option content: "${Cooldown}"`);
  }
  if (!Cooldown) Cooldown = 5;

  if (onCooldown.has(`${message.author.id}-${name}`)) {
    return message.reply(`You are currently on a ${Cooldown} second cooldown. You'll be able to re-use the **${name}** command once the time is expired.`);
  }
  onCooldown.add(`${message.author.id}-${name}`);
  setTimeout(() => {
    onCooldown.delete(`${message.author.id}-${name}`);
  }, Cooldown * 1000);

  // --- DevOnly Configuration ---
  if (!DevOnly && readdirSync('dist/commands/owner').indexOf(`${name}.js`) > -1) {
    return console.error(`[ERROR]: DevOnly config option not found in command ${name}.\nAdd the following to your config options... DevOnly: true/false`);
  }

  if (DevOnly === true && message.author.id !== '229142187382669312') {
    return message.channel.send('Developer only command.');
  }

  if (DevOnly && typeof DevOnly !== 'boolean') {
    return console.error(`[ERROR]: DevOnly config option provided is not a boolean in file ${name}.\nDevOnly option content: "${DevOnly}".`);
  }

  // --- UserPermissions Configuration ---
  function LoopThroughPermissions() {
    UserPermissions.forEach((permission: string) => {
      const MatchingPerms: any = permissions.find((SetUserPerm) => SetUserPerm === permission);

      if (!MatchingPerms) {
        console.error(`[ERROR]: UserPermission config option provided is not a valid permission in file ${name}.\nUserPermission option content: "${permission}"`);
      }

      if (!message.member!.hasPermission(MatchingPerms)) {
        NeededPermissions += `• \`${MatchingPerms}\`\n`;
      }
    });
  }

  if (!UserPermissions && readdirSync('dist/commands/moderation').indexOf(`${name}.js`) > -1) {
    return console.error(`[ERROR]: UserPermissions config not found in command ${name}.\nAdd the following to your config options... \nUserPermissions: ${permissions}`);
  }

  if (UserPermissions) LoopThroughPermissions();

  if (NeededPermissions) {
    return message.channel.send(`You need the following permissions to run this command...\n${NeededPermissions}`);
  }

  // --- BotPermissions Configuration ---
  if (!BotPermissions) {
    return console.error(`[ERROR]: BotPermissions config not found in command ${name}.\nAdd the following to your config options... \nBotPermissions: ${permissions}`);
  }

  BotPermissions.forEach((permission: string) => {
    const MatchingPerms: any = permissions.find((SetUserPerm) => SetUserPerm === permission);

    if (!MatchingPerms) {
      console.error(`[ERROR]: BotPermission config option provided is not a valid permission in file ${name}.\nBotPermission option content: "${permission}"`);
    }

    if (!message.guild!.me!.hasPermission(MatchingPerms)) {
      NeededBotPermissions += `• \`${MatchingPerms}\`\n`;
    }
  });

  if (NeededBotPermissions) {
    return message.channel.send(`Dashty needs the following permissions to carry out this command...\n${NeededBotPermissions}`);
  }

  // --- Run Command + Send Message If Error Occurs ---
  try {
    await commandfile.run(bot, message, args);
  } catch (errorMessage) {
    console.error(errorMessage);
    message.channel.send(
      new MessageEmbed()
        .setTitle('❌ Something went wrong!') // prettier-ignore
        .setDescription(`Uh oh! Looks like Dashoo has hit some of the wrong buttons, causing an error. You can try... \n\n• Reporting the bug over to our developers with \`${prefix}bugreport\`\n• Coming back later and trying again\n• Checking out Dashty's social medias whilst you wait 😏`)
        .setThumbnail('https://i.ibb.co/G2HNbNQ/Error-Image.png')
        .setColor(colours.red)
    );
  }
};
