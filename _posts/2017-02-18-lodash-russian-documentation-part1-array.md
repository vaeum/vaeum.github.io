---
title: Lodash документация на русском
layout: post
categories: Lodash
tags: Lodash Документация
---

![Lodash документация на русском](/images/post/Lo-Dash_array_part1.jpg)

# “Массивы” - часть 1

***

## _.chunk

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L6856),
[npm package](https://www.npmjs.com/package/lodash.chunk).

Объединяет элементы в массив с заданной длинной, длинна массива указывается в атрибуте `size`.

Если массив не может быть объединен равномерно, финальный чанк запишет в него оставшиеся элементы.

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив для обработки.

`[size=1] (number)`: Длинна каждого массива.

**Возвращает**

`(Array)`: Возвращает чанк с массивами указанной длинны сгруппированных из указанных элементов.

### Пример

```javascript
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```
---
## _.compact(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L6891),
[npm package](https://www.npmjs.com/package/lodash.compact).

Создает массив в котором все ложные значения будут удалены.

К ложным значениям относятся:
`false, null, 0, "", undefined, NaN`

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив для обработки.

**Возвращает**

`(Array)`: Возвращает новый массив с отфильтрованными значениями.

### Пример

```javascript
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]
```
---
## _.concat(array, [values])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L6928),
[npm package](https://www.npmjs.com/package/lodash.concat).

Создает новый объединенный массив из заданных в качестве атрибутов массивов или значений.

К ложным значениям относятся:
`false, null, 0, "", undefined, NaN`

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для объединения.

`[values] (...*)`: Значения для объединения.

**Возвращает**

`(Array)`: Возвращает новый массив с отфильтрованными значениями.

### Пример

```javascript
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other);
// => [1, 2, 3, [4]]

console.log(array);
// => [1]
```
---

## _.difference(array, [values])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L6964),
[npm package](https://www.npmjs.com/package/lodash.difference).

Создает новый массив из уникальных не дублируемых в проверяемых массивах значений
используя сравнение на равенство каждого значения.

Порядок вывода значений определят первый указанный массив.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив для проверки.
`[values] (...Array)`: Значения которые будут исключены.

**Возвращает**

`(Array)`: Возвращает новый массив с отфильтрованными значениями.

### Пример

```javascript
_.difference([2, 1], [2, 3]);
// => [1]
```
---

## _.differenceBy(array, [values], [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L6996),
[npm package](https://www.npmjs.com/package/lodash.differenceby).

Этот метод похож на `_.difference` за исключением того, что он принимает `iteratee`,
который вызывается для каждого элемента массива и значения для формирования критерия,
по которому они сравниваются.

Порядок вывода результат значений определяет первый массив. `iteratee` вызывается с одним аргументом:
`(value)`.

**Заметка**: В отличии от `_.pullAllBy`, этот метод возвращает новый массив.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для проверки.

`[values] (...Array)`: Значения для исключения.

`[iteratee=_.identity] (Function)`: `iteratee` ссылка на елемент.

**Возвращает**

`(Array)`: Возвращает новый массив с отфильтрованными значениями.

### Пример

```javascript
_.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2]

// The `_.property` iteratee shorthand.
_.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
// => [{ 'x': 2 }]
```
---

## _.differenceWith(array, [values], [comparator])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7029),
[npm package](https://www.npmjs.com/package/lodash.differencewith).

Этот метод похож на `_.difference` за исключением того, что он принимает `comparator `
который вызывается для сравнивания элементов массива по значению.

Порядок вывода результат значений определяет первый массив. `comparator`
вызывается с двумя аргументами: `(arrVal, othVal)`.

**Заметка**: В отличии от `_.pullAllWith`, этот метод возвращает новый массив.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для проверки.

`[values] (...Array)`: Значения для исключения.

`[comparator] (Function)`: `comparator` ссылка на елемент.

**Возвращает**

`(Array)`: Возвращает новый массив с отфильтрованными значениями.

### Пример

```javascript
var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];

_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
// => [{ 'x': 2, 'y': 1 }]
```
---

## _.drop(array, [n=1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7064),
[npm package](https://www.npmjs.com/package/lodash.drop).

Возвращает фрагмент массива с начиная с `n` элемента левого края массива.

**Версия:** *0.5.0*

**Аргументы**

`array (Array)`: Массив для обработки.

`[n=1] (number)`: Число для указания позиции с какой начинать срез массива.

**Возвращает**

`(Array)`: Возвращает фрагмент массива.

### Пример

```javascript
_.drop([1, 2, 3]);
// => [2, 3]

_.drop([1, 2, 3], 2);
// => [3]

_.drop([1, 2, 3], 5);
// => []

_.drop([1, 2, 3], 0);
// => [1, 2, 3]
```
---

## _.dropRight(array, [n=1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7098),
[npm package](https://www.npmjs.com/package/lodash.dropright).

Возвращает фрагмент массива с начиная с `n` элемента правого края массива.

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив для обработки.

`[n=1] (number)`: Число для указания позиции с какой начинать срез массива.

**Возвращает**

`(Array)`: Возвращает фрагмент массива.

### Пример

```javascript
_.dropRight([1, 2, 3]);
// => [1, 2]

_.dropRight([1, 2, 3], 2);
// => [1]

_.dropRight([1, 2, 3], 5);
// => []

_.dropRight([1, 2, 3], 0);
// => [1, 2, 3]
```
---

## _.dropRightWhile(array, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7143),
[npm package](https://www.npmjs.com/package/lodash.droprightwhile).

Возвращает фрагмент массива исключая элементы добавляемые в конец массива.

Элементы исключаются до тех пор пока `predicate` возвращает ложные значения.

`predicate` вызывается с тремя аргументами: `(value, index, array)`.

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив запросов.

`[predicate=_.identity] (Function)`: Функция вызываемая на каждой итерации.

**Возвращает**

`(Array)`: Возвращает фрагмент массива.

### Пример

```javascript
var users = [
  { 'user': 'barney',  'active': true },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': false }
];

_.dropRightWhile(users, function(o) { return !o.active; });
// => objects for ['barney']

// The `_.matches` iteratee shorthand.
_.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
// => objects for ['barney', 'fred']

// The `_.matchesProperty` iteratee shorthand.
_.dropRightWhile(users, ['active', false]);
// => objects for ['barney']

// The `_.property` iteratee shorthand.
_.dropRightWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']
```
---

## _.dropWhile(array, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7184),
[npm package](https://www.npmjs.com/package/lodash.dropwhile).

Возвращает фрагмент массива, кроме элементов, добавленных с начала массива.

Элементы исключаются до тех пор пока `predicate` возвращает ложные значения.

`predicate` вызывается с тремя аргументами: `(value, index, array)`.

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив запросов.

`[predicate=_.identity] (Function)`: Функция вызываемая на каждой итерации.

**Возвращает**

`(Array)`: Возвращает фрагмент массива.

### Пример

```javascript
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];

_.dropWhile(users, function(o) { return !o.active; });
// => objects for ['pebbles']

// The `_.matches` iteratee shorthand.
_.dropWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['fred', 'pebbles']

// The `_.matchesProperty` iteratee shorthand.
_.dropWhile(users, ['active', false]);
// => objects for ['pebbles']

// The `_.property` iteratee shorthand.
_.dropWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']
```
---
