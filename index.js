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
    this.handleInvite = this.handleInvite.bind(this);
    FluxDispatcher.subscribe('INVITE_ACCEPT_SUCCESS', this.handleInvite);
  }

  async handleDM (id) {
    const { getSanitizedRestrictedGuilds } = await getModule([ 'getSanitizedRestrictedGuilds' ]);
    const { updateRemoteSettings } = await getModule([ 'updateRemoteSettings' ]);

    const guilds = new Set(
      (0, getSanitizedRestrictedGuilds)()
    );

    if (this.settings.get('dms', true)) {
      guilds.delete(id);
    } else {
      guilds.add(id);
    }

    updateRemoteSettings({
      restrictedGuilds: Array.from(guilds)
    });
  }

  async handleInvite ({ invite: { guild: { id } } }) {
    const { updateGuildNotificationSettings } = await getModule([ 'updateGuildNotificationSettings' ]);

    updateGuildNotificationSettings(id, { muted: this.settings.get('muted', true),
      suppress_everyone: this.settings.get('suppress_everyone', false),
      suppress_roles: this.settings.get('suppress_roles', false),
      mobile_push: this.settings.get('mobile_push', true) });

    // this.handleDM(id);
  }

  pluginWillUnload () {
    powercord.api.settings.unregisterSettings(this.entityID);
    FluxDispatcher.unsubscribe('INVITE_ACCEPT_SUCCESS', this.handleInvite);
  }
};
