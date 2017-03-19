---
title: Working with Core Data (Перевод). Часть вторая.
layout: post
categories: Swift Xcode CoreData
tags: Swift Xcode CoreData
description: Работа с Core Data.
related:
  - Working with Core Data(Перевод). Часть вторая.
published: true
---

![Работа с Core Data.](/images/post/codedata.jpg)

### Создаем модель данных

Теперь, когда вы подготовили код для доступа к **Core Dara stack**, давайте перейдем к созданию модели данных. В навигаторе проекта щелкните правой кнопкой мыши на папку **FoodPin** и выберете **New files ...**. Выберите раздел **Core Data** и в нем пункт **Data Model**.

![Работа с Core Data.](/images/post/working-with-core-data/data-model.jpg)

Назовите модель **FoodPin** и нажмите создать, чтобы создать модель данных. После создания вы должны найти файл с именем **FoodPin.xcdatamodeld**. Выберете его, чтобы открыть редактор модели данных. Здесь вы можете создавать сущности для вашей модели данных.

![Работа с Core Data.](/images/post/working-with-core-data/open-model-file.jpg)

Так как мы хотим хранить объект **Restaurant** в базе данных, мы создадим сущность **Restaurant** соответствующий нашему классу **Restaurant**. Чтобы создать сущность, нажмите кнопку **Add Entity** в нижней части панели редактора и назовите созданную сущность **Restaurant**.

![Работа с Core Data.](/images/post/working-with-core-data/create-entity-names.jpg)

Чтобы сохранить данные из объекта **Restaurant** в базу данных, мы добавим несколько атрибутов для объекта и укажем их типы. Для создание нового атрибута просто нажмите кнопку **+** в разделе атрибутов. Добавьте шесть атрибутов для объекта **Restaurant** и укажите типы:

* **name**,
* **type**,
* **location**,
* **image**,
* **isVisited**,
* **rating**.

![Работа с Core Data.](/images/post/working-with-core-data/add-attributes-objects.jpg)

Типы атрибутов **name, type, location, isVisited, rating** тривиальны, но почему мы установили тип атрибута у изображения **Binary Data**? 

В настоящее время изображение ресторана включены в приложения и управляются каталогом. Вот почему мы не можем загрузить изображение, передав **UIImage** с именем изображения. Когда пользователь создает новый ресторан, изображение загружается из внешнего источника, независимо от того, из встроенной библиотеки фотографии или извлечено из камеры. В этом случае мы не можем просто сохранить имя файла. Вместо этого мы сохраняем фактические данные изображения в базе. Двоичный тип данных используется для этой цели.

Если вы выберете определенный атрибут, вы можете дополнительно настроить его свойства в **Data Model inspector**. Например, атрибут **name** является обязательным атрибутом. Вы можете снять флажок **Optional**, чтобы его сделать обязательным. Для проекта **FoodPin** вы можете указать **name, type, location** как обязательный. 

### Создание управляемых объектов

Объекты модели, привязанные к структуре **Core Data**, называются управляемыми объектами, которые лежат в основе любого приложения **Core Data**. Теперь, когда вы создали модель управляемых объектов, следущая вещь — создать управляемые объекты. 

Для проекта **FoodPin** вы можете вручную преобразовать класс **Restaurant** в класс управляемых объектов. Однако в **Xcode 8** вы можете позволить инструменту разработчика сделать это за вас. Обращаясь к модели сущностей, **Xcode** может автоматически генерировать класс управляемых объектов для вас. 

> **Примечание:** Возможно, вам интересно узнать, почему мы должны создать класс управляемых объектов. Помните ли вы связь между **Outlet** переменными и объектами пользовательского интерфейса в **Interface Builder**? Обновляя значения, мы можем изменить контент объектов пользовательского интерфейса. Здесь объекты управления очень похожи на **outlet** переменные. Вы можете изменять содержимое объекта, обновляя управляемый объект.

![Работа с Core Data.](/images/post/working-with-core-data/model-object-and-entity.jpg)

Теперь выберете сущность **Restaurant** и перейдите к **Data Model inspector**. Вы должны увидеть выделенный класс. Задайте имя класса **RestaurantMO** и в пункте **Codegen** выберете параметр **Class Definition**. 

![Работа с Core Data.](/images/post/working-with-core-data/add-name-in-class.jpg)

Вот и все. **Xcode** будет генерировать класс для вас, когда вы будете компилировать проект. Вы можете просто запустить приложение или нажать **command-B**, чтобы скомпилировать проект.

Вы не найдете сгенерированный класс в навигаторе проекта. Он хранится где-то в папке проекта. Но теперь вы готовы к использованию его в своем коде.

Так как мы собираемся сохранить объект ресторана в базе данных, теперь мы должны заменить оригинальный класс **Restaurant** новым классом **RestaurantMO**.

Начнем с файла **RestaurantTableViewController.swift**. Нам больше не нужно инициализировать массив ресторанов по умолчанию. Поскольку мы будем извлекать данные из базы данных. Поэтому объявите объект **restaurants** следующим образом:

```swift
var restaurants:[RestaurantMO] = []
```

После внесения изменений вы увидите множества ошибок в **Xcode**. Впервые в **RestaurantTableViewController.swift**, вы больше не используете имя файла для загрузки изображения. 

```swift
cell.thumbnailImageView.image = UIImage(named: 
restaurants[indexPath.row].image)
```

Изображения теперь сохраняется как объект данных. Чтобы загрузить изображения, вместо передачи изображения через именованный параметр, инициализируйте объект **UIImage** с помощью параметра **data**:

```swift
if let imageToShare = UIImage(data: self.restaurants[indexPath.row].image as!
Data) {
```

Кроме того, свойства **RestaurantMO** теперь генерируется как необязательные. Поэтому вам придется заменить стандартную текстовую переменную это строкой кода, чтобы распаковать необязательный параметр:

```swift
let defaultText = "Just checking in at " + self.restaurants[indexPath.row].name!
```

Теперь давайте перейдем к **RestaurantDetailViewController.swift**. 

Во-первых, мы должны изменить тип переменной **restaurant: [Restaurant]** на **restaurant: [RestaurantMO]**:

```swift
var restaurant:RestaurantMO! 
```

Опять же, после изменения кода вы увидите некоторые ошибки. В методе **viewDidLoad()** инициализируйте **restaurant image**, используя **data** вместо имени:

```swift
restaurantImageView.image = UIImage(data: restaurant.image as! Data)
```

Кроме того, при вызове **geocodeAddressString** потребуется изменить **restaurant location**:

```swift
geoCoder.geocodeAddressString(restaurant.location!, completionHandler: {
placemarks, error in
```

Для класса **MapViewController** мы применим аналогичные изменения. Измените тип переменной **restaurant** на **RestaurantMO**:

```swift
var restaurant:RestaurantMO!
```

Затем исправьте все ошибки, связанные с изменением. Вот пример:

```swift
leftIconView.image = UIImage(data: restaurant.image as! Data)
```

Наконец, измените тип переменной **restaurant** в **ReviewViewController.swift**:

```swift
var restaurant:RestaurantMO?
```

В методе **viewDidLoad()**, измените строку кода, которая загружает изображение следующим образом:

```swift
restaurantImageView.image = UIImage(data: restaurant.image as! Data) 
```

> **Краткое примечание:** Я рекомендую исправить ошибки самостоятельно. Но для справки, вы можете загрузить проект [**Xcode**](http://www.appcoda.com/resources/swift3/FoodPinCoreDataTemplate2.zip).


Поскольку данные о ресторанах отсутствуют, ваше приложение должно отображать пустую таблицу при запуске. Затем мы реализуем класс **AddTableViewController** и сохраним новый ресторан в базе данных.

На этом перевод второй части главы закончен.
[Первая часть.](http://vaeum.com/blog/2017/03/16/working-with-core-data-first/)

Перевод главы из книги: [Beginning iOS 10 Programming with Swift 3](https://www.amazon.com/Beginning-iOS-10-Programming-Swift/dp/1520222599/ref=sr_1_1?s=books&ie=UTF8&qid=1487189058&sr=1-1&keywords=Simon+Ng)

Автор книги: Simon Ng
