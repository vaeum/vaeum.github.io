---
layout: post
title:  "Michael Herman - PostgreSQL and NodeJS"
date:   2016-08-24
categories: PostgreSQL, NodeJS
---

Ссылка на оригинальный пост [link](http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/)

Сегодня мы собираемся написать одностраничное [CRUD](https://ru.wikipedia.org/wiki/CRUD) Todo приложение  с использованием технологий, Node JS,  Express, Angular JS, и PostgreSQL.

![_config.yml]({{ site.baseurl }}/images/node-todo-postges.jpg)

#### Настройка проекта

Для начала нужно установить [генератор Express](http://expressjs.com/starter/generator.html) глобально, если он не установлен:

```
npm install -g express-generator@4
```

Затем создаем новый проект и устанавливаем зависимости:

```
$ express node-postgres-todo
$ cd node-postgres-todo && npm install
```

Так же установим [node-supervisor](https://github.com/isaacs/node-supervisor) глобально, чтобы наблюдать за изменениями в исходном коде:

```
$ npm install supervisor -g
```

Изменяем команду *start*  в секции *scripts* в файле  *package.json*:

```json
"scripts": {
  "start": "supervisor ./bin/www"
},
```

Запускаем наше приложение:

```
$ npm start
```

Затем перейдите по адресу [http://localhost:3000/](http://localhost:3000/), и в браузере Вы должны увидеть текст “Welcome to Express”.

#### Настройк	а Postgres

> Если нужно установить Postgres на Mac? Для этого есть [Postgres.app](http://postgresapp.com/)

После запуска Postgres сервера на порту 5432, для легкого подключения к базе нужно установить [pg](https://www.npmjs.com/package/pg) библиотеку

```
$ npm install pg --save
```

Теперь для создания таблиц создадим простой скрипт:

```javascript
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
query.on('end', function() { client.end(); });
```

Сохраните его как **database.js** файл, в новой папке **models**, в корне проекта.

В этом файле мы создали экземпляр класса `Client` для взаимодействия с базой данных, а затем установили связь с ним с помощью `connect()` метода. После чего мы запускаем SQL запрос с помощью `query()` метода. Связь закрывается с помощью `end()`метода. Обязательно ознакомьтесь с разделом [документации](https://github.com/brianc/node-postgres/wiki/Client) для получения дополнительной информации.

Убедитесь, что у вас есть база данных под названием "TODO", а затем запускаем скрипт для настройки таблицы и последующих полей:

```
$ node models/database.js
```

