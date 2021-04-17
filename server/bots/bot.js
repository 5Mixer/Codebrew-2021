// Supported events:
//  - onmessage(content: str, author: User, channel: Channel, message_id: str)
//  - onready()

function User(id, send) {
    this.id = id;
    this.send = send;

    return this;
}

function Channel(id, send) {
    this.id = id;
    this.send = send;
    
    return this;
}

function Message(content, author, channel) {
    this.content = content;
    this.author = author;
    this.channel = channel;
    
    return this;
}

function Bot(events, token) {
    this.events = events;
    this.token = token;

    this.get_content = function (event) {
        // Get the text content of an event received by this bot.

        throw new TypeError("Abstract Bot get_content method not implemented.");
    }

    this.get_user = function (event) {
        // Get a User object from an event received by this bot.

        throw new TypeError("Abstract Bot get_user method not implemented.");
    };

    this.get_channel = function (event) {
        // Get a channel object from an event received by this bot.

        throw new TypeError("Abstract Bot get_channel method not implemented.");
    };

    this.get_message = function (event) {
        // Get a message object from an event received by this bot.

        return new Message(
            this.get_content(event),
            this.get_user(event),
            this.get_channel(event)
        );
    };

    this.handle_message = function (event) {
        console.log(event);

        if (this.events.onmessage) {
            this.events.onmessage(this.get_message(event));
        }
    };

    this.start = function () { 
        // Start this bot listening for events.

        throw new TypeError("Abstract Bot start method not implemented.");
    };
}

exports.User = User
exports.Channel = Channel
exports.Message = Message
exports.Bot = Bot
