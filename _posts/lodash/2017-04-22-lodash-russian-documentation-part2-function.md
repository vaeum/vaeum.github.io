---
title: Lodash документация на русском (Функции) часть 2
layout: post
categories: Lodash
tags: Lodash Documentation
description: Это вторая часть посвященная переводу 13ти методов для работы с Функциями в Lodash на русский язык.
excerpt_text: Это вторая часть посвященная переводу 13ти методов для работы с Функциями в Lodash на русский язык. Рассмотрены следующие методы .flip, .memoize, .negate, .once, .overArgs, .partial, .partialRight, .rearg, .rest, .spread, .throttle, .unary, .wrap
published: true
---

![Lodash документация на русском](/images/post/Lodash/Lo-Dash_function_part2.jpg)

* TOC
{:toc}

# “Функции” - часть 2

## .flip(func)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10506),
[npm package](https://www.npmjs.com/package/lodash.flip).

Создает функцию, которая вызывает `func` с аргументами `reverse`.

**Версия:** *4.0.0*

**Аргументы**

`func (Function)`: Функция для перебора аргументов.

**Возвращает**

`(Function)`: Возвращает новую перевернутую функцию.

### Пример

```javascript
var flipped = _.flip(function() {
  return _.toArray(arguments);
});
 
flipped('a', 'b', 'c', 'd');
// => ['d', 'c', 'b', 'a']
```

## .memoize(func, [resolver])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10554),
[npm package](https://www.npmjs.com/package/lodash.memoize).

Создает функцию, которая запоминает результат `func`. Если `resolver`, он определяет кэш ключ для сохранения результата на основе аргументов, предоставленных `memoized` функции. 

По умолчанию первый аргумент, предоставленный `memoized` функции, используется как ключ кеширования карты. `Func` вызывается с этим связыванием `memoized` функции.

**Заметка**: Кэш отображается как свойство кэша в memoized-функции. 

Его создание может быть изменено путем замены `_.memoize.Cache` конструктор с экземпляром, экземпляры которого реализуют [Map](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object) интерфейс метода `clear`, `delete`, `get`, `has`, и `set`.

**Версия:** *0.1.0*

**Аргументы**

`func (Function)`: Функция для вывода своего `memoized` сообщения.
`[resolver] (Function)`: Функция для разрешения кэш ключа.

**Возвращает**

`(Function)`: Возвращает новую `memoized` функцию.

### Пример

```javascript
var object = { 'a': 1, 'b': 2 };
var other = { 'c': 3, 'd': 4 };
 
var values = _.memoize(_.values);
values(object);
// => [1, 2]
 
values(other);
// => [3, 4]
 
object.a = 2;
values(object);
// => [1, 2]
 
// Modify the result cache.
values.cache.set(object, ['a', 'b']);
values(object);
// => ['a', 'b']
 
// Replace `_.memoize.Cache`.
_.memoize.Cache = WeakMap;
```

## .negate(predicate)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10597),
[npm package](https://www.npmjs.com/package/lodash.negate).

Создает функцию, которая отрицает результат предиката `func`. Предикат `func` вызывается с привязкой `this` и аргументами созданной функции.

**Версия:** *3.0.0*

**Аргументы**

`predicate (Function)`: Предикат для отрицания.

**Возвращает**

`(Function)`: Возвращает новую отрицательную функцию.

### Пример

```javascript
function isEven(n) {
  return n % 2 == 0;
}
 
_.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
// => [1, 3, 5]
```

## .once(func)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10631),
[npm package](https://www.npmjs.com/package/lodash.once).

Создает функцию, которая будет ограничена вызовом `func` один раз. Повторные вызовы функции возвращают значение первого вызова. `Func` вызывается с `this` привязкой и аргументами созданной функции.

**Версия:** *0.1.0*

**Аргументы**

`func (Function)`: Функция для ограничения.

**Возвращает**

`(Function)`: Возвращает новую ограниченную функцию.

### Пример

```javascript
var initialize = _.once(createApplication);
initialize();
initialize();
// => `createApplication` is invoked once
```

## .overArgs(func, [transforms=[_.identity]])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10666),
[npm package](https://www.npmjs.com/package/lodash.overargs).

Создает функцию, которая вызывает `func` с преобразованными аргументами.

**Версия:** *4.0.0*

**Аргументы**

`func (Function)`: Функция для переноса.
`[transforms=[_.identity]] (...(Function|Function[]))`: Преобразуется аргумент.

**Возвращает**

`(Function)`: Возвращает новую функцию.

### Пример

```javascript
function doubled(n) {
  return n * 2;
}
 
function square(n) {
  return n * n;
}
 
var func = _.overArgs(function(x, y) {
  return [x, y];
}, [square, doubled]);
 
func(9, 3);
// => [81, 6]
 
func(10, 5);
// => [100, 10]
```

## .partial(func, [partials])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10716),
[npm package](https://www.npmjs.com/package/lodash.partial).

Создает функцию, которая вызывает `func` с` partials`, которая предшествует аргументам, которые она получает. Этот метод подобен [_.bind](https://lodash.com/docs/4.17.4#bind) за исключением того, что изменяет привязку `this`.

`_.partial.placeholder` значение, которое по умолчанию равно `_` в монолитных билдах, может использоваться в качестве заполнителя для частично применяемых аргументов.

**Заметка**: Этот метод не устанавливает свойство length для частично применяемых функций.

**Версия:** *0.2.0*

**Аргументы**

`func (Function)`: Функция частичного применения аргументов.
`[partials] (...*)`: Аргументы, которые должны быть частично применены.

**Возвращает**

`(Function)`: Возвращает новую частично примененную функцию.

### Пример

```javascript
function greet(greeting, name) {
  return greeting + ' ' + name;
}
 
var sayHelloTo = _.partial(greet, 'hello');
sayHelloTo('fred');
// => 'hello fred'
 
// Partially applied with placeholders.
var greetFred = _.partial(greet, _, 'fred');
greetFred('hi');
// => 'hi fred'
```

## .partialRight(func, [partials])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10753),
[npm package](https://www.npmjs.com/package/lodash.partialright).

Этот метод подобен [_.partial](https://lodash.com/docs/4.17.4#partial) за исключением того, что частично добавленные аргументы добавляются к получаемым аргументам.

`_.partialRight.placeholder` за исключением того, что частично добавленные аргументы добавляются к получаемым аргументам.

**Заметка**: Этот метод не устанавливает свойство length для частично применяемых функций.

**Версия:** *1.0.0*

**Аргументы**

`func (Function)`: Функция частичного применения аргументов.
`[partials] (...*)`: Аргументы, которые должны быть частично применены.

**Возвращает**

`(Function)`: Возвращает новую частично примененную функцию.

### Пример

```javascript
function greet(greeting, name) {
  return greeting + ' ' + name;
}
 
var greetFred = _.partialRight(greet, 'fred');
greetFred('hi');
// => 'hi fred'
 
// Partially applied with placeholders.
var sayHelloTo = _.partialRight(greet, 'hello', _);
sayHelloTo('fred');
// => 'hello fred'
```

## .rearg(func, indexes)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10780),
[npm package](https://www.npmjs.com/package/lodash.rearg).

Создает функцию, которая вызывает `func` с аргументами, расположенными в соответствии с указанными `indexes`, где значение аргумента в первом индексе предоставляется в качестве первого аргумента, значение аргумента во втором индексе предоставляется как второй аргумент и т.д.

**Версия:** *3.0.0*

**Аргументы**

`func (Function)`: Функция для переупорядочения аргументов.
`indexes (...(number|number[]))`: Упорядоченные индексы аргументов.

**Возвращает**

`(Function)`: Возвращает новую функцию.

### Пример

```javascript
var rearged = _.rearg(function(a, b, c) {
  return [a, b, c];
}, [2, 0, 1]);
 
rearged('b', 'c', 'a')
// => ['a', 'b', 'c']
```

## .rest(func, [start=func.length-1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10809),
[npm package](https://www.npmjs.com/package/lodash.rest).

Создает функцию, которая вызывает `func` с помощью` this` привязки созданной функции и аргументов из `start` и `beyond`, предоставляемых в виде массива.

**Заметка**: Этот метод основан на [rest parameter](https://mdn.io/rest_parameters).

**Версия:** *4.0.0*

**Аргументы**

`func (Function)`: Функция для применения параметра `rest` к аргументам.
`[start=func.length-1] (number)`: Начальное положение остального параметра.

**Возвращает**

`(Function)`: Возвращает новую функцию.

### Пример

```javascript
var say = _.rest(function(what, names) {
  return what + ' ' + _.initial(names).join(', ') +
    (_.size(names) > 1 ? ', & ' : '') + _.last(names);
});
 
say('hello', 'fred', 'barney', 'pebbles');
// => 'hello fred, barney, & pebbles'
```

## .spread(func, [start=0])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10851),
[npm package](https://www.npmjs.com/package/lodash.spread).

Создает функцию, которая вызывает `func` с помощью` this` привязки функции `create` и массива аргументов, подобных [Function#apply](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).

**Заметка**: Этот метод основан на [spread operator](https://mdn.io/spread_operator).

**Версия:** *3.2.0*

**Аргументы**

`func (Function)`: Функция для распространения аргументов.
`[start=0] (number)`: Начальная позиция спреда.

**Возвращает**

`(Function)`: Возвращает новую функцию.

### Пример

```javascript
var say = _.spread(function(who, what) {
  return who + ' says ' + what;
});
 
say(['fred', 'hello']);
// => 'fred says hello'
 
var numbers = Promise.all([
  Promise.resolve(40),
  Promise.resolve(36)
]);
 
numbers.then(_.spread(function(x, y) {
  return x + y;
}));
// => a Promise of 76
```

## .throttle(func, [wait=0], [options={}])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10911),
[npm package](https://www.npmjs.com/package/lodash.throttle).

Создает дроссельную функцию, которая вызывает `func` не чаще одного раза за каждую миллисекунду ожидания. Функция дросселя поставляется с методом `cancel`, чтобы отменить отложенные вызовы `func` и метод `flush` для немедленного вызова. Укажите `options`, чтобы указать, следует ли вызвать `func` в начале или в конце таймаута. `Func` вызывается с последними аргументами, предоставленными функции дросселя. Последующие вызовы дроссельной функции возвращают результат последнего вызова `func`.

**Заметка**: Если ведущие и завершающие параметры верны, `func` вызывается в конце таймаута, только если активированная функция активируется более одного раза в течение таймаута.

Если `wait` равно 0, а `lead` - `false`, вызов `func` откладывается до следующего тика, подобно setTimeout с тайм-аутом 0.

Посмотрите [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/) подробнее о различиях между [_.throttle](https://lodash.com/docs/4.17.4#throttle) и [_.debounce](https://lodash.com/docs/4.17.4#debounce).

**Версия:** *0.1.0*

**Аргументы**

`func (Function)`: Функция дроссельной заслонки.
`[wait=0] (number)`: Количество миллисекунд, чтобы дросселировать вызовы.
`[options={}] (Object)`: Объект опций.
`[options.leading=true] (boolean)`: Укажите вызов по переднему фронту тайм-аута.
`[options.trailing=true] (boolean)`: Укажите вызов в конце тайм-аута.

**Возвращает**

`(Function)`: Возвращает новую функцию дросселя.

### Пример

```javascript
// Avoid excessively updating the position while scrolling.
jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 
// Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
jQuery(element).on('click', throttled);
 
// Cancel the trailing throttled invocation.
jQuery(window).on('popstate', throttled.cancel);
```

## .unary(func)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10944),
[npm package](https://www.npmjs.com/package/lodash.unary).

Создает функцию, допускающую до одного аргумента, игнорируя любые дополнительные аргументы.

**Версия:** *4.0.0*

**Аргументы**

`func (Function)`: Функция для ограничения аргументов.

**Возвращает**

`(Function)`: Возвращает новую ограниченную функцию.

### Пример

```javascript
_.map(['6', '8', '10'], _.unary(parseInt));
// => [6, 8, 10]
```

## .wrap(value, [wrapper=identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L10970),
[npm package](https://www.npmjs.com/package/lodash.wrap).

Создает функцию, которая предоставляет значение `wrapper` в качестве первого аргумента. Любые дополнительные аргументы, предоставленные этой функции, добавляются к тем, которые предоставлены оболочке. Оболочка вызывается с этой привязкой созданной функции.

**Версия:** *0.1.0*

**Аргументы**

`value (*)`: Значение для переноса.
`[wrapper=identity] (Function)`: Функция обертка.

**Возвращает**

`(Function)`: Возвращает новую функцию.

### Пример

```javascript
var p = _.wrap(_.escape, function(func, text) {
  return '<p>' + func(text) + '</p>';
});
 
p('fred, barney, & pebbles');
// => '<p>fred, barney, &amp; pebbles</p>'
```


[Часть 1](http://vaeum.com/blog/2017/04/03/lodash-russian-documentation-part1-function/)