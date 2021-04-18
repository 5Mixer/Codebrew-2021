import Discord from "discord.js";
import {Bot, User, Channel, ReactedMessage} from "./bot.js";

export function DiscordBot(events, token) {
    Bot.call(this, events, token, "Discord");

    this.get_content = function (event) {
        return event.content || "";
    };

    this.get_user = function (event) {
        let user = event.author ? event.author : event.user ? event.user :
            {
                id: "",
                username: "",
                send: _ => {}
            };

        return new User(
            user.id || "",
            user.username || "",
            c => user.send(String(c))
        );
    };

    this.get_channel = function (event) {
        return new Channel(
            event.channel.id,
            event.channel.name || "",
            event.channel ? c => event.channel.send(String(c)) : _ => {}
        );
    };

    this.get_react = function (event) {
        return event ? e => event.react(e) : _ => {};
    };

    this.get_reacted_message = function (event) {
        return new ReactedMessage(
            event.message ? this.get_message(event.message) : null,
            event.emoji.toString() || "",
            this.get_user(event)
        );
    };

    this._handle_reaction = function (message_reaction, user) {
        if (!user.bot) {
            let event = message_reaction;
            event.user = user;
            this.handle_reaction(event);    
        }
    };

    this.start = function () {
        let client = new Discord.Client({
            ws: { intents: new Discord.Intents(Discord.Intents.ALL) },
            partials: [
                "USER",
                "MESSAGE",
                "CHANNEL",
                "REACTION",
                "GUILD_MEMBER"
            ]
        });

        client.on("ready", () => {
            this.id = client.user.id;
            this.name = client.user.username;

            this.handle_ready();
        });
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
        // client.on(
        //     "messageReactionRemove",
        //     (mr, u) => this._handle_reaction(mr, u)
        // );
        // client.on("channelCreate", (c) => console.log("Channel created."));

        client.login(this.token);
    };

    this.stop = function () {
        this.client.destroy();
    };
}

export default DiscordBot;
