---
title: Используем ES7 async/await сегодня вместе с Babel
layout: post
categories: Translation
tags: Babel
description: Перевод статьи "используем ES7 async/await сегодня вместе с Babel"
published: true
---

Возьмем кусок кода, который содержит пример async/await
[gist on github](https://gist.github.com/patrickarlt/8c56a789e5f185eb9722). Наша задача перевести его в ES5 (старую версию, которую понимают все браузеры),
а так же, мы можем его запустить в текущей версии NodeJS.

С помощью команды, которая находится в файле build.sh, мы можем преобразовать наш код.


### Установка Babel и Плагинов

Babel зависит от отдельных плагинов для преобразования и анализа кодов. Для
преобразования асинхронных функций мы будем использовать плагин `transform-regenerator`.
Нам также нужно добавить плагин синтаксиса async / await.
Иначе Babel не скомпилирует их. Кроме этого, мы также устанавливаем
ES2015, который включает в себя нормальный набор плагинов для преобразования ES6 в ES5.
Мы сохраним их, чтобы мы могли использовать в других проектах.

Для начала нам надо установить babel-cli глобально:

```shell
npm install -g babel-cli
```

Вот наш package.json файл, вы можете выполнить команду `npm install`:

```javascript
{
  "name": "awesome-async",
  "version": "1.0.0",
  "description": "",
  "main": "github.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-plugin-syntax-async-functions": "^6.1.4",
    "babel-plugin-transform-regenerator": "^6.1.4",
    "babel-polyfill": "^6.1.4",
    "babel-preset-es2015": "^6.1.4",
    "request": "^2.65.0"
  }
}
```

### Настройка Babel

Это наш файл `.babelrc`, его нужно положить в корень проекта:

```javascript
{
  "presets": ["es2015"],
  "plugins": ["syntax-async-functions","transform-regenerator"]
}
```

Этот файл поможет babel преобразовать наш код.

### Компилирование & Запуск

После установки всех зависимостей мы можем начать перевод из нового синтаксиса в
старый:

```shell
babel github.es6 -o github.js
node github.js
```

Вы можете столкнуться с такой проблемой:

```
/Users/masnun/Projects/awesome-async/github.js:34
  return regeneratorRuntime.async(function printPublicGists$(_context) {
         ^
ReferenceError: regeneratorRuntime is not defined
    at printPublicGists (/Users/masnun/Projects/node/github.js:34:10)
    at Object.<anonymous> (/Users/masnun/Projects/node/github.js:63:1)
    at Module._compile (module.js:460:26)
    at Object.Module._extensions..js (module.js:478:10)
    at Module.load (module.js:355:32)
    at Function.Module._load (module.js:310:12)
    at Function.Module.runMain (module.js:501:10)
    at startup (node.js:129:16)
    at node.js:814:3
```

Это потому, что мы должны добавить `regenerator runtime`. Этот runtime включен в
пакет babel-polyfill, который мы установили. Нам всего лишь надо добавить его в наш
код. И финальный файл github.es6 должен выглядеть примерно так:

```javascript
require("babel-polyfill");

import request from "request";

// promise returning function
function get (url){
  return new Promise(function(resolve, reject){
    request({
      method: 'GET',
      url: url,
      json: true,
      headers: {
        'User-Agent': 'request'
      }
    }, function(err, resp, body){
      if(err){
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

// create a new "async" function so we can use the "await" keyword
async function printPublicGists(){
  // "await" resolution or rejection of the promise
  // use try/catch for error handling
  try {
    var gists = await get('https://api.github.com/gists/public');

    // now you can write this like syncronous code!
    gists.forEach(function(gist){
      console.log(gist.description);
    });
  } catch (e) {
    // promise was rejected and we can handle errors with try/catch!
  }
}

printPublicGists();
```

Теперь, если мы опять выполним команду, то все должно быть хорошо.

Ссылка на оригинал статьи
[http://masnun.com/2015/11/11/using-es7-asyncawait-today-with-babel.html](http://masnun.com/2015/11/11/using-es7-asyncawait-today-with-babel.html)
