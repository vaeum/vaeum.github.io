---
title: Lodash документация на русском - Массивы часть 2
layout: post
categories: Lodash
tags: Lodash Документация
---

![](https://udemy-images.udemy.com/course/750x422/420218_4a8a_2.jpg)

#“Массивы” Методы - часть 2

***

##_.fill(array, value, [start=0], [end=array.length])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7219),
[npm package](https://www.npmjs.com/package/lodash.fill).

Заполняет елементы массива значениями от начала до, не включая конец.

**Заметки** 

Этот метод видоизменяет массив.

**Версия:** *3.2.0*

**Аргументы**

`array (Array)`: Массив для заполнения.

`value (*)`: Значения которыми будет заполнен массив.

`[start=0] (number)`: Начальная позиция заполнения.

`[end=array.length] (number)`: Позиция окончания заполнения.

**Возвращает**

`(Array)`: Возвращяет массив.

###Пример

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

---

##_.findIndex(array, [predicate=_.identity], [fromIndex=0])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7266),
[npm package](https://www.npmjs.com/package/lodash.findindex).

Этот метод похож на [_.find](https://lodash.com/docs/4.17.4#find) за исключением того что он возвращяет индекс первого элемента.
`predicate` возвращяет истину а не сам элемент.

**Версия:** *1.1.0*

**Аргументы**

`array (Array)`: Массив для обработки.

`[predicate=_.identity] (Function)`: Функция вызываемая на каждой итерации.

`[fromIndex=0] (number)`: Индекс начальной позиции поиска.

**Возвращает**

`(number)`: Возвращает индекс найденного элемента, в остальных случаях возвращяет -1.

###Пример

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

---

##_.findLastIndex(array, [predicate=_.identity], [fromIndex=array.length-1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7313),
[npm package](https://www.npmjs.com/package/lodash.findlastindex).

Этот метод похож на [_.findIndex](https://lodash.com/docs/4.17.4#findIndex) за исключением того, что он перебирает элементы массива справа налево.

**Версия:** *2.0.0*

**Аргументы**

`array (Array)`: Массив для обработки.

`[predicate=_.identity] (Function)`: Функция вызываемая на каждой итерации.

`[fromIndex=array.length-1] (number)`: Индекс начальной позиции поиска.

**Возвращает**

`(number)`: Возвращает индекс найденного элемента, в остальных случаях возвращяет -1.

###Пример

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

---

##_.flatten(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7342),
[npm package](https://www.npmjs.com/package/lodash.flatten).

Сглаживает массив на один уровень вложенности.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив для сглаживания.

**Возвращает**

`(Array)`: Возвращяет новый сглаженный массив.

###Пример

```javascript
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
```

---

##_.flattenDeep(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7361),
[npm package](https://www.npmjs.com/package/lodash.flattendeep).

Рекурсивно сглажывает все уровни вложенности массива.

**Версия:** *3.0.0*

**Аргументы**

`array (Array)`: Массив для сглаживания.

**Возвращает**

`(Array)`: Возвращяет новый сглаженный массив.

###Пример

```javascript
_.flattenDeep([1, [2, [3, [4]], 5]]);
// => [1, 2, 3, 4, 5]
```

---

##_.flattenDepth(array, [depth=1])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7386),
[npm package](https://www.npmjs.com/package/lodash.flattendepth).

Рекурсивно сглажывает уровни вложенности массива до указанной глубины.

**Версия:** *4.4.0*

**Аргументы**

`array (Array)`: Массив для сглаживания.

`[depth=1] (number)`: Указываем на сколько уровней сгладить вложенность массива.

**Возвращает**

`(Array)`: Возвращяет новый сглаженный массив.

###Пример

```javascript
var array = [1, [2, [3, [4]], 5]];
 
_.flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]
 
_.flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
```

---

##_.fromPairs(pairs)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7410),
[npm package](https://www.npmjs.com/package/lodash.frompairs).

Инверсивная версия метода [_.toPairs](https://lodash.com/docs/4.17.4#toPairs);  этот метод возвращает объект, состоящий из пар ключ-значение.

**Версия:** *4.0.0*

**Аргументы**

`pairs (Array)`: Пары ключ-значение.

**Возвращает**

`(Object)`: Возвращает новый объект.

###Пример

```javascript
_.fromPairs([['a', 1], ['b', 2]]);
// => { 'a': 1, 'b': 2 }
```

---

##_.head(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7440),
[npm package](https://www.npmjs.com/package/lodash.head).

Возвращает первый элемент массива.

**Версия:** *0.1.0*

**Псевдонимы:** `_.first`

**Аргументы**

`array (Array)`: Массив запросов.

**Возвращает**

`(*)`: Возвращает первый элемент массива.

###Пример

```javascript
_.head([1, 2, 3]);
// => 1
 
_.head([]);
// => undefined
```

---

##_.indexOf(array, value, [fromIndex=0])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7467),
[npm package](https://www.npmjs.com/package/lodash.indexof).

Возвращает индекс места в массиве, в котором в первые встречается искомое значения используя принцип сравнение на равенство каждого значения. 

Если `fromindex` отрицательный, поиск начинается с конца массива.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив для проверки.

`value (*)`: Значение для поиска.

`[fromIndex=0] (number)`: Индекс начальной позиции поиска.

**Возвращает**

`(number)`: Возвращает индекс найденного элемента, в остальных случаях возвращяет -1.

###Пример

```javascript
_.indexOf([1, 2, 1, 2], 2);
// => 1
 
// Search from the `fromIndex`.
_.indexOf([1, 2, 1, 2], 2, 2);
// => 3
```

---

##_.initial(array)

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7493),
[npm package](https://www.npmjs.com/package/lodash.initial).

Возвращяет все, кроме последнего элемента массива.

**Версия:** *0.1.0*

**Аргументы**

`array (Array)`: Массив запросов.

**Возвращает**

`(Array)`: Возвращает фрагмент массива.

###Пример

```javascript
_.initial([1, 2, 3]);
// => [1, 2]
```

---

##_.intersection([arrays])

[source](https://github.com/lodash/lodash/blob/4.17.4/lodash.js#L7515),
[npm package](https://www.npmjs.com/package/lodash.intersection).

Создает новый массив из значений встречающихся в во всех проверяемых массивах используя сравнение на равенство каждого значения.

Порядок вывода значений определят первый указанный массив.

**Версия:** *0.1.0*

**Аргументы**

`[arrays] (...Array)`: Массив для проверки.

**Возвращает**

`(Array)`: Возвращает новый массив из пересекающихся значений.

###Пример

```javascript
_.intersection([2, 1], [2, 3]);
// => [2]
```

---
