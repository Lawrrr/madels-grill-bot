require('dotenv').config();
// utils
import Command from './utils/command';
import setPresence from './utils/set-presence';

import getAnimeGif from './anime/index';
import getHelp from './help';

const { 
  Client, 
  GatewayIntentBits
} = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
const { DISCORD_TOKEN } = process.env;
const prefix = '?madel';

client.once('ready', () => {
	console.log('Ready!');
  setPresence(prefix, client);
});

client.on('messageCreate', (message: any) => {
  if (message.author.bot) {
    return;
  }
  if (!message.content.startsWith(prefix)) {
    return;
  }
  
  const command = Command(message.content);
  if (command.service === 'help') {
    getHelp(message);
  } else if (command.service === 'anime') {
    getAnimeGif(command, message);
  }
});

client.login(DISCORD_TOKEN);
