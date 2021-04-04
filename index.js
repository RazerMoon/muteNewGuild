const { Plugin } = require('powercord/entities');
const { FluxDispatcher, getModule } = require('powercord/webpack');

/**
 * Automatically mutes newly joined guilds
 * @link https://github.com/RazerMoon/muteNewGuild
 * @license MIT
 * @extends Plugin
 */
module.exports = class MuteNewGuild extends Plugin {
  startPlugin () {
    FluxDispatcher.subscribe('INVITE_ACCEPT_SUCCESS', this.handleInvite);
  }

  handleInvite ({ invite: { guild: { id } } }) {
    getModule([ 'updateGuildNotificationSettings' ]).then(({ updateGuildNotificationSettings }) => {
      updateGuildNotificationSettings(id, { muted:!0 });
    });
  }

  pluginWillUnload () {
    FluxDispatcher.unsubscribe('INVITE_ACCEPT_SUCCESS', this.handleInvite);
  }
};
