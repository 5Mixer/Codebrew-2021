const SlackBot = require("./slackbot.js");
const DiscordBot = require("./discordbot.js");

"use strict";

// For a discord bot, we just need to have the token
const DISCORD_TOKEN = 
    "ODMyNzg1OTE3NTg3NjE5ODQy.YHo2Uw.aih_cwH8anSxPfJsQK_CSJlSIrw";

// For a slack bot we need to have a token and a signing secret
// we also need a public facing url for slack to send events to, with url
// configured in slack api settings.
//
// ngrok can be used to get a temporary address for development.
const SLACK_TOKEN = "xoxb-1973452657939-1973244987282-TnaXL7iTXby6peBT4w4HwAQ0";
const SLACK_SIGNING_SECRET = "0c78b2ba8c3b9f328e531483c5faa88d";

events = {
    onmessage: msg => {
        console.log(msg.content);
        msg.channel.send(msg.content);
    },
    onready: () => console.log(`Logged in!`)
};

const discord = new DiscordBot(events, DISCORD_TOKEN);
const slack = new SlackBot(events, SLACK_TOKEN, SLACK_SIGNING_SECRET);

discord.start();
slack.start();

// exports.DiscordBot = DiscordBot;
// exports.SlackBot = SlackBot;
