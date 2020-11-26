import mongoDatabase from '../database/connectDatabase';

export = async (bot) => {
  console.log(`\n${bot.user.username} has loaded successfully and is online. \nServers: ${bot.guilds.cache.size}   Users: ${bot.users.cache.size}   Channels: ${bot.channels.cache.size}`);

  const statuses = [`🎮 dashty.xyz | .help`, `🥪 Dashoo's picnic`, `✨ @DashtyDev`];

  setInterval(() => {
    bot.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)], { type: 'STREAMING', url: 'https://www.twitch.tv/dashtydev' });
  }, 15000);

  // -- Login to MongoDB database
  await mongoDatabase().then(() => console.log('[SUCCESS]: Connected to MongoDB database!'));
};
