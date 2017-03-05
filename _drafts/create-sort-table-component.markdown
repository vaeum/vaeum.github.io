---
title: Сортируем данные в таблице c помощью JS
layout: post
---

Если вы пишите frontend на модных фреймворках (react, angular, vue), и надо
сделать сортировку таблиц, то для этого не нужно использовать какие либо плагины.
Компонент для сортировки таблиц можно сделать самому. В этой статье я покажу, на
примере React JS компонента, один из способов как можно сделать свой плагин для
вывода таблиц с сортировкой. Существуют несколько видов сортировок, по убыванию и по возрастанию, мы реализуем оба вида.

### Шаг первый

Начнем с нашей структуры данных которыми мы будем оперировать, мы
будем работать с многомерными массивами. Они выглядят так

```javascript
const arr = [
    [123, 345, 567],
    [645, 834, 965],
    [837, 275, 345],
]
```

Как видите это массив массивов. Если у вас другая структура приведите ее к такому виду.

### Шаг второй

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

Вызвать этот компонент будем так:

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

- в `SortableTable` компоненте нужно получать props и передать их во внутренний state компонента
- создать 2 мини компонента для отобращения шапки таблицы и ее тела
- для шапки таблицы, надо создать две стрелки для изменения вида сортировки
- создать функцию при клике на колонку в шапке таблицы, мы запускаем сортировку

#### Прокидываем props во внутренний state компонента

Для этого нам понадобиться 2 вннутренних метода React JS компонента, `componentWillMount` и `componentWillReceiveProps`.

ComponentWillMount сработает когда React смотирует компонент, а componentWillReceiveProps когда у компонента изменяться props, например когда мы запросим данные от сервера и передадим их сразу в компонент.

Код будет следующим:

```javascript
import React from 'react';

export default class SortableTable React.Component {
  static propTypes = {
    data: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
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

Разбиение большого компонента на группу маленьких, очень хорошая практика, Потому что их можно переиспользовать в других файлах и проектах. 

Для начала вынесем в начало файла, после обьявления React, нашу переменную с текстом шапки таблицы

```javascript
const TABLE_COLUMNS = ['Name', 'ID', 'Count'];
```

Создадим в том же файле два компонента:

```javascript
const SortableHeader = (props) => {
  return(
    <thead>
      <tr>
        {TABLE_COLUMNS.map((element, index) =>
          <th key={index}>{element}</th>
        )}
      </tr>
    </thead>
  )
}
```

Для маленьких компонентов удобно использовать Stateless Functional Components, главное отличие от обычных компонентов, это отсутствие внутреннего state.

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

Наш файл выглядет так:

```javascript
import React from 'react';

const TABLE_COLUMNS = ['Name', 'ID', 'Count'];

const SortableHeader = (props) => {
  return(
    <thead>
      <tr>
        {TABLE_COLUMNS.map((element, index) =>
          <th key={index}>{element}</th>
        )}
      </tr>
    </thead>
  )
}

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

export default class SortableTable React.Component {
  static propTypes = {
    data: React.PropTypes.aray,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
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

### Шаг третий

Создаем стрелки для показа пользователя в каком направлении идет сортировка.

Для это нам понадобиться подключить модуль `bem-cn`. Я его использую для генерирования классов для компонентов, вы можете использовать любую жругую библиотеку или использовать логические выражения, но с bem-cn код выглядит локаничнее.

После обьявления нашей константы всталяем код:

```javascript
const cn = require('bem-cn')('table');
```

Перепишем наш render метод в SortableTable компоненте

```javascript
render() {
  return (
    <table className={cn}>
      <SortableHeader />
      <SortableBody data={this.state.data} />
    </table>
  );
}
```

