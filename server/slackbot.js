const { WebClient } = require("@slack/web-api");
const { createEventAdapter } = require("@slack/events-api")

BOT_TOKEN = "xoxb-1973452657939-1973244987282-TnaXL7iTXby6peBT4w4HwAQ0";
SIGNING_SECRET = "0c78b2ba8c3b9f328e531483c5faa88d";

PORT = 3000

const web = new WebClient(BOT_TOKEN);
const events = createEventAdapter(SIGNING_SECRET);

events.on("message", event => {
    console.log(`Event received! User: ${event.user} in ${event.channel} says ${event.text}`)
});

events.on("error", console.error);

(async() => {
    const server = await events.start(PORT);
    console.log(`Listening on ${server.address().port}!`);
})();


(async () => {
    try {
        await web.chat.postMessage({
            channel: "#general",
            text: "TEST MESSAGE"
        });
    }
    catch (error) {
        console.log(error);
    }

    console.log("Message posted!");
})();
