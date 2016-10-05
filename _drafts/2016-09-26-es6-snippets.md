---
layout: post
title:  "Практическое примение ES6"
categories: JavaScript
tags: es6
---

Новый версия стандарта языка JavaScript вышла еще в июне 2015 года, 
и внесла много нововведений в синтаксис. Я хочу показать как можно 
пользоваться этой версией на практике. Начнем с того что полной поддержки 
в браузерах, на сегодняшний день, нет. Но нас выручает проект [Babel](https://babeljs.io) 
(нужен для конвертирования нового синтаксиса в старый, 
а где не справляется, то добавляются полифилы).

Сегодня разберем 

state => ({state})

const toggleEditMode = ((bool) =>
  data(type.settingsTypes.SETTINGS_TOGGLE_EDIT_MODE, bool)
);

```javascript
const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()+s4()}-${s4()}-${s4()}-${s4()}-${s4()+s4()+s4()}`;
}
```

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

#### Ссылки для 

Спецификация [ECMAScript](http://www.ecma-international.org/ecma-262/6.0/)
