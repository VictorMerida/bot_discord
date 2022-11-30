const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Recarga los archivos del bot.")
    .addStringOption(option => 
        option.setName("modulo")
        .setDescription("Modulo a recargar")
        .addChoices(
            {name: "Commands", value: "comandos"},
            {name: "Slash Commands", value: "slash"},
            {name: "Events", value: "events"},
            {name: "Handlers", value: "handlers"},
        )
    ),

    async execute(client, interaction, prefix){
        let args = interaction.options.getString("modulo")
        let opcion = "Comands, Events, Handlers";

        try {

            switch (args?.toLowerCase()) {
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

            interaction.reply({
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