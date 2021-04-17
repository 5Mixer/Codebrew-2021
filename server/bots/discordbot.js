import Discord from "discord.js";
import {Bot, User, Channel} from "./bot.js";

export function DiscordBot(events, token) {
    Bot.call(this, events, token, "Discord");

    this.get_content = function (event) {
        return event.content;
    };

    this.get_user = function (event) {
        console.log(event.author);
        return new User(
            event.author.id,
            event.author.username,
            c => event.author.send(c)
        );
    };

    this.get_channel = function (event) {
        return new Channel(
            event.channel.id,
            event.channel.name,
            c => event.channel.send(c)
        );
    };

    this._handle_reaction = function (message_reaction, user) {
        console.log(message_reaction, user);
    };

    this.start = function () {
        let client;
        if (events.onreaction) {
            client = new Discord.Client({
                ws: {
                    intents: new Discord.Intents(Discord.Intents.ALL)
                }
            });
        }
        else {
            client = new Discord.Client();
        }

        client.on("ready", () => this.handle_ready());
        client.on(
            "message",
            e => {
                if (!e.author.bot) {
                    this.handle_message(e);
                }
            }
        );
        client.on(
            "messageReactionAdd",
            (mr, u) => this._handle_reaction(mr, u)
        );
        client.on(
            "messageReactionRemove",
            (mr, u) => this._handle_reaction(mr, u)
        );
        client.on("channelCreate", (c) => console.log("yep", c));

        client.login(this.token);
    };
}

export default DiscordBot;
