require('dotenv').config();
const axios = require('axios').default;
const { Client, GatewayIntentBits } = require('discord.js');

const { DISCORD_TOKEN } = process.env;
const prefix = '?';

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

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client.on('messageCreate', (message) => {
  if (message.author.bot) {
    return;
  }
  if (!message.content.startsWith(prefix)) {
    return;
  }

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  get_gif(command, message);
});

function get_gif(command, message) {
  axios.get(`https://api.satou-chan.xyz/api/endpoint/${command}`)
  .then((response) => {
    message.reply(response.data.url);
  })
  .catch((error) => {
    console.error('Error: ', error);
  })
}

client.login(DISCORD_TOKEN);
