import SlackBot from "./slackbot.js";
import DiscordBot from "./discordbot.js";

const DISCORD_TOKEN = 
    "ODMyNzg1OTE3NTg3NjE5ODQy.YHo2Uw.aih_cwH8anSxPfJsQK_CSJlSIrw";

const SLACK_TOKEN = "xoxb-1973452657939-1973244987282-TnaXL7iTXby6peBT4w4HwAQ0";
const SLACK_SIGNING_SECRET = "0c78b2ba8c3b9f328e531483c5faa88d";

export function handle_bot_upload(body) {
    body.discord_token = DISCORD_TOKEN;
    body.slack_token = SLACK_TOKEN;
    body.slack_signing_secret = SLACK_SIGNING_SECRET;

    let events = {};

    try {
        eval(decodeURI(body.js));
    }
    catch (error) {
        return [];
    }

    let new_bots = [];

    if (body.discord_token) {
        const discord_bot = new DiscordBot(events, DISCORD_TOKEN);
        discord_bot.start();
        new_bots.append(discord_bot);
    }

    if (body.slack_token && body.slack_signing_secret) {
        const slack_bot = new SlackBot(
            events, SLACK_TOKEN, SLACK_SIGNING_SECRET
        );
        slack_bot.start();
        new_bots.append(slack_bot);
    }

    return new_bots;
}
