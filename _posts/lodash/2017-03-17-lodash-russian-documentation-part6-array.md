---
title: Lodash документация на русском (массивы) часть 6
layout: post
categories: Lodash
tags: Lodash Documentation
description: >-
  Перевод документации библиотеки Lodash. Это шестая часть посвященная переводу
  методов работы с Массивами в которой представлено 10 методов, которые помогут
  вам в работе с массивами.
excerpt_text: >-
  Перевод документации библиотеки Lodash. Это шестая часть посвященная переводу
  методов работы с Массивами в которой представлено 10 методов, которые помогут
  вам в работе с массивами. Рассмотрены следующие  методы .unionWith .uniq
  .uniqBy .uniqWith .unzip .unzipWith .without .xor .xorBy .xorWith .zip
  .zipObject .zipObjectDeep .zipWith
published: true
---

![Lodash документация на русском](/images/post/Lo-Dash_array_part6.jpg)

* TOC
{:toc}

# “Массивы” - часть 6

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

Этот метод подобен [_.xor](https://lodash.com/docs/4.17.4#xor) кроме того, что он принимает `iteratee`, который вызывается для каждого элемента каждого массива, чтобы создать критерий, по которому они сравниваются.

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

Этот метод подобен [_.fromPairs](https://lodash.com/docs/4.17.4#fromPairs) кроме того, что он принимает два массива, один из идентификаторов свойств и одно из соответствующих значений.

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
[Все методы Массивов](http://vaeum.com/blog/2017/03/18/lodash-russian-documentation-array/)
