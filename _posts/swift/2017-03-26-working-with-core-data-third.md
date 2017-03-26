---
title: Working with Core Data (Перевод). Часть третья.
layout: post
categories: Swift Xcode CoreData
tags: Swift Xcode CoreData
description: Работа с Core Data.
related:
  - Working with Core Data(Перевод). Часть третья.
published: true
---

![Работа с Core Data.](/images/post/codedata.jpg)

### Работа с управляемыми объектами

Теперь, когда мы преобразовали наш проект **FoodPin** для использования объектов. Следующий вопрос, как мы можем использовать объекты для сохранения данных?

С внедрением **NSPersistentContainer** в **IOS 10**, сложность, связанная с настройкой стека основных данных, резко сократилась. Обычные операции, такие как вставка записи в базу данных, намного проще, вам нужно в основном справится с несколькими вещами: 

* Создайте объект **RestaurantMo** с контекстом представления постоянного контейнера, а затем установите его свойства.

```swift
restaurant = RestaurantModel(context:
     appDelegate.persistentContainer.viewContext)
     restaurant.name = "Upstate"
     restaurant.type = "Cafe"
     restaurant.location = "New York"
```

* Затем вы вызываете метод **saveContext()** в **AppDelegate** для сохранения в базе данных:

```swift
appDelegate.saveContext() 
```

Вот и все. Как вы можете видеть, **Core Data** защищает вас от базовых логик управления базами данными. Вам не нужно понимать, как вставить запись в базу данных с помощью **SQL**. Все делается с помощью **Core Data API**.

### Сохранение нового ресторана в базе данных

Имея некоторое общее представление об управляемых объектах, давайте обновим класс **AddTableViewController**, чтобы сохранить новый ресторан в базе.

Сначала, добавьте следующий оператор **import** в самом начале **AddTableViewController.swift**, чтобы класс мог использовать инфраструктуру **Core Data**: 

```swift
import CoreData 
```

Объявите переменную ресторана в классе **AddTableViewController**:

```swift
var restaurant:RestaurantMO! 
```

В методе сохранения примените то, что вы только, что узнали, чтобы сохранить объект ресторана в постоянном хранилище. Перед вызовом метода **dismiss** вставьте следующий код:

```swift
if let appDelegate = (UIApplication.shared.delegate as? AppDelegate) {
    restaurant = RestaurantMO(context:
appDelegate.persistentContainer.viewContext)
    restaurant.name = nameTextField.text
    restaurant.type = typeTextField.text
    restaurant.location = locationTextField.text
    restaurant.isVisited = isVisited
    if let restaurantImage = photoImageView.image {
        if let imageData = UIImagePNGRepresentation(restaurantImage) {
            restaurant.image = NSData(data: imageData)
        }
} 
    print("Saving data to context ...")
    appDelegate.saveContext()
} 
```

Выше приведенный код почти такой же, как и в предыдущим разделе Тем не менее, есть несколько строк кода, которые являются новыми для вас. Во-первых, эта часть кода:

```swift
if let appDelegate = (UIApplication.shared.delegate as? AppDelegate) {
```

Переменная **persistentContainer** объявлена в **AppDelegate.swift**. Чтобы получить доступ к переменной, мы должны сначала получить ссылку на **AppDelegate**. В SDK для IOS вы можете использовать **UIApplication.shared.delegate as? AppDelegate** для получения объекта **AppDelegate**. 

Далее, это **image** свойство:

```swift
if let imageData = UIImagePNGRepresentation(restaurantImage) {
    restaurant.image = NSData(data: imageData)
} 
```
Напомню, что тип изображения в **Restaurant Entity** установлен в **Binary Data**, в этом случае свойство изображения сгенерированного объекта **RestaurantMO** имеет тип **NSData**. 

Поэтому, когда мы устанавливаем значение свойства изображения, мы должны извлечь данные выбранного изображения и преобразовать его в объект **NSData**. Структура **UIKit** предоставляет набор встроенных функций для графических операции. Функция **UIImagePNGRepresentation** позволяет нам получать данные заданного изображения в формате **PNG**. Затем мы создаем данные изображения.

Это фрагмент кода, который вам нужно добавить в базу данных для нового ресторана. Если вы запустите приложение и сохраните новый ресторан, приложение должно сохранить запись в базу данных без ошибок. Однако ваше приложение не готово к отображению только что, добавленного ресторана. Это то, что мы собираемся делать дальше.

### Извлечения данных с использованием основных данных

Для извлечения данных с использованием основных данных простейшим способом является создание запроса, а затем использование метода **fetch**, предоставляемым **view context**:

```swift
if let appDelegate = (UIApplication.shared.delegate as? AppDelegate) {
    let request: NSFetchRequest<RestaurantMO> = RestaurantMO.fetchRequest()
    let context = appDelegate.persistentContainer.viewContext
    do {
        restaurants = try context.fetch(request)
    } catch {
        print(error)
    }
} 
```

Созданный класс **RestaurantMO** имеет встроенный метод **fetchRequest()**. Когда вызывается, он возвращает вам объект **NSFetchRequest**, который задает критерии поиска (здесь это **Restaurant entity**).

С запросом мы можем вызывать метод **viewContext** для извлечения данных из постоянного хранилища (здесь это **database**).

Вы можете поместить приведенный выше код в метод **viewWillAppear** для загрузки последних объектов ресторана из базы данных. Однако мы не собираемся использовать удобный метод для извлечения записей. Вместо этого, я введу другой **API** для вызова **NSFetchedResultsController**.

Вы можете удивиться, почему мы не просто используем простой метод, основная причина заключается в производительности. Каждый раз, когда пользователь добавляет новую запись или удаляет из базы, мы загружаем все записи ресторана из базы и повторно отображаем их в табличном виде. Это не эффективный способ управления данными. Лучше сделать это следующим образом: 

* При добавлении новой записи мы добавляем новую строку в **tableView**.
* При удалении записи мы просто удаляем эту строку из **tableView**.

**NSFetchedResultsController** специально разработан для управления результатами, возвращаемыми из запроса и отображению в **tableView**. Он отслеживает изменения в объектах контекста управляемого объекта и сообщает об изменениях.

Давайте посмотрим, как использовать **NSFetchedResultsController** для извлечения ресторанов.

В **RestaurantTableViewController.swift** файле сначала импортируйте фреймоврк **CoreData**:

```swift
import CoreData
```

Затем, укажите протокол **NSFetchedResultsControllerDelegate**:

```swift
class RestaurantTableViewController: UITableViewController,
NSFetchedResultsControllerDelegate
```

Протокол **NSFetchedResultsControllerDelegate** предоставляет методы для уведомления делегата всякий раз, когда происходят изменения в результатах контроллера. Позже мы реализуем методы. Пока объявляем переменную экземпляра для выбранного контроллера результатов:

```swift
var fetchResultController: NSFetchedResultsController<RestaurantMO>! 
```

И добавьте следующий код в метод **viewDidLoad()**:

```swift
// Fetch data from data store
let fetchRequest: NSFetchRequest<RestaurantMO> = RestaurantMO.fetchRequest()
let sortDescriptor = NSSortDescriptor(key: "name", ascending: true)
fetchRequest.sortDescriptors = [sortDescriptor]
if let appDelegate = (UIApplication.shared.delegate as? AppDelegate) {
    let context = appDelegate.persistentContainer.viewContext
    fetchResultController = NSFetchedResultsController(fetchRequest:
fetchRequest, managedObjectContext: context, sectionNameKeyPath: nil,
cacheName: nil)
    fetchResultController.delegate = self
    do {
        try fetchResultController.performFetch()
        if let fetchedObjects = fetchResultController.fetchedObjects {
            restaurants = fetchedObjects
        }
    } catch {
        print(error)
    }
} 
```

Сначала мы получаем объект **NSFetchRequest** от **RestaurantMO** и указываем порядок сортировки, используя объект **NSSortDescriptor**. Он позволяет описать сортировку выбранных объектов. Здесь мы указываем, что объекты **RestaurantMO** должны быть отсортированы в порядке возрастания с использованием ключа **name**.

После создания запроса **fetch** мы инициализируем **fetchResultController** и указываем его делегат для мониторинга изменений данных. Наконец, мы вызываем метод **performFetch()** для выполнения запроса выборки. По завершению мы получаем объекты **RestaurantMO**, обращаясь к свойству **fetchedObjects**.

Если вы сейчас скомпилируйте и запустите приложение, оно должно отображать ранее добавленные вами рестораны. Однако, если вы попытаетесь добавить еще один новый ресторан, таблица не обновится с новой записью.

Осталось еще что-то.

Когда есть какое-либо изменение содержания, следующие методы **NSFetchedResultsControllerDelegate**, будут вызываться:

* **controllerWillChangeContent(_:)** 
* **controller(_:didChange:at:for:newIndexPath:)** 
* **controllerDidChangeContent(_:)**

Вот реализация. Вставьте следующий код в класс **RestaurantTableViewController**:

```swift
func controllerWillChangeContent(_ controller:
NSFetchedResultsController<NSFetchRequestResult>) {
    tableView.beginUpdates()
}
func controller(_ controller: NSFetchedResultsController<NSFetchRequestResult>,
didChange anObject: Any, at indexPath: IndexPath?, for type:
NSFetchedResultsChangeType, newIndexPath: IndexPath?) {
    switch type {
    case .insert:
        if let newIndexPath = newIndexPath {
            tableView.insertRows(at: [newIndexPath], with: .fade)
        }
    case .delete:
        if let indexPath = indexPath {
            tableView.deleteRows(at: [indexPath], with: .fade)
        }
    case .update:
        if let indexPath = indexPath {
            tableView.reloadRows(at: [indexPath], with: .fade)
} default: 
        tableView.reloadData()
    }
    if let fetchedObjects = controller.fetchedObjects {
        restaurants = fetchedObjects as! [RestaurantMO]
} } 
func controllerDidChangeContent(_ controller:
NSFetchedResultsController<NSFetchRequestResult>) {
    tableView.endUpdates()
}
```

Первый метод вызывается, когда **NSFetchedResultsController** собирается начать обработку изменений содержимого. Мы говорим **tableView**: "Эй, мы собираемся обновить таблицу. Приготовься!". Это можно сделать, вызвав **tableView.beginUpdates()**.

Когда в контексте управляемых объектов происходит изменение содержимого (например, сохраняется новый ресторан), второй метод автоматически вызывается. Здесь мы определяем тип операций и соответственно выполняем требуемую операцию. Например, мы вставляем новые строки, когда для типа установлено значение **.Insert**. Поскольку объекты в выбранном контроллере результатов изменены, мы синхронизируем их с массивом **restaurants** в конце метода.

После завершения изменения **NSFetchedResultsController** вызывает метод **controllerDidChangeContent**. Здесь мы должны сообщить, табличному представлению, что мы завершили обновление соответствующим образом.

Вот и все. Теперь запустите приложение и создайте несколько ресторанов. Приложение должно реагировать на изменение мгновенно.

![Работа с Core Data.](/images/post/working-with-core-data/work_add_restaurants.jpg)


### Удаление данных из Core Data

Чтобы удалить запись из постоянного хранилище данных, вам просто нужно вызвать метод с именем **delete**. С удаляемым управлением объектом. Затем вы вызываете метод **saveContext()** для применения изменений. Вот пример фрагмента кода:

```swift
let context = appDelegate.persistentContainer.viewContext
context.delete(objectToDelete)
appDelegate.saveContext()
```

Чтобы удалить выбранный ресторан из базы, вам необходимо обновить переменную **deleteAction** в методе **tableView(_:editActionsForRowAt:_)** следующим образом:

```swift
let deleteAction = UITableViewRowAction(style:
UITableViewRowActionStyle.default, title: "Delete",handler: { (action,
indexPath) -> Void in
    if let appDelegate = (UIApplication.shared.delegate as? AppDelegate) {
        let context = appDelegate.persistentContainer.viewContext
        let restaurantToDelete = self.fetchResultController.object(at:
indexPath)
        context.delete(restaurantToDelete)
        appDelegate.saveContext()
    }
}) 
```

В приведенном коде мы получаем выбранный объект **RestaurantMO** из **fetchResultController**, а затем вызываем метод **delete** для удаления элемента. Наконец, мы вызываем метод **saveContext()** для применения изменений.

Теперь снова скомпилируйте приложения и запустите его. На этом этапе, если вы удаляете запись, она должна полностью удалиться из базы.

### Обновления управляемого объекта

Что делать, если вам нужно обновить рейтинг существующего ресторана? Как мы можем обновить запись в базе данных?

Как и при создании нового ресторана, вы можете обновить запись ресторана в постоянном хранилище путем обновления соответствующего управляемого объекта, а затем вызывать **saveContext()**, чтобы применить изменения.

Например, чтобы сохранить рейтинг ресторана, вы можете обновить метод **close** класса **RestaurantDetailViewController** следующим образом:

```swift
@IBAction func ratingButtonTapped(segue: UIStoryboardSegue) { 
    if let rating = segue.identifier {
        restaurant.isVisited = true
        switch rating {
        case "great": restaurant.rating = "Absolutely love it! Must try."
        case "good": restaurant.rating = "Pretty good."
        case "dislike": restaurant.rating = "I don't like it."
        default: break
        }
} 
    if let appDelegate = (UIApplication.shared.delegate as? AppDelegate) {
        appDelegate.saveContext()
} 
    tableView.reloadData()
}
```

Код точно такой же, как и раньше, за исключением того, что мы добавляем пару строк кода для вызова **appDelegate.saveContext()** для сохранения изменений в базе данных.

### Ваше упражнение 

Я намеренно оставил поле номера телефона для вашей реализации. В настоящее время пользователи не могут вводить номер телефона. Ваше упражнение заключается в добавлении поля **Phone Number field** на экране **New Restaurant screen** и сохранении информации с использованием **CoreData**.

![Работа с Core Data.](/images/post/working-with-core-data/add_telephone_number_in_the_core_data.jpg)

Если не получилось, то можно посмотреть с решением [тут](http://www.appcoda.com/resources/swift3/FoodPinCoreDataFinal.zip).

На этом перевод главы закончен.
[Первая часть.](http://vaeum.com/blog/2017/03/16/working-with-core-data-first/) [Вторая часть.](http://vaeum.com/blog/2017/03/19/working-with-core-data-second/)

Перевод главы из книги: [Beginning iOS 10 Programming with Swift 3](https://www.amazon.com/Beginning-iOS-10-Programming-Swift/dp/1520222599/ref=sr_1_1?s=books&ie=UTF8&qid=1487189058&sr=1-1&keywords=Simon+Ng)

Автор книги: Simon Ng


