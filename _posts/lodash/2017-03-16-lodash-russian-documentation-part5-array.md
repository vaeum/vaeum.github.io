---
title: Lodash документация на русском (массивы) часть 5
layout: post
categories: Lodash
tags: Lodash Documentation
description: "Вольный перевод документации библиотеки Lodash. В данной статье переведено 10 методов, которые помогают работать с массивами. Рассмотрены следующие методы .sortedLastIndexOf .sortedUniq .sortedUniqBy .tail .take .takeRight .takeRightWhile .takeWhile .union .unionBy"

excerpt_text: "Вольный перевод документации библиотеки Lodash. В данной статье переведено 10 методов, которые помогают работать с массивами. Рассмотрены следующие 
методы .sortedLastIndexOf .sortedUniq .sortedUniqBy .tail .take .takeRight .takeRightWhile .takeWhile .union .unionBy"
---

![Lodash документация на русском](/images/post/Lo-Dash_array_part5.jpg)

* TOC
{:toc}

# “Массивы” - часть 5

## .sortedLastIndexOf(array, value)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8088),
[npm package](https://www.npmjs.com/package/lodash.sortedlastindexof).

Этот метод подобен [_.lastIndexOf](https://lodash.com/docs/4.17.4#lastIndexOf) за исключением того, что он выполняет двоичный поиск в отсортированном массиве.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для проверки.
`value (*)`: Значение для поиска.

**Возвращает**

`(number)`: Возвращает индекс найденного значения, иначе -1.

### Пример

```javascript

_.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
// => 3

```

## .sortedUniq(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8114),
[npm package](https://www.npmjs.com/package/lodash.sorteduniq).

Этот метод подобен [_.uniq](https://lodash.com/docs/4.17.4#uniq) за исключением того, что он создан и оптимизирован для отсортированных массивов.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для обработки.

**Возвращает**

(Array): Возвращает новый дубликат отсортированного массива.

### Пример

```javascript

_.sortedUniq([1, 1, 2]);
// => [1, 2]

```

## .sortedUniqBy(array, [iteratee])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8136),
[npm package](https://www.npmjs.com/package/lodash.sorteduniqby).

Этот метод подобен [_.uniqBy](https://lodash.com/docs/4.17.4#uniqBy) за исключением того, что он создан и оптимизирован для отсортированных массивов.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для обработки.
[iteratee] (Function): `iteratee` ссылаться на элемент.

**Возвращает**

(Array): Возвращает новый дубликат отсортированного массива.

### Пример

```javascript

_.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
// => [1.1, 2.3]

```

## .tail(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8156),
[npm package](https://www.npmjs.com/package/lodash.tail).

Получает все, кроме первого элемента массива.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для запроса.

**Возвращает**

`(Array)`: Возвращает срез массива.

### Пример

```javascript

_.tail([1, 2, 3]);
// => [2, 3]

```

## .take(array, [n=1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8186),
[npm package](https://www.npmjs.com/package/lodash.take).

Создает срез массива из `n` элементов, взятых с начала массива.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив для запроса.
`[n=1] (number)`: Количество взятых элементов.

**Возвращает**

`(Array)`: Возвращает срез массива.

### Пример

```javascript

_.take([1, 2, 3]);
// => [1]
 
_.take([1, 2, 3], 2);
// => [1, 2]
 
_.take([1, 2, 3], 5);
// => [1, 2, 3]
 
_.take([1, 2, 3], 0);
// => []

```

## .takeRight(array, [n=1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8219),
[npm package](https://www.npmjs.com/package/lodash.takeright).

Создает срез массива из `n` элементов, взятых с конца массива.

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив для запроса.
`[n=1] (number)`: Количество взятых элементов.

**Возвращает**

`(Array)`: Возвращает срез массива.

### Пример

```javascript

_.takeRight([1, 2, 3]);
// => [3]
 
_.takeRight([1, 2, 3], 2);
// => [2, 3]
 
_.takeRight([1, 2, 3], 5);
// => [1, 2, 3]
 
_.takeRight([1, 2, 3], 0);
// => []

```

## .takeRightWhile(array, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8264),
[npm package](https://www.npmjs.com/package/lodash.takerightwhile).

Создает срез массива из `n` элементов, взятых с конца массива.

Элементы принимаются до тех пор пока `predicate` возвращает лож.

`predicate` вызывается с тремя аргументами: (value, index, array).

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив для запроса.
`[predicate=_.identity] (Function)`: Функция вызывается на каждой итерации.

**Возвращает**

`(Array)`: Возвращает срез массива.

### Пример

```javascript

var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];
 
_.takeRightWhile(users, function(o) { return !o.active; });
// => objects for ['fred', 'pebbles']
 
// The `_.matches` iteratee shorthand.
_.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['pebbles']
 
// The `_.matchesProperty` iteratee shorthand.
_.takeRightWhile(users, ['active', false]);
// => objects for ['fred', 'pebbles']
 
// The `_.property` iteratee shorthand.
_.takeRightWhile(users, 'active');
// => []

```

## .takeWhile(array, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8305),
[npm package](https://www.npmjs.com/package/lodash.takewhile).

Создает срез массива из `n` элементов, взятых с начала массива.

Элементы принимаются до тех пор пока `predicate` возвращает лож.

`predicate` вызывается с тремя аргументами: (value, index, array).

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив для запроса.
`[predicate=_.identity] (Function)`: Функция вызывается на каждой итерации.

**Возвращает**

`(Array)`: Возвращает срез массива.

### Пример

```javascript

var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.takeWhile(users, function(o) { return !o.active; });
// => objects for ['barney', 'fred']
 
// The `_.matches` iteratee shorthand.
_.takeWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['barney']
 
// The `_.matchesProperty` iteratee shorthand.
_.takeWhile(users, ['active', false]);
// => objects for ['barney', 'fred']
 
// The `_.property` iteratee shorthand.
_.takeWhile(users, 'active');
// => []

```

## .union([arrays])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8327),
[npm package](https://www.npmjs.com/package/lodash.union).

Создает массив из уникальных значений, из всех указанных массивов с использованием [SameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) для сравнения на равенство.

**Версия:** *0.1.0*

**Аргументы**

`[arrays] (...Array)`: Массивы для проверки.

**Возвращает**

`(Array)`: Возвращает новый массив из комбинированных значений.

### Пример

```javascript

_.union([2], [1, 2]);
// => [2, 1]

```

## .unionBy([arrays], [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8354),
[npm package](https://www.npmjs.com/package/lodash.unionby).

что он создан и оптимизирован для отсортированных массивов.

Этот метод подобен [_.union](https://lodash.com/docs/4.17.4#union) за исключением того что `iteratee` вызывается для каждого элемента каждого массива, чтобы создать критерий, по которому вычисляется уникальность.

Значения выбираются из первого массива, в котором значение происходит. В `iteratee` вызывается с одним аргументом: (value).

**Версия:** *4.0.0*

**Аргументы**

`[arrays] (...Array)`: Массивы для проверки.
`[iteratee=_.identity] (Function)`: `iteratee` ссылаться на элемент.

**Возвращает**

`(Array)`: Возвращает новый массив из комбинированных значений.

### Пример

```javascript

_.unionBy([2.1], [1.2, 2.3], Math.floor);
// => [2.1, 1.2]
 
// The `_.property` iteratee shorthand.
_.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }, { 'x': 2 }]

```


[Часть 1](http://vaeum.com/blog/2017/02/18/lodash-russian-documentation-part1-array/)
[Часть 2](http://vaeum.com/blog/2017/02/23/lodash-russian-documentation-part2-array/)
[Часть 3](http://vaeum.com/blog/2017/02/26/lodash-russian-documentation-part3-array/)
[Часть 4](http://vaeum.com/blog/2017/03/16/lodash-russian-documentation-part4-array/)


