var bot = null,
    api = null,
    TelegramBot = require('tgfancy');

var sendMessage = function(message, thread, opts) {
    bot.sendMessage(thread, message, opts);
};

exports.getApi = function() {
    return api;
};

exports.start = function(callback) {
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

    bot.on('message', function(msg) {
        if (bot._polling.offset < exports.config.offset) {
        // Fixes issue where a duplicate message is received after restart
            return;
        }
        // Increments & persist the offset value
        var offset = bot._polling.offset + 1;
        exports.config.offset = offset;

        var event = shim.createEvent(msg.chat.id, msg.from.id, msg.from.username, msg.text);
        callback(api, event);
    });
};

exports.stop = function() {
    console.log('In stop: ' + exports.config.offset);
    console.debug('Telegram -> start shutdown');
};
