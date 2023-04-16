const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		await interaction.reply(
			`Quer saber sobre ${interaction.user.username}? Até agora só me informaram que entrou no servidor em: ${interaction.member.joinedAt}.`,
		);
		await interaction.followUp('Pong again!');
	},
};
