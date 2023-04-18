const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const {
	DISCORD_TOKEN,
	TWITTER_API_KEY,
	TWITTER_API_KEY_SECRET,
	TWITTER_ACCESS_TOKEN,
	TWITTER_ACCESS_TOKEN_SECRET,
	TWITTER_RAPHAEL_USER,
} = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const foldersInCommandsDir = fs.readdirSync(foldersPath);

for (const folder of foldersInCommandsDir) {
	const commandsPath = path.join(foldersPath, folder);
	const filesInCommandsDir = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith('.js'));

	for (const file of filesInCommandsDir) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		'data' in command && 'execute' in command
			? client.commands.set(command.data.name, command)
			: console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
			  );
	}
}

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(
			`O comando ${interaction.commandName} provavelmente não existe.`,
		);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}
});

// const Twit = require('twit');
// const Discord = require('discord.js');
// const cliente = new Discord.WebhookClient({
// 	id: '1097697190144651274',
// 	token: '036cEDgnunEUGDfWzYOsHrtd3DSK-7kGE1n1xT6C9KDM5Z3j5S6qZlplTRoNVC9FNOJ3',
// });

// const T = new Twit({
// 	consumer_key: TWITTER_API_KEY,
// 	consumer_secret: TWITTER_API_KEY_SECRET,
// 	access_token: TWITTER_ACCESS_TOKEN,
// 	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
// });

// T.get(
// 	'statuses/user_timeline',
// 	{ screen_name: 'Sr4m', count: 10 },
// 	(err, data, response) => {
// 		if (err) {
// 			console.log('Erro:', err);
// 		} else {
// 			console.log('Tweets:', data);
// 		}
// 	},
// );

client.once(Events.ClientReady, (c) => {
	console.log(`Runfando ${c.user.tag}`);
});

client.login(DISCORD_TOKEN);
