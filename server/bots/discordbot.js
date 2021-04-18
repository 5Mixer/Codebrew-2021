import Discord from "discord.js";
import emojiDictionary from "emoji-dictionary";
import Long from "long";
import {
    Bot, User, Channel, ReactedMessage, NewUserMessage, Message
} from "./bot.js";

export function DiscordBot(events, token) {
    Bot.call(this, events, token, "Discord");

    this.get_default_channel = function (guild) {
        let channel;
        if (guild.channels.cache.has(guild.id)) {
            channel = guild.channels.cache.get(guild.id);
        }
        else {
            channel = guild.channels.cache.find(c => c.name === "general");
            if (!channel) {
                channel = guild.channels.cache
                .filter(c => c.type === "text" &&
                    c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
                .sort((a, b) => a.position - b.position || 
                    Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
                .first();    
            }
        }

        return new Channel(
            channel.id,
            channel.name,
            c => {
                try {
                    channel.send(String(c));
                }
                catch {}
            }
        );
    };

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
            c => {
                try {
                    user.send(String(c))
                }
                catch {}
            }
        );
    };

    this.get_channel = function (event) {
        return new Channel(
            event.channel.id,
            event.channel.name || "",
            event.channel ? c => {
                try {
                    event.channel.send(String(c))
                }
                catch {}
            } : _ => {}
        );
    };

    this.get_react = function (event) {
        return event ? e => {
            try {
                if (/^[a-z0-9_]*$/.test(e)) {
                    e = emojiDictionary.getUnicode(e);
                }

                event.react(e);
            }
            catch {}
        } : _ => {};
    };

    this.get_reacted_message = function (event) {
        return new ReactedMessage(
            event.message ? this.get_message(event.message) : null,
            event.emoji.toString() || "",
            this.get_user(event)
        );
    };

    this.get_new_user_message = function (event) {
        return new NewUserMessage(
            new Message(
                "",
                this.get_user(event),
                this.get_default_channel(event.guild)
            ),
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

    this._handle_new_user = function (member) {
        if (!member.bot) {
            this._handle_new_user(member);
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
        client.on(
            "guildMemberAdd",
            m => this._handle_new_user(m)
        );

        // other interesting events
        // "messageReactionRemove"(mr, u)
        // "channelCreate"(c)

        client.login(this.token);
    };

    this.stop = function () {
        this.client.destroy();
    };
}

export default DiscordBot;
