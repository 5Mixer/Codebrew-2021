import SlackBot from "./slackbot.js";
import DiscordBot from "./discordbot.js";

const DISCORD_TOKEN = 
    "ODMyNzg1OTE3NTg3NjE5ODQy.YHo2Uw.aih_cwH8anSxPfJsQK_CSJlSIrw";
const SLACK_TOKEN = "xoxb-1973452657939-1973888738739-aOoOZVh1p65qPGgR977CuMZZ";

export function handle_bot_upload(body) {
    body.discord_token = body.user.discord_token || DISCORD_TOKEN;
    body.slack_token = body.user.slack_token || SLACK_TOKEN;

    let events = {};

    try {
        eval(decodeURI(body.js));
    }
    catch (error) {
        console.log(`Error when evaling blockly code: ${error}`);
        return [];
    }

    let new_bots = [];

    try {
        if (body.discord_token) {
            const discord_bot = new DiscordBot(events, body.discord_token);
            discord_bot.start();
            new_bots.push(discord_bot);
        }
    }
    catch (error) {
        console.log(`Error when creating Discord bot: ${error}`);
    }

    try {
        if (body.slack_token) {
            const slack_bot = new SlackBot(events, body.slack_token);
            slack_bot.start();
            new_bots.push(slack_bot);
        }    
    }
    catch (error) {
        console.log(`Error when creating Slack bot: ${error}`);
    }

    console.log(`Created ${new_bots.length} new bots.`);
    return new_bots;
}
