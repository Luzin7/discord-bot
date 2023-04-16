const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const { DISCORD_TOKEN } = process.env;

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

client.once(Events.ClientReady, (c) => {
	console.log(`Runfando ${c.user.tag}`);
});

client.login(DISCORD_TOKEN);
