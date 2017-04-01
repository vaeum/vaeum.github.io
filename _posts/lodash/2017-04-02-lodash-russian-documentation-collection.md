---
title: Lodash документация на русском (Коллекции)
layout: post
categories: Lodash
tags: Lodash Documentation
description: Перевод всех методов для работы с Коллекциями в Lodash. Перевод документации Lodash.
excerpt_text: Перевод всех методов для работы с Коллекциями в Lodash. Перевод документации Lodash. Рассмотрены следующие методы .groupBy .includes .invokeMap .keyBy .map .orderBy .partition .reduce .reduceRight .reject .sample .sampleSize .shuffle .size .some .sortBy
published: true
---

![Lodash документация на русском](/images/post/Lodash/Lo-Dash_сollection.jpg)

* TOC
{:toc}

# “Коллекции”

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

## .groupBy(collection, [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9410),
[npm package](https://www.npmjs.com/package/lodash.groupby).

Создает объект, состоящий из ключей, сгенерированных из результатов запуска каждого элемента коллекции через `iteratee`. 

Порядок сгруппированных значений определяется порядком их расположения в коллекции.

Соответствующее значение каждого ключа представляет собой массив элементов, ответственных за генерацию ключа.

`iteratee` вызывается с одним аргументом: `(value)`

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[iteratee=_.identity] (Function)`: `iteratee` для преобразования ключей.

**Возвращает**

`(Object)`: Возвращает составной совокупный объект.

### Пример

```javascript
_.groupBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': [4.2], '6': [6.1, 6.3] }
 
// The `_.property` iteratee shorthand.
_.groupBy(['one', 'two', 'three'], 'length');
// => { '3': ['one', 'two'], '5': ['three'] }
```

## .includes(collection, value, [fromIndex=0])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9448),
[npm package](https://www.npmjs.com/package/lodash.includes).

Проверяет, находится ли значение в коллекции. Если коллекция является строкой, она проверяется на подстроку значения, в противном случае [SameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) используется для сравнения равенств. Если `fromIndex` имеет отрицательное значение, оно используется как смещение от конца коллекции.

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object|string)`: Коллекции для проверки.
`value (*)`: Значение для поиска.
`[fromIndex=0] (number)`: Индекс для поиска.

**Возвращает**

`(boolean)`: Возвращает `true`, если значение найдено, иначе `false`.

### Пример

```javascript
_.includes([1, 2, 3], 1);
// => true
 
_.includes([1, 2, 3], 1, 2);
// => false
 
_.includes({ 'a': 1, 'b': 2 }, 1);
// => true
 
_.includes('abcd', 'bc');
// => true
```

## .invokeMap(collection, path, [args])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9484),
[npm package](https://www.npmjs.com/package/lodash.invokemap).

Вызывает метод на пути каждого элемента в коллекции, возвращает массив результатов каждого вызываемого метода.

Любые дополнительные аргументы предоставляются каждому вызываемому методу.

Если `path` является функцией, он вызывается для каждого связанного с ним элемента в коллекции.

**Версия:** *4.0.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`path (Array|Function|string)`: `path` метода или функции вызывается на каждой итерации.
`[args] (...*)`: Аргументы для вызова каждого метода.

**Возвращает**

`(Array)`: Возвращает массив результатов.

### Пример

```javascript
_.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
// => [[1, 5, 7], [1, 2, 3]]
 
_.invokeMap([123, 456], String.prototype.split, '');
// => [['1', '2', '3'], ['4', '5', '6']]
```

## .keyBy(collection, [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9523),
[npm package](https://www.npmjs.com/package/lodash.keyby).

Создает объект, состоящий из ключей, сгенерированных из результатов запуска каждого элемента коллекции через `iteratee`. 

Соответствующее значение каждого ключа является последним элементом, ответственным за генерацию ключа.

`iteratee` вызывается с одним аргументом: `(value)`.

**Версия:** *4.0.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[iteratee=_.identity] (Function)`: `iteratee` для преобразования ключей.

**Возвращает**

`(Object)`: Возвращает составной совокупный объект.

### Пример

```javascript
var array = [
  { 'dir': 'left', 'code': 97 },
  { 'dir': 'right', 'code': 100 }
];
 
_.keyBy(array, function(o) {
  return String.fromCharCode(o.code);
});
// => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 
_.keyBy(array, 'dir');
// => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
```

## .map(collection, [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9569),
[npm package](https://www.npmjs.com/package/lodash.map).

Создает массив значений, запустив каждый элемент коллекции через `iteratee`.

`iteratee` вызывается с тремя аргументами: `(value, index|key, collection)`.

Многие методы lodash охраняются для работы в качестве итераций для таких методов, как [_.every](https://lodash.com/docs/4.17.4#every), [_.filter](https://lodash.com/docs/4.17.4#filter), [_.map](https://lodash.com/docs/4.17.4#map), [_.mapValues](https://lodash.com/docs/4.17.4#mapValues), [_.reject](https://lodash.com/docs/4.17.4#reject), и [_.some](https://lodash.com/docs/4.17.4#some).

**Охраняемые методы:**
ary, chunk, curry, curryRight, drop, dropRight, every, fill, invert, parseInt, random, range, rangeRight, repeat, sampleSize, slice, some, sortBy, split, take, takeRight, template, trim, trimEnd, trimStart, and words

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[iteratee=_.identity] (Function)`: Функция вызывается на каждой итерации.

**Возвращает**

`(Array)`: Возвращает новый подключенный массив.

### Пример

```javascript
function square(n) {
  return n * n;
}
 
_.map([4, 8], square);
// => [16, 64]
 
_.map({ 'a': 4, 'b': 8 }, square);
// => [16, 64] (iteration order is not guaranteed)
 
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];
 
// The `_.property` iteratee shorthand.
_.map(users, 'user');
// => ['barney', 'fred']
```

## .orderBy(collection, [iteratees=[_.identity]], [orders])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9603),
[npm package](https://www.npmjs.com/package/lodash.orderby).

Этот метод подобен [_.sortBy](https://lodash.com/docs/4.17.4#sortBy) за исключением того, что он позволяет указывать порядки сортировки для итераций.

Если заказы не указаны, все значения сортируются в порядке возрастания.

В противном случае укажите порядок «desc» для нисходящего или «asc» для восходящего порядка сортировки соответствующих значений.

**Версия:** *4.0.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[iteratees=[_.identity]] (Array[]|Function[]|Object[]|string[])`: `iteratees` для сортировки.
`[orders] (string[])`: Порядок сортировки `iteratees`.

**Возвращает**

`(Array)`: Возвращает новый отсортированный массив.

### Пример

```javascript
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];
 
// Sort by `user` in ascending order and by `age` in descending order.
_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
```

## .partition(collection, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9653),
[npm package](https://www.npmjs.com/package/lodash.partition).

Создает массив элементов, разбитых на две группы, первый из которых содержит элементы, для которых предикат возвращает `truey`, второй из которых содержит элементы, для которых предикат возвращает `false`.

`predicate` вызывается с одним аргументом: `(value)`.

**Версия:** *3.0.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[predicate=_.identity] (Function)`: Функция вызывается на каждой `iteration`.

**Возвращает**

`(Array)`: Возвращает массив сгруппированных элементов.

### Пример

```javascript
var users = [
  { 'user': 'barney',  'age': 36, 'active': false },
  { 'user': 'fred',    'age': 40, 'active': true },
  { 'user': 'pebbles', 'age': 1,  'active': false }
];
 
_.partition(users, function(o) { return o.active; });
// => objects for [['fred'], ['barney', 'pebbles']]
 
// The `_.matches` iteratee shorthand.
_.partition(users, { 'age': 1, 'active': false });
// => objects for [['pebbles'], ['barney', 'fred']]
 
// The `_.matchesProperty` iteratee shorthand.
_.partition(users, ['active', false]);
// => objects for [['barney', 'pebbles'], ['fred']]
 
// The `_.property` iteratee shorthand.
_.partition(users, 'active');
// => objects for [['fred'], ['barney', 'pebbles']]
```

## .reduce(collection, [iteratee=_.identity], [accumulator])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9694),
[npm package](https://www.npmjs.com/package/lodash.reduce).

Уменьшает коллекции значению, накопленные результат выполнения каждого элемента в коллекции через `iteratee`, где каждый последующий вызов поступает возвращаемое значение предыдущего.

Если накопитель не задан, в качестве начального значения используется первый элемент коллекции.

`iteratee` вызывается с четырьмя аргументами: `(accumulator, value, index|key, collection)`.

Многие методы lodash охраняются для работы в качестве итераций для таких методов, как [_.reduce](https://lodash.com/docs/4.17.4#reduce), [_.reduceRight](https://lodash.com/docs/4.17.4#reduceRight), и [_.transform](https://lodash.com/docs/4.17.4#transform).

**The guarded methods are:**
assign, defaults, defaultsDeep, includes, merge, orderBy, and sortBy

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[iteratee=_.identity] (Function)`: Функция вызывается на каждой итерации.
`[accumulator] (*)`: Начальное значение.

**Возвращает**

`(*)`: Возвращает накопленное значение.

### Пример

```javascript
_.reduce([1, 2], function(sum, n) {
  return sum + n;
}, 0);
// => 3
 
_.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
  (result[value] || (result[value] = [])).push(key);
  return result;
}, {});
// => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
```

## .reduceRight(collection, [iteratee=_.identity], [accumulator])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9723),
[npm package](https://www.npmjs.com/package/lodash.reduceright).

Этот метод подобен [_.reduce](https://lodash.com/docs/4.17.4#reduce) за исключением того, что он перебирает элементы коллекции справа налево.

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[iteratee=_.identity] (Function)`: Функция вызывается на каждой итерации.
`[accumulator] (*)`: Начальное значение.

**Возвращает**

`(*)`: Returns the accumulated value.

### Пример

```javascript
var array = [[0, 1], [2, 3], [4, 5]];
 
_.reduceRight(array, function(flattened, other) {
  return flattened.concat(other);
}, []);
// => [4, 5, 2, 3, 0, 1]
```

## .reject(collection, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9764),
[npm package](https://www.npmjs.com/package/lodash.reject).

Противоположно [_.filter](https://lodash.com/docs/4.17.4#filter) этот метод возвращает элементы коллекции, для которых `predicate` не возвращает `true`.

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[predicate=_.identity] (Function)`: Функция вызывается на каждой `iteration`.

**Возвращает**

`(Array)`: Возвращает новый отфильтрованный массив.

### Пример

```javascript
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': true }
];
 
_.reject(users, function(o) { return !o.active; });
// => objects for ['fred']
 
// The `_.matches` iteratee shorthand.
_.reject(users, { 'age': 40, 'active': true });
// => objects for ['barney']
 
// The `_.matchesProperty` iteratee shorthand.
_.reject(users, ['active', false]);
// => objects for ['fred']
 
// The `_.property` iteratee shorthand.
_.reject(users, 'active');
// => objects for ['barney']
```

## .sample(collection)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9783),
[npm package](https://www.npmjs.com/package/lodash.sample).

Возвращает случайный элемент из коллекции.

**Версия:** *2.0.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для образца.

**Возвращает**

`(*)`: Возвращает случайный элемент.

### Пример

```javascript
_.sample([1, 2, 3, 4]);
// => 2
```

## .sampleSize(collection, [n=1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9808),
[npm package](https://www.npmjs.com/package/lodash.samplesize).

Получает `n` случайных элементов в уникальных ключах из коллекции до размера коллекции.

**Версия:** *4.0.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для образца.
`[n=1] (number)`: Количество элементов для выборки.

**Возвращает**

`(Array)`: Возвращает случайные элементы.

### Пример

```javascript
_.sampleSize([1, 2, 3], 2);
// => [3, 1]
 
_.sampleSize([1, 2, 3], 4);
// => [2, 3, 1]
```

## .shuffle(collection)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9833),
[npm package](https://www.npmjs.com/package/lodash.shuffle).

Создает массив перетасованных значений, используя версию [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object)`: Коллекция для перетасовки.

**Возвращает**

`(Array)`: Возвращает новый перемешанный массив.

### Пример

```javascript
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```

## .size(collection)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9859),
[npm package](https://www.npmjs.com/package/lodash.size).

Получает размер коллекции, возвращая ее длину для значений типа массива или число собственных свойств перечисляемой строки для объектов.

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object|string)`: Коллекции для проверки.

**Возвращает**

`(number)`: Возвращает размер коллекции.

### Пример

```javascript
_.size([1, 2, 3]);
// => 3
 
_.size({ 'a': 1, 'b': 2 });
// => 2
 
_.size('pebbles');
// => 7
```

## .some(collection, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9909),
[npm package](https://www.npmjs.com/package/lodash.some).

Проверяет, возвращает ли предикат `truthy` для любого элемента коллекции. Итерация останавливается, как только предикат возвращает `true`.

`predicate` вызывается с тремя аргументами: `(value, index|key, collection)`.

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[predicate=_.identity] (Function)`: Функция вызывается на каждой итерации.

**Возвращает**

`(boolean)`: 
Возвращает `true`, если любой элемент проходит проверку `predicate`, иначе `false`.

### Пример

```javascript
_.some([null, 0, 'yes', false], Boolean);
// => true
 
var users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'fred',   'active': false }
];
 
// The `_.matches` iteratee shorthand.
_.some(users, { 'user': 'barney', 'active': false });
// => false
 
// The `_.matchesProperty` iteratee shorthand.
_.some(users, ['active', false]);
// => true
 
// The `_.property` iteratee shorthand.
_.some(users, 'active');
// => true
```

## .sortBy(collection, [iteratees=[_.identity]])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L9946),
[npm package](https://www.npmjs.com/package/lodash.sortby).

Создает массив элементов, отсортированный в порядке возрастания по результатам выполнения каждого элемента коллекции через каждую итерацию.

Этот метод выполняет устойчивую сортировку, то есть сохраняет исходный порядок сортировки равных элементов.

`iteratees` вызывается с одним аргументом: `(value)`.

**Версия:** *0.1.0*

**Аргументы**

`collection (Array|Object)`: Коллекции для перебора.
`[iteratees=[_.identity]] (...(Function|Function[]))`: `iteratees` для сортировки.

**Возвращает**

`(Array)`: Возвращает новый отсортированный массив.

### Пример

```javascript
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 34 }
];
 
_.sortBy(users, [function(o) { return o.user; }]);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 
_.sortBy(users, ['user', 'age']);
// => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
```
