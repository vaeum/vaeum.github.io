---
title: Lodash документация на русском (Коллекции) часть 1
layout: post
categories: Lodash
tags: Lodash Documentation
description: Это первая часть посвященная переводу 10ти методов для работы с Коллекциями в Lodash на русский язык.
excerpt_text: Это первая часть посвященная переводу 10ти методов для работы с Коллекциями в Lodash на русский язык. Рассмотрены следующие методы .countBy .every .filter .find .findLast .flatMap .flatMapDeep .flatMapDeep .forEach .forEachRight
published: true
---

![Lodash документация на русском](/images/post/Lodash/Lo-Dash_сollection_part1.jpg)

* TOC
{:toc}

# “Коллекции” - часть 1

## .countBy(collection, [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9094),
[npm package](https://www.npmjs.com/package/lodash.countby).

Создает объект, состоящий из ключей, сгенерированных из результатов работы каждого элемента коллекции через `iteratee`.

Соответствующее значение каждого ключа это количество раз, когда ключ был возвращен `iteratee`.

`iteratee` вызывается с одним аргументом: `(value)`.

**Версия:** *0.5.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.

`[iteratee=_.identity] (Function)`: `iteratee` для преобразования ключей

**Возвращает**

`(Object)`: Возвращает составной совокупный объект.

### Пример

```javascript

_.countBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': 1, '6': 2 }

// The `_.property` iteratee shorthand.
_.countBy(['one', 'two', 'three'], 'length');
// => { '3': 2, '5': 1 }
```

## .every(collection, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9143),
[npm package](https://www.npmjs.com/package/lodash.every).

Проверяет, возвращает ли `predicate` `truthy` для всех элементов коллекции.

Итерация останавливается, как только `predicate` возвращает `false`.

`predicate` вызывается с тремя аргументами: `(value, index|key, collection)`.

**Заметка:** Этот метод возвращает `true` для [empty collections](https://en.wikipedia.org/wiki/Empty_set) потому как [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) для элементов пустых коллекций.

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object)`: Коллекция для перебора.
`[predicate=_.identity] (Function)`: Функция вызывается на каждой итерации.

**Возвращает**

`(boolean)`: Возвращает `true`, если все элементы проходят проверку `predicate`, иначе `false`.

### Пример

```javascript

_.every([true, 1, null, 'yes'], Boolean);
// => false

var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': false }
];

// The `_.matches` iteratee shorthand.
_.every(users, { 'user': 'barney', 'active': false });
// => false

// The `_.matchesProperty` iteratee shorthand.
_.every(users, ['active', false]);
// => true

// The `_.property` iteratee shorthand.
_.every(users, 'active');
// => false
```

## .filter(collection, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9188),
[npm package](https://www.npmjs.com/package/lodash.filter).

Перебирает элементы коллекции, возвращает массив всех элементов если `predicate ` возвращает  `truthy`.

`predicate` вызывается с тремя аргументами: `(value, index|key, collection)`.

**Заметка:** В отличие от [_.remove](https://lodash.com/docs/4.17.4#remove), этот метод возвращает новый массив.

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object)`: Коллекция для перебора.
`[predicate=_.identity] (Function)`: Функция вызывается на каждой итерации.

**Возвращает**

`(Array)`: Возвращает новый фильтрованный массив.

### Пример

```javascript

var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']

// The `_.matches` iteratee shorthand.
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']

// The `_.matchesProperty` iteratee shorthand.
_.filter(users, ['active', false]);
// => objects for ['fred']

// The `_.property` iteratee shorthand.
_.filter(users, 'active');
// => objects for ['barney']
```

## .find(collection, [predicate=_.identity], [fromIndex=0])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9229),
[npm package](https://www.npmjs.com/package/lodash.find).

Итерации по элементам коллекции, возвращает первый элемента если `predicate` возвращают `truthy`.

`predicate` вызывается с тремя аргументами: `(value, index|key, collection)`.

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object)`: Коллекция для проверки.
`[predicate=_.identity] (Function)`: Функция вызывается на каждой итерации.
`[fromIndex=0] (number)`: Индекс для поиска.

**Возвращает**

`(*)`: Возвращает совпадающий элемент либо `undefined`.

### Пример

```javascript

var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];

_.find(users, function(o) { return o.age < 40; });
// => object for 'barney'

// The `_.matches` iteratee shorthand.
_.find(users, { 'age': 1, 'active': true });
// => object for 'pebbles'

// The `_.matchesProperty` iteratee shorthand.
_.find(users, ['active', false]);
// => object for 'fred'

// The `_.property` iteratee shorthand.
_.find(users, 'active');
// => object for 'barney'
```

## .findLast(collection, [predicate=_.identity], [fromIndex=collection.length-1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9250),
[npm package](https://www.npmjs.com/package/lodash.findlast).

Этот метод подобен [_.find](https://lodash.com/docs/4.17.4#find) за исключением того, что он перебирает элементы коллекции справа налево.

**Версия:** *2.0.0*

**Аргументы**

`collection (Array|Object)`: Коллекция для проверки.
`[predicate=_.identity] (Function)`: Функция вызывается на каждой итерации.
`[fromIndex=collection.length-1] (number)`: Индекс для поиска.

**Возвращает**

`(*)`: Возвращает совпадающий элемент либо `undefined`.

### Пример

```javascript

_.findLast([1, 2, 3, 4], function(n) {
  return n % 2 == 1;
});
// => 3
```

## .flatMap(collection, [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9273),
[npm package](https://www.npmjs.com/package/lodash.flatmap).

Создает сглаженный массив значений, запустив каждый элемент коллекции через повторение и сглаживая сопоставленные результаты.

`predicate` вызывается с тремя аргументами: `(value, index|key, collection)`.

**Версия:** *4.0.0*

**Аргументы**

`collection (Array|Object)`: Коллекция для перебора.
`[iteratee=_.identity] (Function)`: Функция вызывается на каждой итерации.

**Возвращает**

`(Array)`: Возвращает новый сглаженый массив.

### Пример

```javascript

function duplicate(n) {
  return [n, n];
}

_.flatMap([1, 2], duplicate);
// => [1, 1, 2, 2]
```

## .flatMapDeep(collection, [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9297),
[npm package](https://www.npmjs.com/package/lodash.flatmapdeep).

Этот метод подобен [_.flatMap](https://lodash.com/docs/4.17.4#flatMap) За исключением того, что он рекурсивно сглаживает отображенные результаты.

**Версия:** *4.7.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[iteratee=_.identity] (Function)`: Функция вызывается на каждой итерации.

**Возвращает**

`(Array)`: Возвращает новый сглаженый массив.

### Пример

```javascript

function duplicate(n) {
  return [[[n, n]]];
}

_.flatMapDeep([1, 2], duplicate);
// => [1, 1, 2, 2]
```

## .flatMapDepth(collection, [iteratee=_.identity], [depth=1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9322),
[npm package](https://www.npmjs.com/package/lodash.flatmapdepth).

Этот метод подобен [_.flatMap](https://lodash.com/docs/4.17.4#flatMap) За исключением того, что он рекурсивно выравнивает отображаемые результаты до заданной глубины.

**Версия:** *4.7.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[iteratee=_.identity] (Function)`: Функция вызывается на каждой итерации.
`[depth=1] (number)`: Максимальная глубина рекурсии.

**Возвращает**

`(Array)`: Возвращает новый сглаженый массив.

### Пример

```javascript

function duplicate(n) {
  return [[[n, n]]];
}

_.flatMapDepth([1, 2], duplicate, 2);
// => [[1, 1], [2, 2]]
```

## .forEach(collection, [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9357),
[npm package](https://www.npmjs.com/package/lodash.foreach).

Перебирает элементы коллекции и вызывает итерацию для каждого элемента.

Итерация вызывается с тремя аргументами: `(value, index|key, collection)`.

Функции итерации могут прервать итерацию раньше, явно возвращая `false`.

**Заметка:** Как и в других методах «Collections», объекты со свойством «length» повторяются как массивы. Чтобы избежать такого поведения, используйте [_.forIn](https://lodash.com/docs/4.17.4#forIn) или [_.forOwn](https://lodash.com/docs/4.17.4#forOwn) для итерации объектов.

**Версия:** *0.1.0*

**Псевдонимы:**

_.each

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[iteratee=_.identity] (Function)`: Функция вызывается на каждой итерации.

**Возвращает**

`(*)`: Возвращает коллекцию.

### Пример

```javascript

_.forEach([1, 2], function(value) {
  console.log(value);
});
// => Logs `1` then `2`.

_.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
```

## .forEachRight(collection, [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9382),
[npm package](https://www.npmjs.com/package/lodash.foreachright).

Этот метод подобен [_.forEach](https://lodash.com/docs/4.17.4#forEach) за исключением того, что он перебирает элементы коллекции справа налево.

**Версия:** *2.0.0*

**Псевдонимы:**

_.eachRight

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[iteratee=_.identity] (Function)`: Функция вызывается на каждой итерации.

**Возвращает**

`(*)`: Возвращает коллекцию.

### Пример

```javascript

_.forEachRight([1, 2], function(value) {
  console.log(value);
});
// => Logs `2` then `1`.
```
