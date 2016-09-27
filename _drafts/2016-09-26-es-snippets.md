state => ({state})

const toggleEditMode = ((bool) =>
  data(type.settingsTypes.SETTINGS_TOGGLE_EDIT_MODE, bool)
);

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()+s4()}-${s4()}-${s4()}-${s4()}-${s4()+s4()+s4()}`;
}

function todoApp(state = initialState, action) {
// Пока не обрабатываем никаких действий
// и просто возвращаем состояние, которое приняли в качестве параметра
return state
}

enumTemplate = enumData.map((item, index) => {
  return (<option key={index} value={item.value}>{item.name}</option>)
});

var old = {
  new: 2
}

var obj = {...old, new:343, new2}

p => ({ foo: 'bar' });
