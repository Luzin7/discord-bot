const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('frase-do-dia')
		.setDescription('Gerar uma frase aleatória para um usuário.')
		.addStringOption((option) =>
			option
				.setName('user')
				.setDescription('O usuário para quem gerar a frase.')
				.setRequired(true),
		),
	async execute(interaction) {
		const userMentioned = interaction.options.getString('user');
		const phrases = [
			`${userMentioned} é mais esquisito que um unicórnio de três pernas.`,
			`Se a esquisitice fosse uma competição, ${userMentioned} seria o campeão mundial.`,
			`Até mesmo as paredes evitam ficar próximas a ${userMentioned} por causa de sua esquisitice.`,
			`Se você procurar 'esquisito' no dicionário, encontrará uma foto de ${userMentioned}.`,
			`${userMentioned} é tão esquisito que parece que ele foi criado em um laboratório secreto.`,
			`Eu nunca vi alguém tão esquisito quanto ${userMentioned}, e olha que já vi muita coisa.`,
			`${userMentioned} é como um personagem de desenho animado esquisito que ganhou vida.`,
			`A esquisitice de ${userMentioned} é tão grande que poderia causar uma pane no Matrix.`,
			`Acho que até mesmo os aliens acham a esquisitice de ${userMentioned} assustadora.`,
			`${userMentioned} é o tipo de pessoa que faz você questionar a humanidade.`,
		];
		const randomIndex = Math.floor(Math.random() * phrases.length);
		const randomPhrase = phrases[randomIndex];
		await interaction.reply(randomPhrase);
	},
};
