# Блог Vaeum.com

[![Build Status](https://travis-ci.org/vaeum/vaeum.github.io.svg?branch=dev)](https://travis-ci.org/vaeum/vaeum.github.io)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/vaeum/blog?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

### Установка

- Скачиваем и устанавливаем Node JS и NPM [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Устанавливаем Ruby [https://www.ruby-lang.org/en/](https://www.ruby-lang.org/en/)
- Клонируем репозиторий `git@github.com:vaeum/vaeum.github.io.git vaeum.blog`
- `cd vaeum.blog`
- `make install` или `./install.sh` или `npm run init`

### Запуск проекта

- `npm start` или `make`

###  Дополнительные команды

- `npm run styleguide` сгенерировать styleguide

### Первые шаги

Для начала запускаем проект командой `npm start` или `make`

- По умолчанию сервер будет на `7778` порту
- Для добавления статьи надо зайти в папку `_layouts` и создать файл по шаблону
- Шаблон для имени файла статьи `год-месяц-день-${названия статьи}`
- Название статьи надо задавать английскими словами и пробелы между словами задавать знаком тире

### Требования для статей

- Обложка (cover) должна иметь размеры `960 х 300` px
- Шаблон для обложки
```
![first image](#{url картинки})
```

### Вопрос - ответ

**В**: Как добавить Github Gist?

**О**: Добавить в шаблон или статью следующий текст `{% gist <имя пользователя>/<gist ID> %}`,
имя пользователя и ID можно найти в URL, на странице гиста

**В**: Как добавить связанные посты?

**О**: Нужно добавить в файл со статьей запись вида

```
---
related: [
    "<post title>",
]
---
```

**В**: Как добавить аннотацию к посту?

**О**: Надо просто добавить в шапку поста текст: `excerpt_text`

### Файлы и папки

```
_assets           - папка с исходниками стилей и скриптов
_includes         - папка с частями кода для вставки в проект
_layouts          - папка с шаблонами
_locales          - папка с локализациями
_pages            - папка со страницами
_plugins          - папка для плагинов
_posts            - папка для постов
_templates        - шаблоны для написания статей
images            - папка для хранения картинок
.babelrc          - файл для Babel
.editorconfig     - настройка редактора по умолчанию
.gitignore        - файл для игнорирования папок и файлов
.travis.yml       - настройки для Travis CI
CNAME             - файл для хостинга
Gemfile           - файл с зависимостями для Jekyll
Makefile          - файл для выполнения команд
README.md         - файл со справкой
Rakefile          - запуск тестов
_config.yml       - файл Jekyll конфигурации
feed.xml          - шаблон ленты новостей
gulpfile.babel.js - файл с задачами для Gulp
index.html        - главный файл блога
install.sh        - Bash скрипт для установки зависимостей (для WebStorm)
package.json      - файл с NPM пакетами
run.sh            - Bash скрипт для запуска проекта (для WebStorm)
search.json       - Json файл для генерирования поиска по блогу
```

### Помощь проекту

1. Форкните проект ([https://github.com/vaeum/vaeum.github.io/fork](https://github.com/vaeum/vaeum.github.io/fork))
2. Создайте новую ветку (`git checkout -b my-new-feature`)
3. Создайте коммит (`git commit -am 'Add some feature'`)
4. Отправьте изменения в репозиторий (`git push origin my-new-feature`)
5. Создайте Pull Request
