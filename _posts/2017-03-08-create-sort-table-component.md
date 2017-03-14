---
title: Создаем таблицу с сортировкой строк на React JS
layout: post
categories: Tutorial
tags: ReactJS
description: Инструкция для создания таблицы с сортировкой на ReactJS
published: true
---

Если вы пишите frontend на модных фреймворках (react, angular, vue), и надо
сделать сортировку таблиц, то для этого не нужно использовать какие либо плагины.
Компонент для сортировки таблиц можно сделать самому. В этой статье я покажу, на
примере React JS компонента, один из способов, как можно сделать свой плагин для
вывода таблиц с сортировкой. Существуют несколько видов сортировок, по убыванию
и по возрастанию, мы реализуем оба вида.

### Шаг первый - создаем структуру данных

Начнем с нашей структуры данных, которыми мы будем оперировать. Мы
будем работать с многомерными массивами. Они выглядят так

```javascript
const arr = [
    [123, 345, 567],
    [645, 834, 965],
    [837, 275, 345],
]
```

Как видите это массив массивов. Если у вас другая структура, приведите ее к такому виду.

### Шаг второй - создаем компоненты

Создадим компонент под нашу таблицу. Начнем с

```javascript
import React from 'react';

export default class SortableTable React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}
```

Вызывать этот компонент будем так:

```javascript
import SortableTable from 'path to sortableTable component';

const data = [
  ['Alexander', 345345, 887423],
  ['Paul', 2347, 76323],
  ['Larisa', 745, 54234],
]

<SortableTable data={data}>
```

Наша мини таблица будет примерно такого вида:

| Name      | ID     | Count  |
| --------- | ------ | ------ |
| Alexander | 345345 | 887423 |
| Paul      | 2347   | 76323  |
| Larisa    | 745    | 54234  |

Список того, что нужно сделать:

- в `SortableTable` компоненте нужно получить props и передать их во внутренний state компонента
- создать 2 мини компонента, для отображения шапки таблицы и ее тела
- для шапки таблицы надо создать две стрелки для изменения вида сортировки
- создать функцию при клике на колонку в шапке таблицы, мы запускаем сортировку

#### Прокидываем props во внутренний state компонента

Для этого нам понадобится 2 внутренних метода React JS компонента, `componentWillMount` и `componentWillReceiveProps`.

ComponentWillMount сработает, когда React смонтирует компонент, а
componentWillReceiveProps, когда у компонента изменятся props, например, когда
мы запросим данные от сервера и передадим их сразу в компонент.

Код будет следующим:

```javascript
import React from 'react';

export default class SortableTable extends React.Component {
  static propTypes = {
    data: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      columns: [],
    }
  }

  componentWillMount() {
    const { data } = this.props;
    this.setState({ data })
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.setState({ data })
  }

  render() {
    return (
      <div></div>
    );
  }
}
```

#### Создаем два мини компонента

Разбивка большого компонента на группу маленьких - очень хорошая практика,
потому что их можно переиспользовать в других файлах и проектах.

Для начала вынесем в начало файла, после обьявления React, нашу переменную с
текстом шапки таблицы

```javascript
const TABLE_COLUMNS = [
  {
    label: 'Name',
    sort: 'default',
  },{
    label: 'ID',
    sort: 'default',
  },{
    label: 'Count',
    sort: 'default',
  }
];
```

В поле `label` находится сам текст, а в поле `sort` тип сортировки,
по умолчанию он равен `default`.

Создадим в том же файле два компонента:

```javascript
const SortableHeader = (props) => {
  return(
    <thead>
      <tr>
        {TABLE_COLUMNS.map((element, index) =>
          <th key={index}>{element.label}</th>
        )}
      </tr>
    </thead>
  )
}
```

Для маленьких компонентов удобно использовать Stateless Functional Components,
главное отличие от обычных компонентов, это отсутствие внутреннего state.

В этом коде мы

- возвращаем элементы
- перебираем наш массив с текстом заголовков шапки
- присваиваем встроенному атрибуту key индекс элемента
- выводим текст в элементе `th`

Добавляем компонент для тела нашей таблицы:

```javascript
const SortableBody = ({data}) => {
  return(
    <tbody>
      {data.map((element, index) =>
        <tr key={index}>
          {element.map((item, i) =>
            <td key={i}>{item}</td>
          )}
        </tr>
      )}
    </tbody>
  )
}
```

В этом коде мы

- перебираем массив в переданных props от родительского компонента `SortableTable`
- перебираем вложенные массивы с данными

#### Немного меняем наш локальный state

Для доступа и изменения даных, надо добавить **TABLE_COLUMNS** в **this.state**

```javascript
constructor(props) {
  super(props);

  this.state = {
    data: [],
    column: TABLE_COLUMNS,
  }
}
```

### Шаг третий - добавляем стили для отображения стрелок

Создаем стрелки для показа пользователю, в каком направлении идет сортировка.

Для это нам понадобится подключить модуль `bem-cn`. Я его использую для
генерирования классов для компонентов, вы можете использовать любую другую
библиотеку или использовать логические выражения, но с bem-cn код выглядит
локаничнее.

После обьявления нашей константы, всталяем код:

```javascript
const cn = require('bem-cn')('table');
```

Добавляем в проект файл со стилями, такого содержания:

```scss
.sorting-block{
  position: relative;
  padding-right: 20px !important;
  cursor: pointer;
  user-select: none;

  &.is-sortASC{
    &:before{
      border-bottom-color: #333;
    }
  }

  &.is-sortDESC{
    &:after{
      border-top-color: #333;
    }
  }

  &:before, &:after{
    position: absolute;
    content: '';
    right: 5px;
  }

  &:before{
    top: 50%;
    margin-top: -5px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #eee transparent;
  }

  &:after{
    top: 50%;
    margin-top: 1px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #eee transparent transparent transparent;
  }
}
```

Этот код добавит две стрелочки к названию и они не будут активны, но как только
кликнем, в зависимости от направления сортировки, применится соответствующий
класс, и мы увидим активную стрелочку. Если вид сортировки **asc**, то добавляем
класс **sortASC**, и на оборот, если сортируем по **desc**, добавляем класс **sortDESC**.
По умолчанию у нас не добавляется никакого класса. С динамическим добавлением
или удалением класса хорошо справляется модуль `bem-cn`. Он за нас сделает много работы.

### Шаг четвертый - добавляем обработчик

Перепишем наш render метод в **SortableTable** компоненте

```javascript
render() {
  return (
    <table className={cn}>
      <SortableHeader columns={this.state.columns} />
      <SortableBody data={this.state.data} />
    </table>
  );
}
```

Передадим на вход данные о наших столбцах в column props. А также добавим
обработчик по клику на элемент через props.

```javascript
<SortableHeader columns={this.state.columns} onClick={this.sortTableFunc} />
```

Следующим этапом нам надо подключить модуль `sort-multidimensional-array-func`.
Он экспортирует функцию, которая принимает на вход массив, индекс элемента, 
метод сортировки, **asc** или **desc** в виде строки и возвращает отсортированный
массив, который мы преобразуем в таблицу.

```sh
$ npm i -S sort-multidimensional-array-func
```

Импортируем функцию sortMultidimensionalArrayFunc в наш проект:

```javascript
import sortMultidimensionalArrayFunc from 'sort-multidimensional-array-func';
```

Напишем нашу функцию-обработчик

```javascript
sortTableFunc = (id, sortMethod) => {
  const { data, columns } = this.state;

  let currentSortMethod = 'default';

  switch (sortMethod) {
    case 'default':
      currentSortMethod = 'asc';
      break;
    case 'asc':
      currentSortMethod = 'desc';
      break;
    case 'desc':
      currentSortMethod = 'asc';
      break;
    default:
      currentSortMethod = 'asc';
  }

  const changeColumn = columns.map((e, i) =>
    ({ ...e, sort: i == id ? currentSortMethod : 'default' })
  );

  const sortData = sortMultidimensionalArrayFunc(data, id, currentSortMethod);

  this.setState({
    data: sortData,
    columns: changeColumn,
  });
}
```

А так же перепишем наш `SortableHeader` компонент

```javascript
const SortableHeader = (props) => {
  const { columns, onClick } = props;

  return(
    <thead>
    <tr>
      {columns.map((element, index) =>
        <th
          key={index}
          className={cn('sorting').state({
            sortASC: element.sort == 'asc',
            sortDESC: element.sort == 'desc',
          }).mix('sorting-block text-nowrap')}
          onClick={() => onClick(index, element.sort)}
        >
          {element.label}
        </th>
      )}
    </tr>
    </thead>
  );
}
```

После этого у вас должен получиться такой код:

```javascript
import React from 'react';
import sortMultidimensionalArrayFunc from 'sort-multidimensional-array-func';
const cn = require('bem-cn')('table');

const TABLE_COLUMNS = [
  {
    label: 'Name',
    sort: 'default',
  },
  {
    label: 'ID',
    sort: 'default',
  },
  {
    label: 'Count',
    sort: 'default',
  },
];

const SortableHeader = (props) => {
  const { columns, onClick } = props;

  return(
    <thead>
    <tr>
      {columns.map((element, index) =>
        <th
          key={index}
          className={cn('sorting').state({
            sortASC: element.sort == 'asc',
            sortDESC: element.sort == 'desc',
          }).mix('sorting-block text-nowrap')}
          onClick={() => onClick(index, element.sort)}
        >
          {element.label}
        </th>
      )}
    </tr>
    </thead>
  );
}

const SortableBody = (props) => {
  const { data } = props;

  return(
    <tbody>
      {data.map((element, index) =>
        <tr key={index}>
          {element.map((item, i) =>
            <td key={i}>{item}</td>
          )}
        </tr>
      )}
    </tbody>
  );
}

export default class SortableTable extends React.Component {
  static propTypes = {
    data: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      columns: TABLE_COLUMNS,
    };
  }

  componentWillMount() {
    const { data } = this.props;
    this.setState({ data });
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    this.setState({ data });
  }

  render() {
    return (
      <table className={cn}>
        <SortableHeader columns={this.state.columns} onClick={this.sortTableFunc} />
        <SortableBody data={this.state.data} />
      </table>
    );
  }

  sortTableFunc = (id, sortMethod) => {
    const { data, columns } = this.state;

    let currentSortMethod = 'default';

    switch (sortMethod) {
      case 'default':
        currentSortMethod = 'asc';
        break;
      case 'asc':
        currentSortMethod = 'desc';
        break;
      case 'desc':
        currentSortMethod = 'asc';
        break;
      default:
        currentSortMethod = 'asc';
    }

    const changeColumn = columns.map((e, i) =>
      ({ ...e, sort: i == id ? currentSortMethod : 'default' })
    );

    const sortData = sortMultidimensionalArrayFunc(data, id, currentSortMethod);

    this.setState({
      data: sortData,
      columns: changeColumn,
    });
  }
}
```

Этот компонент довольно много универсальный, его можно переиспользовать и создавать разные таблицы.
