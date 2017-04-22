---
title: Lodash документация на русском (Функции) часть 1
layout: post
categories: Lodash
tags: Lodash Documentation
description: Это первая часть посвященная переводу 10ти методов для работы с Функциями в Lodash на русский язык.
excerpt_text: Это вторая часть посвященная переводу 10ти методов для работы с Функциями в Lodash на русский язык. Рассмотрены следующие методы .after .ary .before .bind .bindKey .curry .curryRight .debounce .defer .delay
published: true
---

![Lodash документация на русском](/images/post/Lodash/Lo-Dash_function_part1.jpg)

* TOC
{:toc}

# “Функции” - часть 1

## .after(n, func)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10007),
[npm package](https://www.npmjs.com/package/lodash.after).

Противоположно [_.before](https://lodash.com/docs/4.17.4#before); Этот метод создает функцию, которая вызывает функцию `func`, когда она вызывается `n` или более раз.

**Версия:** *0.1.0*

**Аргументы**

`n (number)`: Число вызовов после которого вызывается `func`.
`func (Function)`: Функция для ограничения.

**Возвращает**

`(Function)`: Возвращает новую ограниченную функцию.

### Пример

```javascript
var saves = ['profile', 'settings'];
 
var done = _.after(saves.length, function() {
  console.log('done saving!');
});
 
_.forEach(saves, function(type) {
  asyncSave({ 'type': type, 'complete': done });
});
// => Logs 'done saving!' after the two async saves have completed.
```

## .ary(func, [n=func.length])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10036),
[npm package](https://www.npmjs.com/package/lodash.ary).

Создает функцию, которая вызывает `func`, до `n` аргументов, игнорируя любые дополнительные аргументы.

**Версия:** *3.0.0*

**Аргументы**

`func (Function)`: Функция для ограничения аргументов.
`[n=func.length] (number)`: `arity` заглушка

**Возвращает**

`(Function)`: Возвращает новую ограниченную функцию.

### Пример

```javascript
_.map(['6', '8', '10'], _.ary(parseInt, 1));
// => [6, 8, 10]
```

## .before(n, func)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10059),
[npm package](https://www.npmjs.com/package/lodash.before).

Создает функцию, которая вызывает `func`, с этой привязкой и аргументами для создания функции, пока эти вызовы меньше `n` раз.

Последующие вызовы созданной функции возвращают результат последнего вызова `func`.

**Версия:** *3.0.0*

**Аргументы**

`n (number)`: Число вызовов после которого вызывается `func`.
`func (Function)`: Функция для ограничения.

**Возвращает**

`(Function)`: Возвращает новую ограниченную функцию.

### Пример

```javascript
jQuery(element).on('click', _.before(5, addContactToList));
// => Allows adding up to 4 contacts to the list.
```

## .bind(func, thisArg, [partials])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10111),
[npm package](https://www.npmjs.com/package/lodash.bind).

Создает функцию, которая вызывает `func` с привязкой `thisArg` и `partials`, предшествующей полученным аргументам.

Значение _.bind.placeholder, которое по умолчанию равно _ в монолитных билдах, может использоваться в качестве заполнителя для частично применяемых аргументов.

**Заметка:** В отличие от нативного Function # bind, этот метод не устанавливает свойство length для связанных функций.

**Версия:** *0.1.0*

**Аргументы**

`func (Function)`: Функция для связывания.
`thisArg (*)`: Это связывание `func`.
`[partials] (...*)`: Аргументы, которые должны быть частично применены.

**Возвращает**

`(Function)`: Возвращает новую связанную функцию.

### Пример

```javascript
function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}
 
var object = { 'user': 'fred' };
 
var bound = _.bind(greet, object, 'hi');
bound('!');
// => 'hi fred!'
 
// Bound with placeholders.
var bound = _.bind(greet, object, _, '!');
bound('hi');
// => 'hi fred!'
```

## .bindKey(object, key, [partials])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10165),
[npm package](https://www.npmjs.com/package/lodash.bindkey).

Создает функцию, которая вызывает метод в `object[key]`, при этом `partials` предшествует аргументам, которые он получает.

Этот метод отличается от [_.bind](https://lodash.com/docs/4.17.4#bind) позволяя связанным функциям ссылаться на методы, которые могут быть переопределены или еще не существуют.

Прочтите [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern) для большего понимания.

Значение `_.bindKey.placeholder`, которое по умолчанию равно `_` в монолитных билдах, может использоваться как местозаполнитель для частично применяемых аргументов.

**Версия:** *0.1.0*

**Аргументы**

`object (Object)`: Объект для вызова метода `on`.
`key (string)`: Ключ метода.
`[partials] (...*)`: Аргументы, которые должны быть частично применены.

**Возвращает**

`(Function)`: Возвращает новую связанную функцию.

### Пример

```javascript
var object = {
  'user': 'fred',
  'greet': function(greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  }
};
 
var bound = _.bindKey(object, 'greet', 'hi');
bound('!');
// => 'hi fred!'
 
object.greet = function(greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};
 
bound('!');
// => 'hiya fred!'
 
// Bound with placeholders.
var bound = _.bindKey(object, 'greet', _, '!');
bound('hi');
// => 'hiya fred!'
```

## .curry(func, [arity=func.length])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10215),
[npm package](https://www.npmjs.com/package/lodash.curry).

Создает функцию, которая принимает аргументы `func` и либо вызывает `func`, возвращающий его результат, если было предоставлено хотя бы `arity` количество аргументов, либо функция, которая принимает остальные аргументы `func`, и т. Д. Аргумент `func` может быть указан, если `func.length` недостаточно.

Значение `_.curry.placeholder`, которое по умолчанию равно `_` в монолитных билдах, может использоваться как местозаполнитель для предоставленных аргументов.

**Заметка:** Этот метод не устанавливает свойство `length` для функций, выполняемых с помощью `curried`.

**Версия:** *2.0.0*

**Аргументы**

`func (Function)`: `curry` функция.
`[arity=func.length] (number)`: `arity` заглушка для `func`.

**Возвращает**

`(Function)`: Возвращает новую `curried` функцию.

### Пример

```javascript
var abc = function(a, b, c) {
  return [a, b, c];
};
 
var curried = _.curry(abc);
 
curried(1)(2)(3);
// => [1, 2, 3]
 
curried(1, 2)(3);
// => [1, 2, 3]
 
curried(1, 2, 3);
// => [1, 2, 3]
 
// Curried with placeholders.
curried(1)(_, 3)(2);
// => [1, 2, 3]
```

## .curryRight(func, [arity=func.length])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10260),
[npm package](https://www.npmjs.com/package/lodash.curryright).

Этот метод подобен [.curry](https://lodash.com/docs/4.17.4#curry) За исключением того, что аргументы применяются к `func` в порядке [.partialRight](https://lodash.com/docs/4.17.4#partialRight) вместо [.partial](https://lodash.com/docs/4.17.4#partial).

Значение `_.curryRight.placeholder`, которое по умолчанию равно `_` в монолитных билдах, может использоваться в качестве заполнителя для предоставленных аргументов.

**Заметка:** Этот метод не устанавливает свойство `length` для функций, выполняемых с помощью `curried`.

**Версия:** *3.0.0*

**Аргументы**

`func (Function)`: `curry` функция.
`[arity=func.length] (number)`: `arity` заглушка для `func`.

**Возвращает**

`(Function)`: Возвращает новую `curried` функцию.

### Пример

```javascript
var abc = function(a, b, c) {
  return [a, b, c];
};
 
var curried = _.curryRight(abc);
 
curried(3)(2)(1);
// => [1, 2, 3]
 
curried(2, 3)(1);
// => [1, 2, 3]
 
curried(1, 2, 3);
// => [1, 2, 3]
 
// Curried with placeholders.
curried(3)(1, _)(2);
// => [1, 2, 3]
```

## .debounce(func, [wait=0], [options={}])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10321),
[npm package](https://www.npmjs.com/package/lodash.debounce).

Создает функцию debounced, которая задерживает вызов `func`, до тех пор, пока не истечет миллисекунды ожидания с момента последнего вызова функции `debounced`.

Функция `debounced` использует метод `cancel` для отмены отложенных `func`-вызовов и метод `flush` для немедленного вызова.

Укажите параметры, указывающие, следует ли вызывать `func` на ведущем и/или заднем фронтах таймаута ожидания.

`func` вызывается с последними аргументами, предоставленными функцией `debounced`.

Последующие вызовы функции `debounced` возвращают результат последнего вызова `func`.

**Заметка:** Если начальные и конечные значения равны `true`, `func` вызывается на заднем фронте таймаута, только если выведенная функция вызывается более чем один раз во время ожидания.

Если `wait` равно 0, а `lead` - `false`, вызов `func` откладывается до следующего тика, похож на предыдущий метод `setTimeout` с тайм-аутом 0.

Прочтите [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/) для большего понимания по поводу различий между [.debounce](https://lodash.com/docs/4.17.4#debounce) и [.throttle](https://lodash.com/docs/4.17.4#throttle).

**Версия:** *0.1.0*

**Аргументы**

`func (Function)`: Функция `debounce`.
`[wait=0] (number)`: Количество миллисекунд задержки.
`[options={}] (Object)`: Параметры объекта.
`[options.leading=false] (boolean)`: Укажите вызов по переднему фронту тайм-аута.
`[options.maxWait] (number)`: Максимальное время `func` на которое он может быть отложено до его вызова.
`[options.trailing=true] (boolean)`: Укажите вызов на заднем фронте тайм-аута.

**Возвращает**

`(Function)`: Возвращает новую `debounced` функцию.

### Пример

```javascript
// Avoid costly calculations while the window size is in flux.
jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 
// Invoke `sendMail` when clicked, debouncing subsequent calls.
jQuery(element).on('click', _.debounce(sendMail, 300, {
  'leading': true,
  'trailing': false
}));
 
// Ensure `batchLog` is invoked once after 1 second of debounced calls.
var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
var source = new EventSource('/stream');
jQuery(source).on('message', debounced);
 
// Cancel the trailing debounced invocation.
jQuery(window).on('popstate', debounced.cancel);
```

## .defer(func, [args])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10461),
[npm package](https://www.npmjs.com/package/lodash.defer).

Отменяет вызов `func` до тех пор, пока текущий стек вызовов не будет очищен. Любые дополнительные аргументы предоставляются `func`, когда он вызывается.

**Версия:** *0.1.0*

**Аргументы**

`func (Function)`: Функция для отсрочки.
`[args] (...*)`: Аргументы для вызова `func`.

**Возвращает**

`(number)`: Возвращает идентификатор таймера.

### Пример

```javascript
_.defer(function(text) {
  console.log(text);
}, 'deferred');
// => Logs 'deferred' after one millisecond.
```

## .delay(func, wait, [args])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10484),
[npm package](https://www.npmjs.com/package/lodash.delay).

Вызывает `func` после ожидания миллисекунд. Любые дополнительные аргументы предоставляются `func`, когда он вызывается.

**Версия:** *0.1.0*

**Аргументы**

`func (Function)`: Функция для задержки.
`wait (number)`: Количество миллисекунд для задержки вызова.
`[args] (...*)`: Аргументы для вызова `func`.

**Возвращает**

`(number)`: Возвращает идентификатор таймера.

### Пример

```javascript
_.delay(function(text) {
  console.log(text);
}, 1000, 'later');
// => Logs 'later' after one second.
```


[Часть 2](http://vaeum.com/blog/2017/04/22/lodash-russian-documentation-part2-function/)