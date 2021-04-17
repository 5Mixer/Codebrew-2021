import SlackBot from "./slackbot.js";
import DiscordBot from "./discordbot.js";

const DISCORD_TOKEN = 
    "ODMyNzg1OTE3NTg3NjE5ODQy.YHo2Uw.aih_cwH8anSxPfJsQK_CSJlSIrw";

const SLACK_TOKEN = "xoxb-1973452657939-1973244987282-TnaXL7iTXby6peBT4w4HwAQ0";
const SLACK_SIGNING_SECRET = "0c78b2ba8c3b9f328e531483c5faa88d";

export function handle_bot_upload(body) {
    console.log(decodeURI(body.js));

    let events = {};
    eval(decodeURI(body.js));

    console.log("Events:", events);

    const discordbot = new DiscordBot(events, DISCORD_TOKEN);
    // const slackbot = new SlackBot(events, SLACK_TOKEN, SLACK_SIGNING_SECRET);
    discordbot.start();
    // slackbot.start();
}
