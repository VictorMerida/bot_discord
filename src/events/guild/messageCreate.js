module.exports = async (client, message) => {
    if(!message.guild || !message.channel || message.author.bot) return;

    const GUILD_DATA = await client.db.getGuildData(message.guild.id);

    if(!message.content.startsWith(GUILD_DATA.prefix)) return;

    const ARGS = message.content.slice(GUILD_DATA.prefix.length).trim().split(/ +/);
    const CMD = ARGS?.shift()?.toLowerCase();

    const COMANDO = client.commands.get(CMD) || client.commands.find(c => c.ALIASES && c.ALIASES.includes(CMD));

    if(COMANDO){
        if(!COMANDO.OWNER){
            const DUEÑOS = process.env.OWNER_IDS.split(" ");
            if(!DUEÑOS.includes(message.author.id)) return message.reply({content: `❌ **Solo los dueños de este bot pueden ejecutar este comando!**\nDueños del bot: ${DUEÑOS.map(DUEÑO => `<@${DUEÑO}>`).join(", ")}`, ephimeral: true});
        }

        if(!COMANDO.BOT_PERMISSIONS){
            if(message.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return message.reply({content: `❌ **Necesito los siguientes permisos para ejecutar el comando**\n${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`, ephimeral: true});
        }

        if(!COMANDO.PERMISSIONS){
            if(message.member.permissions.has(COMANDO.PERMISSIONS)) return message.reply({content: `❌ **Necesitas los siguientes permisos para ejecutar el comando**\n${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(", ")}`, ephimeral: true});
        }

        try {
            COMANDO.execute(client, message, ARGS, GUILD_DATA.prefix, GUILD_DATA);
        } catch (e) {
            message.reply({content: `**Ha ocurrido un error al ejecutar el comando \`${COMANDO.NAME}\`!**\n*Mira la consola para mas detalle!*`, ephimeral: true});
            console.log(e);
            return;
        }
    }
}