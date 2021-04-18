import SlackBot from "./slackbot.js";
import DiscordBot from "./discordbot.js";

"use strict";

// the onreaction event on discord doesn't seem to work.
const DISCORD_TOKEN = 
    "ODMyNzg1OTE3NTg3NjE5ODQy.YHo2Uw.aih_cwH8anSxPfJsQK_CSJlSIrw";
const SLACK_TOKEN = "xoxb-1973452657939-1973888738739-aOoOZVh1p65qPGgR977CuMZZ";

let events = {
    onmessage: (msg) => {
        msg.channel.send(msg.content);
    },
    onready: i => console.log(`Logged in as ${i}!`),
    onreact: rm => rm.react(rm.emoji)
};

const discord = new DiscordBot(events, DISCORD_TOKEN);
const slack = new SlackBot(events, SLACK_TOKEN);

discord.start();
slack.start();
