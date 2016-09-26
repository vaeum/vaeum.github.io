state => ({state})

const toggleEditMode = ((bool) =>
  data(type.settingsTypes.SETTINGS_TOGGLE_EDIT_MODE, bool)
);

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()+s4()}-${s4()}-${s4()}-${s4()}-${s4()+s4()+s4()}`;
}
