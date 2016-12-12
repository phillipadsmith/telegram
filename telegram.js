var bot = null,
    api = null,
    offset = null,
    TelegramBot = require('tgfancy'),
    Configstore = require('configstore'),
    pkg = require('./kassy.json');

var config = new Configstore('concierge-' + pkg.name, {foo: 'bar'});

var sendMessage = function(message, thread, opts) {
    bot.sendMessage(thread, message, opts);
};

exports.getApi = function() {
    return api;
};

exports.load = function() {
    var token = exports.config.token;
    offset = config.get('offset');
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

        if (bot._polling.offset < offset) {
        // Fixes issue where a duplicate message is received after restart
            console.debug('Skipping this message');
            return;
        }
        // Increments & persist the offset value
        offset = bot._polling.offset + 1;

        var event = shim.createEvent(msg.chat.id, msg.from.id, msg.from.username, msg.text);
        callback(api, event);
    });
};

exports.unload = function() {
    config.set('offset', offset);
    console.debug('In stop: ' + config.get('offset'));
};

exports.stop = function() {
    console.debug('Telegram -> start shutdown');
};
