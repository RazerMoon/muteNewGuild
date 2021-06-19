const { Plugin } = require('powercord/entities');
const { FluxDispatcher, getModule } = require('powercord/webpack');
const Settings = require('./ui/Settings.jsx');

/**
 * Automatically mutes newly joined guilds
 * @link https://github.com/RazerMoon/muteNewGuild
 * @license MIT
 * @extends Plugin
 */
module.exports = class MuteNewGuild extends Plugin {
  startPlugin () {
    powercord.api.settings.registerSettings(this.entityID, {
      category: this.entityID,
      label: 'Mute New Guild',
      render: Settings
    });
    FluxDispatcher.subscribe('INVITE_ACCEPT_SUCCESS', this.handleInvite);
  }

  handleInvite ({ invite: { guild: { id } } }) {
    getModule([ 'updateGuildNotificationSettings' ]).then(({ updateGuildNotificationSettings }) => {
      updateGuildNotificationSettings(id, { muted: this.settings.get('muted', true),
        suppress_everyone: this.settings.get('suppress_everyone', false),
        suppress_roles: this.settings.get('suppress_roles', false),
        mobile_push: this.settings.get('mobile_push', true) });
    });
  }

  pluginWillUnload () {
    powercord.api.settings.unregisterSettings(this.entityID);
    FluxDispatcher.unsubscribe('INVITE_ACCEPT_SUCCESS', this.handleInvite);
  }
};
