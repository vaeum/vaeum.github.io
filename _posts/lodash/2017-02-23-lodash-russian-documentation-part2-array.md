---
title: Lodash документация на русском (массивы) часть 2
layout: post
categories: Lodash
tags: Lodash Documentation
description: "Вольный перевод документации библиотеки Lodash. В данной статье переведено 10 методов, которые помогают работать с массивами. Расмотренны следующие методы .fill .findIndex .findLastIndex .flatten .flattenDeep .flattenDepth .fromPairs .head .indexOf .initial"
excerpt_text: "Вольный перевод документации библиотеки Lodash, В данной статье переведено 10 методов, которые помогают работать с массивами. Расмотренны следующие методы .fill .findIndex .findLastIndex .flatten .flattenDeep .flattenDepth .fromPairs .head .indexOf .initial"
---

![Lodash документация на русском](/images/post/Lo-Dash_array_part2.jpg)

* TOC
{:toc}

# “Массивы” - часть 2

## .fill(array, value, [start=0], [end=array.length])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7219),
[npm package](https://www.npmjs.com/package/lodash.fill).

Заполняет элементы массива значениями от начала до, не включая конец.

**Заметки**

Этот метод видоизменяет массив.

**Версия:** *3.2.0*

**Аргументы**

`array (Array)`: Массив для заполнения.

`value (*)`: Значения, которыми будет заполнен массив.

`[start=0] (number)`: Начальная позиция заполнения.

`[end=array.length] (number)`: Позиция окончания заполнения.

**Возвращает**

`(Array)`: Возвращает массив.

### Пример

```javascript
var array = [1, 2, 3];

_.fill(array, 'a');
console.log(array);
// => ['a', 'a', 'a']

_.fill(Array(3), 2);
// => [2, 2, 2]

_.fill([4, 6, 8, 10], '*', 1, 3);
// => [4, '*', '*', 10]
```


## .findIndex(array, [predicate=_.identity], [fromIndex=0])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7266),
[npm package](https://www.npmjs.com/package/lodash.findindex).

Этот метод похож на [_.find](https://lodash.com/docs/4.17.4#find) за исключением
того, что он возвращает индекс первого элемента.
`predicate` возвращает истину, а не сам элемент.

**Версия:** *1.1.0*

**Аргументы**

`array (Array)`: Массив для обработки.

`[predicate=_.identity] (Function)`: Функция, вызываемая на каждой итерации.

`[fromIndex=0] (number)`: Индекс начальной позиции поиска.

**Возвращает**

`(number)`: Возвращает индекс найденного элемента, в остальных случаях возвращает -1.

### Пример

```javascript
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];

_.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0

// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1

// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);
// => 0

// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');
// => 2
```


## .findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7313),
[npm package](https://www.npmjs.com/package/lodash.findlastindex).

Этот метод похож на [_.findIndex](https://lodash.com/docs/4.17.4#findIndex) за
исключением того, что он перебирает элементы массива справа налево.

**Версия:** *2.0.0*

**Аргументы**

`array (Array)`: Массив для обработки.

`[predicate=_.identity] (Function)`: Функция, вызываемая на каждой итерации.

`[fromIndex=array.length-1] (number)`: Индекс начальной позиции поиска.

**Возвращает**

`(number)`: Возвращает индекс найденного элемента, в остальных случаях возвращает -1.

### Пример

```javascript
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

_.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
// => 2

// The `_.matches` iteratee shorthand.
_.findLastIndex(users, { 'user': 'barney', 'active': true });
// => 0

// The `_.matchesProperty` iteratee shorthand.
_.findLastIndex(users, ['active', false]);
// => 2

// The `_.property` iteratee shorthand.
_.findLastIndex(users, 'active');
// => 0
```


## .flatten(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7342),
[npm package](https://www.npmjs.com/package/lodash.flatten).

Сглаживает массив на один уровень вложенности.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив для сглаживания.

**Возвращает**

`(Array)`: Возвращает новый сглаженный массив.

### Пример

```javascript
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
```


## .flattenDeep(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7361),
[npm package](https://www.npmjs.com/package/lodash.flattendeep).

Рекурсивно сглаживает все уровни вложенности массива.

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив для сглаживания.

**Возвращает**

`(Array)`: Возвращает новый сглаженный массив.

### Пример

```javascript
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]
```


## .flattenDepth(array, [depth=1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7386),
[npm package](https://www.npmjs.com/package/lodash.flattendepth).

Рекурсивно сглаживает уровни вложенности массива до указанной глубины.

**Версия:** *4.4.0*

**Аргументы**

`array (Array)`: Массив для сглаживания.

`[depth=1] (number)`: Указываем на сколько уровней сгладить вложенность массива.

**Возвращает**

`(Array)`: Возвращает новый сглаженный массив.

### Пример

```javascript
var array = [1, [2, [3, [4]], 5]];

_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]

_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
```

## .fromPairs(pairs)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7410),
[npm package](https://www.npmjs.com/package/lodash.frompairs).

Инверсивная версия метода [_.toPairs](https://lodash.com/docs/4.17.4#toPairs);
этот метод возвращает объект, состоящий из пар ключ-значение.

**Версия:** *4.0.0*

**Аргументы**

`pairs (Array)`: Пары ключ-значение.

**Возвращает**

`(Object)`: Возвращает новый объект.

### Пример

```javascript
_.fromPairs([['a', 1], ['b', 2]]);
// => { 'a': 1, 'b': 2 }
```

## .head(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7440),
[npm package](https://www.npmjs.com/package/lodash.head).

Возвращает первый элемент массива.

**Версия:** *0.1.0*

**Псевдонимы:** `_.first`

**Аргументы**

`array (Array)`: Массив запросов.

**Возвращает**

`(*)`: Возвращает первый элемент массива.

### Пример

```javascript
_.head([1, 2, 3]);
// => 1

_.head([]);
// => undefined
```

## .indexOf(array, value, [fromIndex=0])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7467),
[npm package](https://www.npmjs.com/package/lodash.indexof).

Возвращает индекс места в массиве, в котором впервые встречается искомое значение,
используя принцип сравнения на равенство каждого значения.

Если `fromindex` отрицательный, поиск начинается с конца массива.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив для проверки.

`value (*)`: Значение для поиска.

`[fromIndex=0] (number)`: Индекс начальной позиции поиска.

**Возвращает**

`(number)`: Возвращает индекс найденного элемента, в остальных случаях возвращает -1.

### Пример

```javascript
_.indexOf([1, 2, 1, 2], 2);
// => 1

// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3
```

## .initial(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7493),
[npm package](https://www.npmjs.com/package/lodash.initial).

Возвращает все, кроме последнего элемента массива.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив запросов.

**Возвращает**

`(Array)`: Возвращает фрагмент массива.

### Пример

```javascript
_.initial([1, 2, 3]);
// => [1, 2]
```
[Часть 1](http://vaeum.com/blog/2017/02/18/lodash-russian-documentation-part1-array/)

