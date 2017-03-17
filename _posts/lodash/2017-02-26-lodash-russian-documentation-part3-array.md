---
title: Lodash документация на русском (массивы) часть 3
layout: post
categories: Lodash
tags: Lodash Documentation
description: "Вольный перевод документации библиотеки Lodash. В данной статье переведено 10 методов, которые помогают работать с массивами. Рассмотрены следующие методы .intersection .intersectionBy .intersectionWith .join .last .lastIndexOf .nth .pull .pullAll .pullAllBy"
excerpt_text: "Вольный перевод документации библиотеки Lodash. В данной статье переведено 10 методов, которые помогают работать с массивами. Рассмотрены следующие 
методы .intersection .intersectionBy .intersectionWith .join .last .lastIndexOf .nth .pull .pullAll .pullAllBy"
---

![Lodash документация на русском](/images/post/Lo-Dash_array_part3.jpg)

* TOC
{:toc}

# “Массивы” - часть 3

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

[Часть 1](http://vaeum.com/blog/2017/02/18/lodash-russian-documentation-part1-array/)
[Часть 2](http://vaeum.com/blog/2017/02/23/lodash-russian-documentation-part2-array/)

