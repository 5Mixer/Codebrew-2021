import { WebClient } from "@slack/web-api";
import { RTMClient } from "@slack/rtm-api";
import { Bot, User, Channel } from "./bot.js";

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
            catch (error) {}
        })();
    };

    this.update_channel_list = function () {
        (async () => {
            try {
                this.channels = (
                    await this.client.conversations.list()
                ).channels;
            }
            catch {

            }
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

    this.get_content = function(event) {
        return event.text;
    };

    this.get_user = function(event) {
        let user_name;
        
        let match = this.users.filter(u => u.id === event.user);
        if (match.length === 0) {
            this.update_user_list()
            user_name = "";
        }
        else {
            user_name = match[0].name; 
        }


        return new User(
            event.user,
            user_name,
            c => this.send_message_to_channel(c, event.user)
        );
    };

    this.get_channel = function(event) {
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
            c => this.send_message_to_channel(c, event.channel)
        );
    };

    this._handle_message = function(event) {
        if (event.bot_profile === undefined) {
            this.handle_message(event);
        }
    }

    this.start = function () {
        this.client = new WebClient(this.token);
        this.rtm = new RTMClient(this.token);

        this.update_channel_list();
        this.update_user_list();

        this.rtm.on("message", e => this._handle_message(e));
        this.rtm.on("reaction_added", e => this.handle_reaction(e));

        (async () => {
            const { self, team } = await this.rtm.start();
            this.handle_ready();
        })();
    };
}

export default SlackBot;
