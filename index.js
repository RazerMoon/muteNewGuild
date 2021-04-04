const { Plugin } = require('powercord/entities');
const { FluxDispatcher } = require('powercord/webpack');

/**
 * Automatically mutes newly joined guilds
 * @link TODO
 * @license MIT
 * @extends Plugin
 */
module.exports = class MuteNewGuild extends Plugin {
  startPlugin () {
    FluxDispatcher.subscribe('INVITE_ACCEPT_SUCCESS', this.handleInvite);
  }

  handleInvite (event) {
    console.dir(event);
  }

  pluginWillUnload () {
    FluxDispatcher.unsubscribe('INVITE_ACCEPT_SUCCESS', this.handleInvite);
  }
};
