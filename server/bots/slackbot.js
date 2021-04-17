import {WebClient} from "@slack/web-api";
import {createEventAdapter} from "@slack/events-api";
import {Bot, User, Channel} from "./bot.js";

const SLACK_PORT = 3000;

export function SlackBot(events, token, signing_secret) {
    Bot.call(this, events, token);

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
        const eventapi = createEventAdapter(signing_secret);

        eventapi.on("message", event => this._handle_message(event));

        (async() => {
            await eventapi.start(SLACK_PORT);
            this.events.onready();
        })();
    };
}

export default SlackBot;
