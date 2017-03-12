var bot = null,
    api = null,
    TelegramBot = require('tgfancy');


var sendMessage = function(message, thread, opts) {
    bot.sendMessage(thread, message, opts);
};

exports.getApi = function() {
    return api;
};

exports.load = function() {
    var token = exports.config.token;
    bot = new TelegramBot(token, {
        // all options to 'tgfancy' MUST be placed under the
        // 'tgfancy' key, as shown below
        tgfancy: {
            polling: "true",
        },
    });

    api = shim.createIntegration({
        sendMessage: sendMessage,
        commandPrefix: exports.config.commandPrefix
    });
};

exports.start = function(callback) {
    bot.on('message', function(msg) {
        var event = shim.createEvent(msg.chat.id, msg.from.id, msg.from.username, msg.text);
        callback(api, event);
    });
};

exports.unload = function() {
    console.debug('Telegram -> Unloading module.');
};

exports.stop = function() {
    console.debug('Telegram -> start shutdown');
};

