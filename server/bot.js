const Discord = require("discord.js");
const { WebClient } = require("@slack/web-api");
const { createEventAdapter } = require("@slack/events-api");

// Supported events:
//  - onmessage(message)
//  - onready()


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
const SLACK_PORT = 3000;

function Bot(events, token) {
    this.events = events;
    this.token = token;

    this.start = function () { 
        throw new TypeError("Abstract Bot start method not implemented.");
    };

    return this;
}

function DiscordBot(events, token) {
    Bot.call(this, events, token);

    this.start = function () {
        const client = new Discord.Client();

        client.on("message", this.events.onmessage);
        client.on("ready", this.events.onready);
        
        client.login(this.token);
    };

    return this;
}

function SlackBot(events, token, signing_secret) {
    Bot.call(this, events, token);

    this.start = function () {
        const client = new WebClient(this.token);
        const events = new createEventAdapter(signing_secret);

        events.on("message", this.events.onmessage);

        (async() => {
            await events.start(SLACK_PORT);
            this.events.onready();
        })();
    };

    return this;
}


events = {
    onmessage: msg => console.log(msg),
    onready: () => console.log(`Logged in!`)
};

DiscordBot(events, DISCORD_TOKEN).start();
SlackBot(events, SLACK_TOKEN, SLACK_SIGNING_SECRET).start();

// exports.DiscordBot = DiscordBot;
// exports.SlackBot = SlackBot;
