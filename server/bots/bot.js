// Supported events:
//  - onmessage(message)
//  - onreaction(reaction)
//  - onready(info)

export function User(id, send) {
    this.id = id;
    this.send = send;

    return this;
}

export function Channel(id, send) {
    this.id = id;
    this.send = send;
    
    return this;
}

export function Message(content, author, channel) {
    this.content = content;
    this.author = author;
    this.channel = channel;
    
    return this;
}

export function Reaction(message, emoji, user, count) {
    this.message = message;
    this.emoji = emoji;
    this.user = user;
    this.count = count;

    return this;
}

export function Bot(events, token) {
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
        // Get a Message object from an event received by this bot.

        return new Message(
            this.get_content(event),
            this.get_user(event),
            this.get_channel(event)
        );
    };

    this.get_reaction = function (event) {
        // Get a Reaction object from an event received by this bot.

        return new Reaction(new Message(event), null, null, null);
    }

    this.handle_message = function (event) {
        if (this.events.onmessage) {
            this.events.onmessage(this.get_message(event));
        }
    };

    this.start = function () { 
        // Start this bot listening for events.

        throw new TypeError("Abstract Bot start method not implemented.");
    };
}
