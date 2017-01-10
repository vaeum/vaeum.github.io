---
title: how to install gulp 4
title:  "Как установить Gulp 4 версии до оффициального релиза"
layout: post
---

With Gulp 4 approaching its release date many would like to install it now and take advantage
of the cool goodies the new v4 comes with. Can’t blame them—we’ve switched to Gulp 4 a
few weeks ago and couldn’t be happier.

Please note, this installation assumes replacement of the previous version of Gulp
with the new Gulp 4 version. It’s possible to keep them both, but I neither have tested
that yet, nor had any project requirements to do so. For the complete replacement,
please follow these instructions until v4 is officially released on bower:

```
# Удаляем предыдущие версии Gulp
$ npm rm gulp -g
$ npm rm gulp-cli -g
$ cd [your-project-dir/]
$ npm rm gulp --save-dev
$ npm rm gulp --save
$ npm rm gulp --save-optional
$ npm cache clean

# Устанавливаем последнюю версию Gulp CLI глобально
$ npm install gulpjs/gulp-cli -g

# Устанавливаем Gulp 4 в ваш проект
$ npm install gulpjs/gulp#4.0 --save-dev

# Проверяем текущюю установленную версию
$ gulp -v
---
[10:48:35] CLI version 1.2.2
[10:48:35] Local version 4.0.0-alpha.2
```

Your new v4 version should be ready to use now. Here is a sample [v4 gulpfile.js](https://gist.github.com/demisx/beef93591edc1521330a)
to get you started. Some samples are also available on the project’s [4.0 branch](https://github.com/gulpjs/gulp/tree/4.0).

The Gulp 4 documentation effort is on the way and 4.0 has been in beta for quite a
long time now. However, the code is very stable and we haven’t had any issues with
it. Just be careful parsing existing docs. Some of it is still v3 specific and hasn’t
been updated at the time of writing this post.

Today my environment was:

- Gulp 4.0.0-alpha.2
- node 6.4.0
- npm 3.10.6
- Mac OS X 10.11.6

Оригинал [https://demisx.github.io/gulp4/2015/01/15/install-gulp4.html](https://demisx.github.io/gulp4/2015/01/15/install-gulp4.html)
