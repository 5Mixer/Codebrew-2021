import { WebClient } from "@slack/web-api";
import { RTMClient } from "@slack/rtm-api";
import emojiDictionary from "emoji-dictionary";
import {
    Bot, User, Channel, ReactedMessage, Message, NewUserMessage
} from "./bot.js";

export function SlackBot(events, token) {
    Bot.call(this, events, token, "Slack");
    this.channels = [];
    this.users = [];

    this.send_message_to_channel = function (content, channel) {
        (async () => {
            try {
                await this.client.chat.postMessage({
                    text: content,
                    channel: channel
                });
            }
            catch {}
        })();
    };

    this.add_reaction_to_message = function (emoji, channel, timestamp) {
        (async () => {
            try {
                if (!/^[a-z0-9_]*$/.test(emoji)) {
                    emoji = emojiDictionary.getName(emoji) || emoji;
                }

                await this.client.reactions.add({
                    name: emoji,
                    channel: channel,
                    timestamp: timestamp
                });
            }
            catch (erorr) {
                console.log(`Error reacting to slack message: ${erorr}`);
            }
        })();
    };

    this.update_channel_list = function () {
        (async () => {
            try {
                this.channels = (
                    await this.client.conversations.list()
                ).channels;
            }
            catch {}
        })();
    };

    this.update_user_list = function () {
        (async () => {
            try {
                this.users = (
                    await this.client.users.list()
                ).members;
            }
            catch {

            }
        })();
    };

    this.get_user_name_from_id = function (user_id) {
        let match = this.users.filter(u => u.id === user_id);
        if (match.length === 0) {
            this.update_user_list()
            return "";
        }
        else {
            return match[0].name; 
        }
    };

    this.get_content = function (event) {
        return event.text;
    };

    this.get_user = function (event) {
        return new User(
            event.user,
            this.get_user_name_from_id(event.user),
            c => this.send_message_to_channel(String(c), event.user)
        );
    };

    this.get_channel = function (event) {
        let channel_name;
        
        let match = this.channels.filter(c => c.id === event.channel);
        if (match.length === 0) {
            this.update_channel_list()
            channel_name = "";
        }
        else {
            channel_name = match[0].name; 
        }

        return new Channel(
            event.channel,
            channel_name,
            c => this.send_message_to_channel(String(c), event.channel)
        );
    };

    this.get_react = function (event) {
        return e => this.add_reaction_to_message(e, event.channel, event.ts);
    };

    this.get_reacted_message = function (event) {
        return new ReactedMessage(
            new Message(
                "",
                new User(),
                this.get_channel(event.item),
                this.get_react(event.item)
            ),
            event.reaction,
            this.get_user(event)
        );
    };

    this.get_new_user_message = function (event) {
        return new NewUserMessage(
            new Message(
                "",
                new User(
                    event.inviter,
                    this.get_user_name_from_id(event.inviter),
                    c => this.send_message_to_channel(String(c), event.inviter)
                ),
                this.get_channel(event)
            ),
            this.get_user(event)
        );
    };

    this._handle_message = function (event) {
        if (event.bot_profile === undefined) {
            this.handle_message(event);
        }
    };

    this._handle_reaction = function (event) {
        if (event.user !== this.id) {
            this.handle_reaction(event);
        }
    };

    this.start = function () {
        this.client = new WebClient(this.token);
        this.rtm = new RTMClient(this.token);

        this.update_channel_list();
        this.update_user_list();

        this.rtm.on("message", e => this._handle_message(e));
        this.rtm.on("reaction_added", e => this._handle_reaction(e));
        this.rtm.on("member_joined_channel", e => this.handle_new_user(e));

        (async () => {
            const { self, team } = await this.rtm.start();
            
            this.id = self.id;
            this.name = self.name;

            this.handle_ready();
        })();
    };

    this.stop = function () {
        this.rtm.disconnect();
    };
}

export default SlackBot;
