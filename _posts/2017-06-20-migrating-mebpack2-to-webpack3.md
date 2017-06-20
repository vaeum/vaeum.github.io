---
title: Миграция с Webpack 2 на Webpack 3
layout: post
categories: news
tags: webpack
description: Описание новой версии Webpack, и особенности перехода на нее
published: true
---

# Миграция с Webpack 2 на Webpack 3

19 июня вышел Webpack 3, с новыми интересными возможностями. В тот же день он стал доступен в репозитории NPM. Был написан пост на [Medium](https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b).

### Как установить Webpack 3?

Если у вас NPM, то

```
npm install webpack@3.0.0 --save-dev
```

Если вы пользуетесь Yarn

```
yarn add webpack@3.0.0 --dev
```

### Что нового?

Гланой фитчей стало **Scope Hoisting**, так как в ранних версиях Webpack оборачивал каждый модуль в функцию обертку со своей областью видимости, что замедлято работу JavaScript в браузере. Теперь же все модули в проекте имеют общюю область видимости, что ускоряет выполнение вашего кода.

### Как включить Scope Hoisting?

Включается эта фича очень просто, надо добавить в ваш webpack.config.js файл строку с вызовом плагина ModuleConcatenationPlugin

```
plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
]
```

### Какие проблемы при переходе были замеченны?

Переход на Webpack 3, в данный момент, не прошел без болезненно. Дело в том что плагин UglifyJsPlugin был вырезан из оффициального пакета Webpack и его надо поставить отдельно командой.

```
npm install uglifyjs-webpack-plugin --save-dev
```

Он так же имеет зависимость Uglify JS, так что нам надо поставиь и его тоже

```
npm install uglify-js --save-dev
```

При компилировании проекта было замечено предупреждение `(node:65822) DeprecationWarning: Chunk.modules is deprecated. Use Chunk.getNumberOfModules/mapModules/forEachModule/containsModule instead.` Оно связанно с плагином [https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/529](extract-text-webpack-plugin).

В целом переход на версию 3 был не такой, как с 1 версии на 2.
