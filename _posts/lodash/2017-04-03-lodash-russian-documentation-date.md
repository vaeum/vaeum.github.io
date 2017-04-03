---
title: Lodash документация на русском (Даты)
layout: post
categories: Lodash
tags: Lodash Documentation
description: Перевод метода .now() для работы с Датой в Lodash. Перевод документации Lodash.
excerpt_text: Перевод метода .now() для работы с Датой в Lodash. Перевод документации Lodash.
---

![Lodash документация на русском](/images/post/Lodash/Lo-Dash_date.jpg)

* TOC
{:toc}

# “Даты”

## .now()

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9977),
[npm package](https://www.npmjs.com/package/lodash.now).

Возвращяет временя прошедшее с момента начала `Unix` эпохи `(1 January 1970 00:00:00 UTC)` в миллисекундах.

**Версия:** *2.4.0*

**Возвращает**

`(number)`: Возвращает временную метку.

### Пример

```javascript
_.defer(function(stamp) {
  console.log(_.now() - stamp);
}, _.now());
// => Logs the number of milliseconds it took for the deferred invocation.
```