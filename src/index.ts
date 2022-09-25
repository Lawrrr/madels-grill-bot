require('dotenv').config();
const axios = require('axios').default;
import { CommandPayload } from './utils/inteface';
const { 
  Client, 
  GatewayIntentBits
} = require('discord.js');

const { 
  DISCORD_TOKEN,
  SATOU_API
} = process.env;

const prefix = '?madel';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

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

  const command: CommandPayload = get_command(message.content);
  if (command.service === 'anime') {
    get_gif(command, message);
  }
});

function get_command(message: string) {
  const args = message.split(' ');
  const command: CommandPayload = {
    prefix: args[0],
    service: args[1],
    action: args[2],
    targetUser: args[3] ? args[3] : ''
  };

  return command;
}

// anime gif
function get_gif(command: CommandPayload, message: any) {
  axios.get(`${SATOU_API}${command.action}`)
  .then((response: any) => {
    message.reply(response.data.url);
  })
  .catch((error: Error) => {
    console.error('Error: ', error);
  })
}

client.login(DISCORD_TOKEN);
