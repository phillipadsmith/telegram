"use strict";

var TelegramBot = require('tgfancy'),
bot,
api,
shim;

var sendMessage = function(message, thread, opts) {
    bot.sendMessage(thread, message, opts);
};

exports.getApi = function() {
    return api;
};

exports.load = function() {
};


exports.start = function() {
};

exports.unload = function() {
};

exports.stop = function() {
    console.debug('Telegram -> start shutdown');
};
