---
title: Search Bar and UISearchController(Перевод).
layout: post
categories: Swift Xcode
tags: Swift Xcode
description: Добавялем Search Bar к TableView
published: true
---

![Search Bar and UISearchController](/images/post/uisearchcontroller/search_bar_and_uisearchcontroller.jpg)

Для большинство приложений, основанных на таблицах, обычно в верхней части экрана есть панель поиска. Как вы можете реализовать панель поиска для поиска данных? В этой главе мы добавили строку поиска данных? В этой главе мы добавили строку поиска в приложении **FoodPin**. С помощью панели поиска мы улучшаем приложение, чтобы пользователи могли осуществлять поиск в доступных ресторанах.

В iOS 8 был введен новый класс под названием **UISearchController**, который изменил **UISearchDisplayController API**, который еще существовал с **IOS 3**. Старый **API** теперь устарел. Если у вас есть опыт работы с **IOS 7** или более ранней версией **SDK**, не забудьте использовать **UISearchController**.

**UISearchController API** упрощает способ создания панели поиска и управления результатами поиска. Вы больше не ограничиваете встроенный поиск в **table view controller**, но можете использовать его в любом **view controller**, таком как **collection view controller**. Более того, он предлагает разработчикам гибкость, чтобы влиять на анимацию панели поиска через пользовательский объект. 
С **UISearchController** добавлением панели поиска в ваше приложение — довольно простая задача. Давайте начнем реализовывать панель поиска по умолчанию и посмотрим, как мы можем фильтровать данные ресторана.

### Использование UISearchController

В общем случае, чтобы добавить панель поиска в табличном приложении, она по существу сводится к следующим строкам кода:

```swift
searchController = UISearchController(searchResultsController: nil)
searchController.searchResultsUpdater = self
tableView.tableHeaderView = searchController.searchBar
```

**Первая строка кода** создает экземпляр **UISearchController**. Если вы передадите значения **nil**, это означает, что результаты поиска будут отображаться в том же представлении, которое вы ищете. При желании вы можете указать другой **view controller** для отображения результата поиска.

Вы можете задаться вопросом, когда вам нужно определить другой контроллер вида. Возьмите приложение **FoodPin** в качестве примера. Если использовать **nil**, результаты поиска будут отображаться в виде таблицы. На скриншоте показан формат результатом поиска.

![Search Bar and UISearchController](/images/post/uisearchcontroller/1.jpg)

Как вы можете видеть, стиль отображения точно такой же, как у **table view**. Если вы хотите отобразить результаты поиска в другом формате, вам нужно будет создать другой **view controller** и указать его во время инициализации **UISearchController**. 

**Вторая строка кода** сообщает контроллеру поиска, какой объект отвечает за обновление результата поиска. Это может быть любой объект в нашем приложении или просто текущий.

**Последняя строка кода** добавляет строку поиска к виду заголовка **table view**.

### Добавления панели поиска

Теперь попробуйте добавить панель поиска в приложение **FoodPin**. Откройте **RestaurantTableViewController.swift** файл и объявите переменную **searchController**:

```swift
var searchController:UISearchController! 
```

Затем добавьте следующие строки кода в **viewDidLoad()** метод:

```swift
searchController = UISearchController(searchResultsController: nil) 
tableView.tableHeaderView = searchController.searchBar
```

Как я уже объяснял код, я не буду повторять его снова. Но, как вы можете видеть, вы можете добавить панель поиска по умолчанию всего двумя строками кода. Если вы сейчас скомпилируйте и запустите приложение, вы должны найти панель поиска под панелью навигации. Однако он пока не работает, потому что мы не реализовали логику поиска.

![Search Bar and UISearchController](/images/post/uisearchcontroller/2.jpg)

### Фильтрация содержимого

Контроллер поиска не предоставляет никаких функций по умолчанию для фильтрации ваших данных. Это ваша обязанность предоставить собственную реализацию для фильтрации содержимого. Для приложения **FoodPin** это позволит пользователям выполнять поиск по названию ресторана. Чтобы реализовать такую функцию поиска, сначала объявите новую переменную в **RestaurantTableViewController** классе для хранения результатов поиска:

```swift
var searchResults:[RestaurantMO] = []
```

Добавьте следующий код для создания нового метода фильтрации содержимого:

```swift
func filterContent(for searchText: String) {
    searchResults = restaurants.filter({ (restaurant) -> Bool in
        if let name = restaurant.name {
            let isMatch = name.localizedCaseInsensitiveContains(searchText)
            return isMatch
} 
        return false
    })
} 
```

В **Swift** имеется встроенный метод для фильтрации существующего массива. Вы используйте фильтр для перебора по коллекции и возвращения нового массива, содержащего те элементы, которые соответствуют заданному условию. Например, новый массив может содержать только рестораны с названием, начинающимся с большой буквы.

Метод фильтр приминает блок кода, в котором вы предоставляете правило фильтрации. Для тех элементов, которые должны быть включены, вы указываете с возвращаемым значением **true**. В противном случае возвращается **false**, и этот элемент будет исключен из поиска.

В приведенном выше коде мы используем **localizedCaseInsensitiveContains** метод, чтобы узнать, содержит ли название ресторана искомый текст, независимо от регистра строки. Если текст поиска найден, метод возвращает **true**, указывая, что название ресторана должно быть включено в новый массив. В противном случае возвращается **false**, чтобы исключить элемент.

### Обновление результатов

Теперь, когда мы реализовали логику поиска, как мы можем обновлять и отображать результаты поиска на экране? Чтобы обновить результат поиска, сначала необходимо добавить в класс новый **UISearchResultsUpdating** протокол:

```swift
class RestaurantTableViewController: UITableViewController, 
NSFetchedResultsControllerDelegate, UISearchResultsUpdating
```

Протокол определяет метод, называемый **updateSearchResults(for:)**. Когда пользователь выбирает строку поиска или ключ в ключевом слове поиска, метод будет вызываться. Реализуя этот метод, мы можем получить поисковому контроллеру отображать результаты поиска. Вставьте следующий код в **RestaurantTableViewController** класс:

```swift
func updateSearchResults(for searchController: UISearchController) {
    if let searchText = searchController.searchBar.text {
        filterContent(for: searchText)
        tableView.reloadData()
    }
} 
```

Код очень прост — мы получаем текст поиска, введенный пользователем, и передаем его **filterContent(for:)** методу. Наконец, перезагрузите данные таблицы. Как упоминалось ранее, мы используем одно и то же **table view** для отображения результатов поиска. Вот почему мы вызываем **tableView.reloadData()** для перезагрузки результатов поиска.

**RestaurantTableViewController** теперь отвечает за отображение полного списка ресторанов и результатов поиска. Вопрос в том, как мы можем выяснить, когда он используется для отображения результата поиска и когда он используется для отображения всех данных ресторана?

Очевидно, приложение должно отображать результаты поиска только тогда, когда активен поисковый контроллер. Контроллер поиска предоставляет удобное свойство для проверки его состояния. Когда пользователь наберет слово в поле поиска, будет создан интерфейс поиска. Свойству **isActive**  присваивается значение **true**.

Мы можем использовать это свойство, чтобы определить, используется ли контроллер представления таблиц для отображения полного списка ресторанов или результатов поиска.

Теперь обновите **tableView(_:numberOfRowsInSection:)** метод следующим образом:

```swift
override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    if searchController.isActive {
        return searchResults.count
    } else {
        return restaurants.count
	}
} 
```

Когда **search controller** активен, мы возвращаем число результатов поиска. В случае, если контроллер поиска неактивен, мы возвращаем счет полного списка ресторанов. 

Код в **tableView(_:cellForRowAt:)** методе так же должен возвращаться с дополнительным условием:

```swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath:
IndexPath) -> UITableViewCell {
    let cellIdentifier = "Cell"
    let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier,
for: indexPath) as! RestaurantTableViewCell
    // Determine if we get the restaurant from search result or the original
array
    let restaurant = (searchController.isActive) ? searchResults[indexPath.row]
: restaurants[indexPath.row]
    // Configure the cell...
    cell.nameLabel.text = restaurant.name
    cell.thumbnailImageView.image = UIImage(data: restaurant.image as! Data)
    cell.locationLabel.text = restaurant.location
    cell.typeLabel.text = restaurant.type
    cell.accessoryType = restaurant.isVisited ? .checkmark : .none

	return cell
} 
```

Опять же, мы проверяем, активен ли поисковый контроллер. Если пользователь выполняет поиск, извлеките ресторан из результата поиска, а не из массива ресторанов. Вот строка кода, которая делает магию.

Напомним, что приложение отображает две кнопки действие **(Share & Delete)**, когда пользователь перебирает ячейку. Вы, вероятно не хотите показывать кнопки в результатах поиска. Вы можете просто реализовать следующий метод и указать, что ячейка не редактируется, когда контроллер поиска активен:

```swift
override func tableView(_ tableView: UITableView, canEditRowAt indexPath:
IndexPath) -> Bool {
    if searchController.isActive {
        return false
    } else {
        return true
} } 
```

Аналогично, обновите следующую строку кода в методе **prepare(for:)**:

```swift
destinationController.restaurant = (searchController.isActive) ? searchResults[indexPath.row] : restaurants[indexPath.row]
```

При прохождении выбранного ресторана в **detail view controller** важно проверить, активен ли поиск и передать правильный ресторан.

Вы почти закончили. Самое последнее — добавить следующие строки кода в **viewDidLoad()** метод:

```swift
searchController.searchResultsUpdater = self
searchController.dimsBackgroundDuringPresentation = false
```

**Первая строка** присваивает текущий класс в качестве обновления результатов поиска. Свойство **dimsBackgroundDuringPresentation** определяет, является ли основное затемнено во время поиска. Поскольку мы представляем результаты поиска в одном представлении, свойство должно быть установлено равным **false**.

Круто! Вы готовы запустить ваше приложение и проверить функцию поиска. Что замечательно, так это то, что вы можете перейти к деталям ресторана, нажав на результаты поиска. Все в исходном **table view controller** и повторно он используется.

![Search Bar and UISearchController](/images/post/uisearchcontroller/3.jpg)

Теперь осталось только задать ему цвет, который используется в приложении **FoodPin**, вставьте следующий код в конце **viewDidLoad()** метода:

```swift
searchController.searchBar.placeholder = "Search restaurants..."
searchController.searchBar.tintColor = UIColor.white
searchController.searchBar.barTintColor = UIColor(red: 218.0/255.0, green:
100.0/255.0, blue: 70.0/255.0, alpha: 1.0)
```

![Search Bar and UISearchController](/images/post/uisearchcontroller/4.jpg)


Для справки можете [загрузить полный Xcode проект](http://www.appcoda.com/resources/swift3/FoodPinSearch.zip).

На этом перевод первой главы закончен.

Перевод главы из книги: [Beginning iOS 10 Programming with Swift 3](https://www.amazon.com/Beginning-iOS-10-Programming-Swift/dp/1520222599/ref=sr_1_1?s=books&ie=UTF8&qid=1487189058&sr=1-1&keywords=Simon+Ng)

Автор книги: Simon Ng


