const { EmbedBuilder } = require('discord.js');

module.exports = {
    DESCRIPTION: "Recarga los archivos del bot.",
    OWNER: true,
    async execute(client, message, args, prefix){
        let opcion = "Comands, Events, Handlers";

        try {

            switch (args[0]?.toLowerCase()) {
                case "commands":
                case "comandos":
                    opcion = "Comands"
                    await client.loadCommands();
                    break;
            
                case "slashcommands":
                case "slash":
                    opcion = "Slash Comands"
                    await client.loadSlashCommands();
                    break;
            
                case "events":
                case "eventos":
                    opcion = "Events"
                    await client.loadEvents();
                    break;

                case "handlers":
                    opcion = "Handlers"
                    await client.loadHandlers();
                    break;
            
                default:
                    await client.loadEvents();
                    await client.loadHandlers();
                    await client.loadSlashCommands();
                    await client.loadCommands();
                    break;
            }

            message.reply({
                embeds: [
                    new EmbedBuilder()
                    .addFields({name: `✅ ${opcion} Recargados!`, value: `> *Okay!*`})
                    .setColor(process.env.COLOR)
                ]
            });
            
        } catch (e) {
            message.reply({content: `**Ha ocurrido un error al recargar los archivos!**\n*Mira la consola para mas detalle!*`})
            console.log(e);
        }
    }
}