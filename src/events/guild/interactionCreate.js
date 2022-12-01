module.exports = async (client, interaction) => {
    if(!interaction.guild || !interaction.channel) return;

    const GUILD_DATA = await client.db.getGuildData(interaction.guild.id);

    const COMANDO = client.slashCommands.get(interaction?.commandName);

    if(COMANDO){
        if(COMANDO.OWNER){
            const DUEÑOS = process.env.OWNER_IDS.split(" ");
            if(!DUEÑOS.includes(interaction.author.id)) return interaction.reply({content: `❌ **Solo los dueños de este bot pueden ejecutar este comando!**\nDueños del bot: ${DUEÑOS.map(DUEÑO => `<@${DUEÑO}>`).join(", ")}`, ephimeral: true});
        }

        if(COMANDO.BOT_PERMISSIONS){
            if(!interaction.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return interaction.reply({content: `❌ **Necesito los siguientes permisos para ejecutar el comando**\n${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`, ephimeral: true});
        }

        if(COMANDO.PERMISSIONS){
            if(!interaction.member.permissions.has(COMANDO.PERMISSIONS)) return interaction.reply({content: `❌ **Necesitas los siguientes permisos para ejecutar el comando**\n${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`, ephimeral: true});
        }

        try {
            COMANDO.execute(client, interaction, "/", GUILD_DATA)
        } catch (e) {
            interaction.reply({content: `**Ha ocurrido un error al ejecutar el comando!**\n*Mira la consola para mas detalle!*`, ephimeral: true});
            console.log(e);
            return;
        }
    }
}