---
title: Lodash документация на русском (массивы)
layout: post
categories: Lodash
tags: Lodash Documentation
description: >-
  Перевод документации библиотеки Lodash. В этой статье на русский язык
  переведены все методы для работы с Массивами в Lodash.
excerpt_text: >-
  Перевод документации библиотеки Lodash. В этой статье на русский язык
  переведены все методы для работы с Массивами в Lodash. Рассмотрены следующие
  методы .chunk .compact .concat .difference .differenceBy .differenceWith .drop
  .dropRight .dropRightWhile .dropWhile .fill .findIndex .findLastIndex .flatten
  .flattenDeep .flattenDepth .fromPairs .head .indexOf .initial .intersection
  .intersectionBy .intersectionWith .join .last .lastIndexOf .nth .pull .pullAll
  .pullAllBy .pullAllWith .pullAt .remove .reverse .slice .sortedIndex
  .sortedIndexBy .sortedLastIndexOf .sortedUniq .sortedUniqBy .tail .take
  .takeRight .takeRightWhile .takeWhile .uniq .uniqBy .uniqWith .unzip
  .unzipWith .without .xor .xorBy .xorWith .zip .zipObject .zipObjectDeep
  .zipWith
published: true
---

![Lodash документация на русском](/images/post/Lo-Dash_array.jpg)

* TOC
{:toc}

# “Массивы”

## .chunk

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L6856),
[npm package](https://www.npmjs.com/package/lodash.chunk).

Объединяет элементы в массив с заданной длиной, длина массива указывается в атрибуте `size`.

Если массив не может быть объединен равномерно, финальный чанк запишет в него оставшиеся элементы.

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив для обработки.

`[size=1] (number)`: Длина каждого массива.

**Возвращает**

`(Array)`: Возвращает чанк с массивами указанной длины сгруппированных из указанных элементов.

### Пример

```javascript

_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]

```


## .compact(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L6891),
[npm package](https://www.npmjs.com/package/lodash.compact).

Создает массив, в котором все ложные значения будут удалены.

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


## .concat(array, [values])

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


## .difference(array, [values])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L6964),
[npm package](https://www.npmjs.com/package/lodash.difference).

Создает новый массив из уникальных не дублируемых в проверяемых массивах значений,
используя сравнение на равенство каждого значения.

Порядок вывода значений определят первый указанный массив.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив для проверки.
`[values] (...Array)`: Значения, которые будут исключены.

**Возвращает**

`(Array)`: Возвращает новый массив с отфильтрованными значениями.

### Пример

```javascript

_.difference([2, 1], [2, 3]);
// => [1]

```


## .differenceBy(array, [values], [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L6996),
[npm package](https://www.npmjs.com/package/lodash.differenceby).

Этот метод похож на `_.difference` за исключением того, что он принимает `iteratee`,
который вызывается для каждого элемента массива и значения для формирования критерия,
по которому они сравниваются.

Порядок вывода результата значений определяет первый массив. `iteratee` вызывается с одним аргументом:
`(value)`.

**Заметка**: В отличии от `_.pullAllBy`, этот метод возвращает новый массив.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для проверки.

`[values] (...Array)`: Значения для исключения.

`[iteratee=_.identity] (Function)`: `iteratee` ссылка на элемент.

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


## .differenceWith(array, [values], [comparator])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7029),
[npm package](https://www.npmjs.com/package/lodash.differencewith).

Этот метод похож на `_.difference` за исключением того, что он принимает `comparator `,
который вызывается для сравнивания элементов массива по значению.

Порядок вывода результата значений определяет первый массив. `comparator`
вызывается с двумя аргументами: `(arrVal, othVal)`.

**Заметка**: В отличии от `_.pullAllWith`, этот метод возвращает новый массив.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для проверки.

`[values] (...Array)`: Значения для исключения.

`[comparator] (Function)`: `comparator` ссылка на элемент.

**Возвращает**

`(Array)`: Возвращает новый массив с отфильтрованными значениями.

### Пример

```javascript

var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];

_.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
// => [{ 'x': 2, 'y': 1 }]

```


## .drop(array, [n=1])

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


## .dropRight(array, [n=1])

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


## .dropRightWhile(array, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7143),
[npm package](https://www.npmjs.com/package/lodash.droprightwhile).

Возвращает фрагмент массива, исключая элементы добавляемые в конец массива.

Элементы исключаются до тех пор, пока `predicate` возвращает ложные значения.

`predicate` вызывается с тремя аргументами: `(value, index, array)`.

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив запросов.

`[predicate=_.identity] (Function)`: Функция, вызываемая на каждой итерации.

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


## .dropWhile(array, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7184),
[npm package](https://www.npmjs.com/package/lodash.dropwhile).

Возвращает фрагмент массива, кроме элементов, добавленных с начала массива.

Элементы исключаются до тех пор, пока `predicate` возвращает ложные значения.

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


## .intersection([arrays])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7515),
[npm package](https://www.npmjs.com/package/lodash.intersection).

Создает новый массив из значений, встречающихся в во всех проверяемых массивах, используя сравнение на равенство каждого значения.

Порядок вывода значений определяет первый указанный массив.

**Версия:** *0.1.0*

**Аргументы**

`[arrays] (...Array)`: Массивы для проверки.

**Возвращает**

`(Array)`: Возвращает новый массив из пересекающихся значений.

### Пример

```javascript

_.intersection([2, 1], [2, 3]);
// => [2]

```


## .intersectionBy([arrays], [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7545),
[npm package](https://www.npmjs.com/package/lodash.intersectionby).

Этот метод подобен [_.intersection](https://lodash.com/docs/4.17.4#intersection) кроме того, что он принимает `iteratee`, который вызывается для каждого элемента каждого массива, чтобы создать критерий, по которому они сравниваются. 

Порядок и ссылки на результат значений определяет первый массив.

Вызов `iteratee` производится с одним аргументом: `(value)`.

**Версия:** *4.0.0*

**Аргументы**

`[arrays] (...Array)`: Массивы для обработки.
`[iteratee=_.identity] (Function)`: Функция, вызываемая на каждой итерации.

**Возвращает**

`(Array)`: Возвращает новый массив пересекающихся значений.

### Пример

```javascript

_.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [2.1]
 
// The `_.property` iteratee shorthand.
_.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 1 }]

```


## .intersectionWith([arrays], [comparator])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7580),
[npm package](https://www.npmjs.com/package/lodash.intersectionwith).

Этот метод подобен [_.intersection](https://lodash.com/docs/4.17.4#intersection) за исключением того, что он принимает `comparator`, который вызывается для сравнения элементов массивов. 

Порядок и ссылки на результат значений определяет первый массив. 

Вызов `comparator ` производится с двумя аргументами: `(arrVal, othVal)`.

**Версия:** *4.0.0*

**Аргументы**

`[arrays] (...Array)`: Массивы для обработки.
`[comparator] (Function)`: `comparator ` ссылаться на каждый элемент.

**Возвращает**

`(Array)`: Возвращает новый массив из пересекающихся значений.

### Пример

```javascript

var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.intersectionWith(objects, others, _.isEqual);
// => [{ 'x': 1, 'y': 2 }]

```


## .join(array, [separator=','])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7608),
[npm package](https://www.npmjs.com/package/lodash.join).

Преобразует все элементы массива в строку, разделенную разделителем.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для преобразования.
`[separator=','] (string)`: Задаем разделитель.

**Возвращает**

`(string)`: Возвращает строку объединенных значений.

### Пример

```javascript

_.join(['a', 'b', 'c'], '~');
// => 'a~b~c'

```


## .last(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7626),
[npm package](https://www.npmjs.com/package/lodash.last).

Возвращает последний элемент массива.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив для запроса.

**Возвращает**

`(*)`: Возвращает последний элемент массива.

### Пример

```javascript

_.last([1, 2, 3]);
// => 3

```


## .lastIndexOf(array, value, [fromIndex=array.length-1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7652),
[npm package](https://www.npmjs.com/package/lodash.lastindexof).

Этот метод подобен [_.indexOf](https://lodash.com/docs/4.17.4#indexOf) за исключением того, что он перебирает элементы массива справа налево.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив для проверки.
`value (*)`: Значение для поиска.
`[fromIndex=array.length-1] (number)`: Индекс начальной позиции для поиска.

**Возвращает**

`(number)`: Возвращает индекс найденного значения, иначе -1.

### Пример

```javascript

_.lastIndexOf([1, 2, 1, 2], 2);
// => 3
 
// Search from the `fromIndex`.
_.lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1

```


## .nth(array, [n=0])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7688),
[npm package](https://www.npmjs.com/package/lodash.nth).

Возвращает элемент с индексом `n` из массива. Если `n` отрицательное число, то будет возвращен `nth` элемент с конца.

**Версия:** *4.11.0*

**Аргументы**

`array (Array)`: Массив для проверки.
`[n=0] (number)`: Индекс возвращенного элемента.

**Возвращает**

`(*)`: Возвращает `nth` элемент массива.

### Пример

```javascript

var array = ['a', 'b', 'c', 'd'];
 
_.nth(array, 1);
// => 'b'
 
_.nth(array, -2);
// => 'c';

```


## .pull(array, [values])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7715),
[npm package](https://www.npmjs.com/package/lodash.pull).

Удаляет все заданные значения из массива, используя для сравнения равенства метод [SameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero).

**Заметка:** 

В отличие от [_.without](https://lodash.com/docs/4.17.4#without), этот метод изменяет массив. Используйте [_.remove](https://lodash.com/docs/4.17.4#remove) для удаления элементов из массива с помощью утверждения.

**Версия:** *2.0.0*

**Аргументы**

`array (Array)`: Массив для изменения.
`[values] (...*)`: Значение, которое будет удалено удалением.

**Возвращает**

`(Array)`: Возвращает массив.

### Пример

```javascript

var array = ['a', 'b', 'c', 'a', 'b', 'c'];
 
_.pull(array, 'a', 'c');
console.log(array);
// => ['b', 'b']

```


## .pullAll(array, values)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7737),
[npm package](https://www.npmjs.com/package/lodash.pullall).

Этот метод подобен [_.pull](https://lodash.com/docs/4.17.4#pull) за исключением того, что он принимает массив значений для удаления.

**Заметка:** 

В отличие от [_.difference](https://lodash.com/docs/4.17.4#difference), этот метод изменяет массив.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для изменения.
`[values] (...*)`: Значение, которое будет удалено удалением.

**Возвращает**

`(Array)`: Возвращает массив.

### Пример

```javascript

var array = ['a', 'b', 'c', 'a', 'b', 'c'];
 
_.pullAll(array, ['a', 'c']);
console.log(array);
// => ['b', 'b']

```


## .pullAllBy(array, values, [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7766),
[npm package](https://www.npmjs.com/package/lodash.pullallby).

Этот метод подобен [_.pullAll](https://lodash.com/docs/4.17.4#pullAll) за исключением того, что он принимает `iteratee`, который вызывается для каждого элемента массива и значений для генерации критерия, с помощью которого они сравниваются. 

`iteratee` вызывается с одним аргументом: `(value)`.

**Заметка:** 

В отличие от [_.differenceBy](https://lodash.com/docs/4.17.4#differenceBy), этот метод изменяет массив.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для изменения.
`values (Array)`: Значения, которые будут удалены.
`[iteratee=_.identity] (Function)`: `iteratee` вызывается для каждого элемента.

**Возвращает**

(Array): Возвращает массив.

### Пример

```javascript

var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 
_.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
console.log(array);
// => [{ 'x': 2 }]

```


## .pullAllWith(array, values, [comparator])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7795),
[npm package](https://www.npmjs.com/package/lodash.pullallwith).

Этот метод подобен [_.pullAll](https://lodash.com/docs/4.17.4#pullAll) кроме того, что он принимает `comparator` которая вызывается, чтобы сравнить элементы от `array` до `values`. Вызов `comparator` производится с двумя аргументами: (arrVal, othVal).

**Заметка:**

Unlike [_.differenceWith](https://lodash.com/docs/4.17.4#differenceWith), this method mutates array.

**Версия:** *4.6.0*

**Аргументы**

`array (Array)`: Массив для обработки.
`values (Array)`: Значения для удаления.
`[comparator] (Function)`: `comparator`  ссылаться на элемент.

**Возвращает**

`(Array)`: Возвращает массив.

### Пример

```javascript

var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 
_.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
console.log(array);
// => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]

```


## .pullAt(array, [indexes])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7825),
[npm package](https://www.npmjs.com/package/lodash.pullat).

Удаляет элементы из `array` соответствующие по индексам и возвращает массив из удаленных элементов.

**Заметка:**

В отличие от [_.at](https://lodash.com/docs/4.17.4#at), этот метод изменяет массив.

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив для изменения.
`[indexes] (...(number|number[]))`: Индексы элементов, которые будут удалять.

**Возвращает**

`(Array)`: Возвращает новый массив из удаленных элементов.

### Пример

```javascript

var array = ['a', 'b', 'c', 'd'];
var pulled = _.pullAt(array, [1, 3]);
 
console.log(array);
// => ['a', 'c']
 
console.log(pulled);
// => ['b', 'd']

```


## .remove(array, [predicate=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7864),
[npm package](https://www.npmjs.com/package/lodash.remove).

Удаляет все элементы из массива ,`predicate` которых возвращает истину и возвращает массив из удаленных элементов. 

`predicate` вызывается с тремя аргументами: (value, index, array).

**Заметка:**

В отличие от [_.at](https://lodash.com/docs/4.17.4#at), этот метод изменяет массив.

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив для изменения.
`[indexes] (...(number|number[]))`: Индексы элементов, которые будут удалены.

**Возвращает**

`(Array)`: Возвращает новый массив из удаленных элементов.

### Пример

```javascript

var array = ['a', 'b', 'c', 'd'];
var pulled = _.pullAt(array, [1, 3]);
 
console.log(array);
// => ['a', 'c']
 
console.log(pulled);
// => ['b', 'd']

```


## .reverse(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7908),
[npm package](https://www.npmjs.com/package/lodash.reverse).

Изменяет массив так, что первый элемент становится последним, второй элемент станет предпоследним и так далее.

**Заметка:**

Этот метод изменяет массив и основан на
[Array#reverse](https://mdn.io/Array/reverse).

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массив для изменения.

**Возвращает**

`(Array)`: Возвращает массив.

### Пример

```javascript

var array = [1, 2, 3];
 
_.reverse(array);
// => [3, 2, 1]
 
console.log(array);
// => [3, 2, 1]

```


## .slice(array, [start=0], [end=array.length])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7928),
[npm package](https://www.npmjs.com/package/lodash.slice).

Создает срез массива от начала до, но не включая конец.

**Заметка:**

Этот метод используется вместо [Array#slice](https://mdn.io/Array/slice), чтобы обеспечить плотность возвращаемому массиву.


**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив для срезки.
`[start=0] (number)`: Стартовая позиция.
`[end=array.length] (number)`: Конечная позиция.

**Возвращает**

`(Array)`: Возвращает срез массива.


## .sortedIndex(array, value)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7961),
[npm package](https://www.npmjs.com/package/lodash.sortedindex).

Использует двоичный поиск, чтобы определить самый низкий показатель, в котором значения должны быть вставлены в массив для того, чтобы сохранить свой порядок сортировки.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Отсортированный массив для проверки.
`value (*)`: Значение для оценки.

**Возвращает**

`(number)`: Возвращает индекс значения, которое должно быть вставлено в массив.

### Пример

```javascript

_.sortedIndex([30, 50], 40);
// => 1

```


## .sortedIndexBy(array, value, [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7990),
[npm package](https://www.npmjs.com/package/lodash.sortedindexby).

В отличие от [_.sortedIndex](https://lodash.com/docs/4.17.4#sortedIndex) за исключением того, что он принимает `iteratee`, который вызывается по значению  для каждого элемента массива для вычисления их корректного ранжирования. 

`iteratee` вызывается с одним аргументом: (value).

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Отсортированный массив для проверки.
`value (*)`: Значение для оценки.
`[iteratee=_.identity] (Function)`: `iteratee` ссылаться на элемент.

**Возвращает**

`(number)`: Возвращает индекс, на какое значение должен быть вставлен в массив.

### Пример

```javascript

var objects = [{ 'x': 4 }, { 'x': 5 }];
 
_.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
// => 0
 
// The `_.property` iteratee shorthand.
_.sortedIndexBy(objects, { 'x': 4 }, 'x');
// => 0

```


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

Элементы принимаются до тех пор, пока `predicate` возвращает лож.

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

Элементы принимаются до тех пор, пока `predicate` возвращает лож.

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

Этот метод подобен [_.union](https://lodash.com/docs/4.17.4#union) за исключением того, что `iteratee` вызывается для каждого элемента каждого массива, чтобы создать критерий, по которому вычисляется уникальность.

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


## .uniqWith(array, [comparator])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8458),
[npm package](https://www.npmjs.com/package/lodash.uniqwith).

Этот метод подобен [_.uniq](https://lodash.com/docs/4.17.4#uniq) за исключением того, что он принимает `comparator`, который вызывается для сравнения элементов массива.

Порядок значений определяется порядком, в котором они встречаются в массиве.

Вызов `comparator ` производится с двумя аргументами: `(arrVal, othVal)`.

**Версия:** *4.0.0*

**Аргументы**

`array (Array)`: Массивы для обработки.
`[comparator] (Function)`: `comparator ` ссылаться на каждый элемент.

**Возвращает**

`(Array)`: Возвращает новый освобожденный дубликат массива.

### Пример

```javascript

var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.uniqWith(objects, _.isEqual);
// => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]

```


## .unzip(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8482),
[npm package](https://www.npmjs.com/package/lodash.unzip).

Этот метод подобен [_.zip](https://lodash.com/docs/4.17.4#zip) за исключением того, что он принимает массив сгруппированных элементов и создает массив перегруппированных элементов из `pre-zip` конфигурации.

**Версия:** *1.2.0*

**Аргументы**

`array (Array)`: Массив сгруппированных в процессе элементов.

**Возвращает**

`(Array)`: Возвращает новый массив перегруппированных элементов.

### Пример

```javascript

var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
// => [['a', 1, true], ['b', 2, false]]
 
_.unzip(zipped);
// => [['a', 'b'], [1, 2], [true, false]]

```


## .unzipWith(array, [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8519),
[npm package](https://www.npmjs.com/package/lodash.unzipwith).

Этот метод подобен [_.unzip](https://lodash.com/docs/4.17.4#unzip) за исключением того, что он принимает `iteratee`, чтобы указать, какие перегруппированные значения должны быть объединены. 

`iteratee` вызывается с элементами каждой группы: (...group).

**Версия:** *3.8.0*

**Аргументы**

`array (Array)`: Массив сгруппированных в процессе элементов.
`[iteratee=_.identity] (Function)`: Функция для объединения перегруппированных значений.

**Возвращает**

`(Array)`: Возвращает новый массив перегруппированных элементов.

### Пример

```javascript

var zipped = _.zip([1, 2], [10, 20], [100, 200]);
// => [[1, 10, 100], [2, 20, 200]]
 
_.unzipWith(zipped, _.add);
// => [3, 30, 300]

```


## .without(array, [values])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8552),
[npm package](https://www.npmjs.com/package/lodash.without).

Создает массив без учета всех заданных значений с помощью [SameValueZero](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) для сравнения на равенство.

**Заметка:** 

В отличие от [_.pull](https://lodash.com/docs/4.17.4#pull), этот метод возвращает новый массив.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив для изменения.
`[values] (...*)`: Значения для исключения.

**Возвращает**

`(Array)`: Возвращает новый массив из отфильтрованных значений.

### Пример

```javascript

_.without([2, 1, 2, 3], 1, 2);
// => [3]

```


## .xor([arrays])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8576),
[npm package](https://www.npmjs.com/package/lodash.xor).

Создает массив из уникальных значений, которые являются [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference) из данных массивов.

Порядок значения результатов определяется тем, в каком порядке они расположены в массивах.

**Версия:** *2.4.0*

**Аргументы**

`[arrays] (...Array)`: Массивы для проверки.

**Возвращает**

`(Array)`: Возвращает новый массив из отфильтрованных значений.

### Пример

```javascript

_.xor([2, 1], [2, 3]);
// => [1, 3]

```


## .xorBy([arrays], [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8603),
[npm package](https://www.npmjs.com/package/lodash.xorby).

Этот метод подобен [_.xor](https://lodash.com/docs/4.17.4#xor), кроме этого он принимает `iteratee`, который вызывается для каждого элемента каждого массива, чтобы создать критерий, по которому они сравниваются.

Порядок значения результатов определяется тем, как они расположены в массивах.

`iteratee` вызывается с одним аргументом: `(value)`.

**Версия:** *4.0.0*

**Аргументы**

`[arrays] (...Array)`: Массивы для проверки.
`[iteratee=_.identity] (Function)`: `iteratee` вызывается для каждого элемента.

**Возвращает**

`(Array)`: Возвращает новый массив из отфильтрованных значений.

### Пример

```javascript

_.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// => [1.2, 3.4]
 
// The `_.property` iteratee shorthand.
_.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
// => [{ 'x': 2 }]

```


## .xorWith([arrays], [comparator])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8632),
[npm package](https://www.npmjs.com/package/lodash.xorwith).

Этот метод подобен [_.xor](https://lodash.com/docs/4.17.4#xor) за исключением того, что он принимает `comparator`, который вызывается для сравнения элементов массивов.

Порядок значения результатов определяется тем, как они расположены в массивах.

`comparator` вызывается с двумя аргументами: `(arrVal, othVal)`.

**Версия:** *4.0.0*

**Аргументы**

`[arrays] (...Array)`: Массивы для проверки.
`[comparator] (Function)`: `comparator` ссылаеться на элемент.

**Возвращает**

`(Array)`: Возвращает новый массив из отфильтрованных значений.

### Пример

```javascript

var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 
_.xorWith(objects, others, _.isEqual);
// => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]

```


## .zip([arrays])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8654),
[npm package](https://www.npmjs.com/package/lodash.zip).

Создает массив из сгруппированных элементов, первый из которых содержит первые элементы данного массива, второй из которых содержит вторые элементы данного массива, и так далее.

**Версия:** *0.1.0*

**Аргументы**

`[arrays] (...Array)`: Массивы для обработки.

**Возвращает**

`(Array)`: Возвращает новый массив сгруппированных элементов.

### Пример

```javascript

_.zip(['a', 'b'], [1, 2], [true, false]);
// => [['a', 1, true], ['b', 2, false]]

```


## .zipObject([props=[]], [values=[]])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8672),
[npm package](https://www.npmjs.com/package/lodash.zipobject).

Этот метод подобен [_.fromPairs](https://lodash.com/docs/4.17.4#fromPairs), кроме этого он принимает два массива, один из идентификаторов свойств и одно из соответствующих значений.

**Версия:** *0.4.0*

**Аргументы**

`[props=[]] (Array)`: Идентификаторы свойств.
`[values=[]] (Array)`: Значения свойств.

**Возвращает**

`(Object)`: Возвращает новый объект.

### Пример

```javascript

_.zipObject(['a', 'b'], [1, 2]);
// => { 'a': 1, 'b': 2 }

```


## .zipObjectDeep([props=[]], [values=[]])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8691),
[npm package](https://www.npmjs.com/package/lodash.zipobjectdeep).

Этот метод подобен [_.zipObject](https://lodash.com/docs/4.17.4#zipObject) кроме того, что он поддерживает свойство `paths`.

**Версия:** *4.1.0*

**Аргументы**

`[props=[]] (Array)`: Идентификаторы свойств.
`[values=[]] (Array)`: Значения свойств.

**Возвращает**

`(Object)`: Возвращает новый объект.

### Пример

```javascript

_.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
// => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }

```


## .zipWith([arrays], [iteratee=_.identity])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L8715),
[npm package](https://www.npmjs.com/package/lodash.zipwith).

Этот метод подобен [_.zip](https://lodash.com/docs/4.17.4#zip) за исключением того, что он принимает `iteratee`, чтобы определить, какие сгруппированные значения должны быть объединены.

`iteratee` вызывается с элементами каждую группу: `(...group)`.

**Версия:** *3.8.0*

**Аргументы**

`[arrays] (...Array)`: Массивы для обработки.
`[iteratee=_.identity] (Function)`: Функция для объединения сгруппированным значениям.


**Возвращает**

`(Array)`: Возвращает новый массив сгруппированных элементов.

### Пример

```javascript

_.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
  return a + b + c;
});
// => [111, 222]

```



[Часть 1](http://vaeum.com/blog/2017/02/18/lodash-russian-documentation-part1-array/)
[Часть 2](http://vaeum.com/blog/2017/02/23/lodash-russian-documentation-part2-array/)
[Часть 3](http://vaeum.com/blog/2017/02/26/lodash-russian-documentation-part3-array/)
[Часть 4](http://vaeum.com/blog/2017/03/16/lodash-russian-documentation-part4-array/)
[Часть 5](http://vaeum.com/blog/2017/03/16/lodash-russian-documentation-part5-array/)
[Часть 6](http://vaeum.com/blog/2017/03/17/lodash-russian-documentation-part6-array/)
