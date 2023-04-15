const { REST, Routes } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();

const { DISCORD_TOKEN, CLIENT_ID } = process.env;

const commands = [
	{
		name: 'ping',
		description: 'Responde com Pong!',
	},
];

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

(async () => {
	try {
		console.log('Atualizando e adicionado comando slash');

		await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

		console.log('Comando slash adicionado e atualizado');
	} catch (error) {
		console.error(error);
	}
})();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
	console.log(`Rufando o bot ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
});

client.login(DISCORD_TOKEN);
