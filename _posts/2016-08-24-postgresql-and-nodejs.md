---
layout: post
title:  "Michael Herman - PostgreSQL and NodeJS"
date:   2016-08-24
categories: PostgreSQL NodeJS
tags: npm
uncomplete: true
---

{: .annotations}
Это мой перевод хорошей статьи [Michael Herman - PostgreSQL and NodeJS](http://mherman.org/blog/2015/02/12/postgresql-and-nodejs/). В этой статье я постарался как можно проще рассказать о процессе создания приложений с использованием таких технологий, как PostgreSQL и NodeJS.

Сегодня мы собираемся написать одностраничное [CRUD](https://ru.wikipedia.org/wiki/CRUD) Todo приложение  с использованием технологий, Node JS,  Express, Angular JS, и PostgreSQL.

![first image](/images/node-todo-postges.jpg)

## Настройка проекта

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

## Настройка Postgres

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

Проверьте создание таблицы / схемы в [PSQL](http://postgresguide.com/utilities/psql.html) :

```
michaelherman=# \c todo
You are now connected to database "todo" as user "michaelherman".
todo=# \d+ items
                                                     Table "public.items"
  Column  |         Type          |                     Modifiers                      | Storage  | Stats target | Description
----------+-----------------------+----------------------------------------------------+----------+--------------+-------------
 id       | integer               | not null default nextval('items_id_seq'::regclass) | plain    |              |
 text     | character varying(40) | not null                                           | extended |              |
 complete | boolean               |                                                    | plain    |              |
Indexes:
    "items_pkey" PRIMARY KEY, btree (id)
```

Вместе с подключением к базе мы создали таблицу **items**. Теперь переходим к следующему шагу - настройка нашего CRUD приложения.

## Маршрутизация на стороне сервера:

Следующим шагом мы просто добавим функциональные блоки в файл **index.js**,  который находиться в папке **routes** 

```javascript
var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));
```

Сейчас мы добавим каждый функциональный блок

| Function | URL                    | Action                   |
| -------- | ---------------------- | ------------------------ |
| CREATE   | /api/v1/todos          | Создаем новую задачу     |
| READ     | /api/v1/todos          | Получаем список задач    |
| UPDATE   | /api/v1/todos/:todo_id | Обновляем текущюю задачу |
| DELETE   | /api/v1/todos/:todo_id | Удаляем текущюю задачу   |

### Создание записи

```javascript
router.post('/api/v1/todos', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
});
```

Для тестирования наберите в терминале:

```
$ curl --data "text=test&complete=false" http://127.0.0.1:3000/api/v1/todos	
```

Затем убедитесь, что данные были правильно занесены в базу данных с помощью PSQL:

```
todo=# SELECT * FROM items ORDER BY id ASC;
 id | text  | complete
----+-------+----------
  1 | test  | f
(1 row)
```

### Чтение записи

```javascript
router.get('/api/v1/todos', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });

});
```

Добавьте пару пунктов с помощью Curl, и проверьте в браузере по адресу [http://localhost:3000/api/v1/todos](http://localhost:3000/api/v1/todos). Вы должны получить примерно такой результат:

```json
[
    {
        "id": 1,
        "text": "test",
        "complete": false
    },
    {
        "id": 2,
        "text": "test2",
        "complete": false
    },
    {
        "id": 3,
        "text": "test3",
        "complete": false
    }
]
```

### Обновление записей

```javascript
router.put('/api/v1/todos/:todo_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;

    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});
```

Тестирум с помощью Curl:

```
$ curl -X PUT --data "text=test&complete=true" http://127.0.0.1:3000/api/v1/todos/1
```

Обновите страницу http://localhost:3000/api/v1/todos в браузере, что бы убедиться что все у нас правильно работает.

```json
[
    {
        "id": 1,
        "text": "test",
        "complete": true
    },
    {
        "id": 2,
        "text": "test2",
        "complete": false
    },
    {
        "id": 3,
        "text": "test3",
        "complete": false
    }
]
```

### Удаление записи

```javascript
router.delete('/api/v1/todos/:todo_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});
```

Финальный Curl запрос для проверки наших роутеров:

```
$ curl -X DELETE http://127.0.0.1:3000/api/v1/todos/3
```

Мы видим следующий результат:

```json
[
    {
        "id": 1,
        "text": "test",
        "complete": true
    },
    {
        "id": 2,
        "text": "test2",
        "complete": false
    }
]
```

## Рефакторинг нашего TODO приложения

Перед тем, как перейти к клиентской стороне нашего приложения, нужно добавить Angular JS, имейте в виду, что наш код должен быть переработан, чтобы решить несколько проблем. Но это отличная возможность реорганизовать код по своему усмотрению. Удачи!

## Angular JS на стороне клиента

Давайте начнем работу с Angular JS

> Учтите что этот урок не является полноценным учебным пособием для изучения Angular JS. Если вы новичек в Angular JS, то я предлагаю посмотреть мой учебник "Angular JS на примере" - [Building a Bitcoin Investment Calculator](https://github.com/mjhea0/thinkful-angular).

### Создание модуля

Создайте файл с именем **app.js** в папке **public/javascripts**. В нем мы будем создавать наши модули и контроллеры для Angular JS

```javascript
angular.module('nodeTodo', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.todoData = {};

    // Get all todos
    $http.get('/api/v1/todos')
        .success(function(data) {
            $scope.todoData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
});
```

