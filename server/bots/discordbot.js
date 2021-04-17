const Discord = require("discord.js");
const bot = require("./bot.js");

function DiscordBot(events, token) {
    bot.Bot.call(this, events, token);

    this.get_content = function (event) {
        return event.content;
    };

    this.get_user = function (event) {
        return new bot.User(
            event.author.id,
            c => event.author.send(c)
        );
    };

    this.get_channel = function (event) {
        return new bot.Channel(
            event.channel.id,
            c => event.channel.send(c)
        );
    };

    this.start = function () {
        let client = new Discord.Client();
        client.on(
            "message",
            e => {
                if (!e.author.bot) {
                    this.handle_message(e);
                }
            }
        );
        client.on("ready", this.events.onready);
        
        client.login(this.token);
    };
}

module.exports = DiscordBot;
