import { WebClient } from "@slack/web-api";
import { RTMClient } from "@slack/rtm-api";
import { Bot, User, Channel } from "./bot.js";

export function SlackBot(events, token) {
    Bot.call(this, events, token, "Slack");

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

    this.get_content = function(event) {
        return event.text;
    };

    this.get_user = function(event) {
        return new User(event.user);
    };

    this.get_channel = function(event) {
        return new Channel(
            event.channel,
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

        this.rtm.on("message", e => this._handle_message(e));

        (async () => {
            const { self, team } = await this.rtm.start();
            this.handle_ready();
        })();
    };
}

export default SlackBot;
