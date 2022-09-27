require('dotenv').config();
import GetCommand from './utils/get-command';
import get_gif from './anime/index';
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
});

client.on('messageCreate', (message: any) => {
  if (message.author.bot) {
    return;
  }
  if (!message.content.startsWith(prefix)) {
    return;
  }
  
  const command = GetCommand(message.content);
  if (command.service === 'anime') {
    get_gif(command, message);
  }
});

client.login(DISCORD_TOKEN);
