// Supported events:
//  - onmessage(message)
//  - onreact(message, emoji, reacter)
//  - onready(info)

export function User(id="", name="", send=null) {
    this.id = id;
    this.name = name;
    this.send = send || (_ => {});

    this.toString = function () {
        return this.name;
    };

    return this;
}

export function Channel(id="", name="", send=null) {
    this.id = id;
    this.name = name;
    this.send = send || (_ => {});

    this.toString = function () {
        return this.name;
    };
    
    return this;
}

export function Message(content="", author=null, channel=null, react=null) {
    this.content = content;
    this.author = author || new User();
    this.channel = channel || new Channel();
    this.react = react || (_ => {});

    return this;
}

export function ReactedMessage(message, emoji, reacter) {
    if (message !== null) {
        Message.call(
            this,
            message.content,
            message.author,
            message.channel,
            message.react
        );
    }
    else {
        Message.call(this);
    }

    this.emoji = emoji;
    this.reacter = reacter;

    return this;
}

export function NewUserMessage(message, newuser) {
    if (message !== null) {
        Message.call(
            this,
            message.content,
            message.author,
            message.channel,
            message.react
        );
    }
    else {
        Message.call(this);
    }

    this.newuser = newuser;
}

export function Bot(events, token, type="Abstract") {
    this.type = type;
    this.events = events;
    this.token = token;
    this.id = null;
    this.name = null;

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

    this.get_react = function (event) {
        // Get method to react to a message from an event received by this bot.

        throw new TypeError("Abstract Bot get_react method not implemented.");
    };

    this.get_reacted_message = function (event) {
        // Get the message that was reacted to in a reaction event.

        throw new TypeError(
            "Abstract Bot get_reacted_message method not implemented."
        );
    };

    this.get_new_user_message = function (event) {
        // Get a dummy message with new user information.

        throw new TypeError(
            "Abstract Bot get_new_user_message method not implemented."
        );
    }

    this.get_message = function (event) {
        // Get a Message object from an event received by this bot.

        return new Message(
            this.get_content(event),
            this.get_user(event),
            this.get_channel(event),
            this.get_react(event)
        );
    };

    this.handle_message = function (event) {
        if (this.events.onmessage) {
            this.events.onmessage(this.get_message(event));
        }
    };

    this.handle_reaction = function (event) {
        if (this.events.onreact) {
            let reacted = this.get_reacted_message(event);
            this.events.onreact(reacted, reacted.emoji, reacted.reacter);
        }
    };

    this.handle_new_user = function (event) {
        if (this.events.onnewuser) {
            this.events.onnewuser(this.get_new_user_message(event));
        }
    };

    this.handle_ready = function () {
        if (this.events.onready) {
            this.events.onready(this.type);
        }
    };

    this.start = function () { 
        // Start this bot listening for events.

        throw new TypeError("Abstract Bot start method not implemented.");
    };

    this.stop = function () {
        // Stop the bot listening for events.

        throw new TypeError("Abstract Bot stop method not implemented.");
    };
}
