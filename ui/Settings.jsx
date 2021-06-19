const { React } = require('powercord/webpack');
const { SwitchItem } = require('powercord/components/settings');

module.exports = ({ getSetting, toggleSetting }) => (
  <div>
    <SwitchItem
      value={getSetting('muted', true)}
      onChange={() => toggleSetting('muted')}
    >
      Mute
    </SwitchItem>
    <SwitchItem
      value={getSetting('suppress_everyone', false)}
      onChange={() => toggleSetting('suppress_everyone')}
    >
      Suppress Everyone
    </SwitchItem>
    <SwitchItem
      value={getSetting('suppress_roles', false)}
      onChange={() => toggleSetting('suppress_roles')}
    >
      Suppress Roles
    </SwitchItem>
    <SwitchItem
      value={getSetting('mobile_push', true)}
      onChange={() => toggleSetting('mobile_push')}
    >
      Mobile Push
    </SwitchItem>
    <SwitchItem
      value={getSetting('dms', true)}
      onChange={() => toggleSetting('dms')}
    >
      Direct Messages
    </SwitchItem>
  </div>
);
