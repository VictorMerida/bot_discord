module.exports = {
    DESCRIPTION: "Sirve para ver el ping del bot",
    async execute(client, message, args, prefix, GUILD_DATA){
        return message.reply(`\`${client.ws.ping}ms\``)
    }

}