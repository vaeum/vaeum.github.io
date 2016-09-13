## Блог Vaeum.com

[![Build Status](https://travis-ci.org/vaeum/vaeum.github.io.svg?branch=dev)](https://travis-ci.org/vaeum/vaeum.github.io)

### Установка

- Скачиваем и устанавливаем Node JS и NPM [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Обновляем NPM до 3 версии `npm install -g npm`
- Устанавливаем Ruby [https://www.ruby-lang.org/en/](https://www.ruby-lang.org/en/)
- Клонируем репозиторий `git@github.com:vaeum/vaeum.github.io.git vaeum.blog`
- `cd vaeum.blog`
- `make install` или `./install.sh`

### Запуск проекта

- `npm start` или `make`

###  Дополнительные команды

- `npm run styleguide` сгенерировать styleguide

### Файлы и папки

- **_assets** - папка с исходниками стилей и скриптов
- **_includes** - папка с частями кода для вставки в проект
- **_layouts** - папка с шаблонами
- **_locales** - папка с локализациями
- **_pages** - папка со страницами
- **_plugins** - папка для плагинов
- **_posts** - папка для постов
- **_templates** - 
- **images** - папка для хранения картинок
- **.babelrc** 
- **.editorconfig** - настройка редактора по умолчанию
- **.gitignore** - файл для игнорирования папок и файлов
- **.travis.yml**
- **CNAME** - файл для хостинга
- **Gemfile**
- **Makefile** - файл для выполнения команд
- **README.md**
- **Rakefile** - запуск тестов
- **_config.yml** - файл Jekyll конфигурации
- **feed.xml** - шаблон ленты новостей
- **gulpfile.babel.js** - файл с задачами для Gulp
- **index.html** - главный файл блога
- **install.sh** - Bash скрипт для установки зависимостей (для WebStorm)
- **package.json** - файл с NPM пакетами
- **run.sh** - Bash скрипт для запуска проекта (для WebStorm)
- **search.json** - Json файл для генерирования поиска по блогу
