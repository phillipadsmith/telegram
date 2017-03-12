"use strict";

var TelegramBot = require('tgfancy'),
bot,
api,
shim;


exports.getApi = function() {
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


exports.start = function() {
};

exports.unload = function() {
};

exports.stop = function() {
    console.debug('Telegram -> start shutdown');
};
