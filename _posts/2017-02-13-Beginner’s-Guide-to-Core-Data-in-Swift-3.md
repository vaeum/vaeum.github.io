---
title: Beginner’s Guide to Core Data in Swift 3 (Перевод)
layout: post
categories: Swift Xcode
tags: Swift Xcode
---

![](https://cdn-images-1.medium.com/max/2000/1*LAb-OGYZz970dONldZz7NA.png)

**Это не должно быть так сложно**

Я обещал своим читателями, что следующая статья будет о CoreData. Таким образом, эта статья
написана для тех, кто никогда не использовал Core Data раньше.



**Почему CoreData?**

CoreData — это просто фрейворк, как **UIKit**. Он используется для управления данными/моделями.

**Есть несколько заметных встроенных функций, таких как:** 

1. Отслеживание изменений данных
2. Отмена и повтор данных
3. Фильтрация
4. Сохранение на диске
5. Частичная загрузка в отличие от UserDefaults.

Это правда, что существуют и другие фреймворки, построенные инженерами, не из компании Apple, таких как **[Realm](https://realm.io)**, который действует как **Core Data**. Не надо стестняться использовать другие
фреймворки. Я не буду говорить о преимуществах и недостатках в этой статье. (Я так же многое
из этого не знаю)



**Я думаю вы узнаете**

Это руководство для новичков. Я не собираюсь погружаться глубоко. Тем не менее, вы будете иметь
возможность сохранять, извлекать, удалять данные с диска. Я предполагаю, что вы знаете о
значении **delegate, optionals**, как использовать **UITableView**. Если нет, то вы можете прочитать /
посмотреть мои публикации и вернуться назад.

[Introduction to Delegate in Swift 3](https://medium.com/ios-geek-community/the-meaning-of-delegate-in-swift-347eaa9674d#.adv4k7yvh)

[The Meaning of tableView.delegate = self](https://medium.com/ios-geek-community/the-meaning-of-tableview-delegate-self-1248320cecae#.gy787vdsb)

[Create Default Table in iOS 10](https://www.youtube.com/watch?v=PeBZKH-FORI)



[Error Handling, Optionals, TypeCasting](https://www.youtube.com/playlist?list=PL8btZwalbjYlRZh8Q1VK80Ly0YsZ7PZxx)



**UI**

Каждый стартовый проект начинается с создания пользовательского интерфейса и, конечно же,
приложение **To-Do**. Есть два View контроллера. Первый только состоит из таблиц
**(TableViewController)**, и вы можете добавлять задачи со второго контроллера**(ViewController)**.
После нажатия на кнопку **"Добавить задачу"** на втором **ViewController**, он будет
перемещать назад к первому контроллеру(**ViewController**), и вы увидите созданный пункт
в таблицы.

![UIStoryboard](https://cdn-images-1.medium.com/max/800/1*6AsjsPG0QNUX__Hft3fTSg.png)

![](https://cdn-images-1.medium.com/max/800/1*C5aHtFtemVYQbBJIQxX-vA.gif)

Я не буду говорить о том, как реализовать пользовательский интерфейс в **Main.Storyboard**.
Я отправил исходный код для вас в конце этой статьи, так что не стесняйтесь читать этот урок,
затем поиграйте с ним.



**Давайте начнем!**

При создании проекта, вы должны упомянуть, что вы собираетесь использовать Core Data. 

![](https://cdn-images-1.medium.com/max/800/1*eXDHkA9pZPAGdPwUyOQx4w.png)

После того, как вы это сделаете, вы увидите странное имя файла с расширением **.xcdatamodeled**.
Не волнуйтесь. Это так же, как файл электронной таблицы. Нажмите на него, и вы увидите,
сущности и атрибуты.

![](https://cdn-images-1.medium.com/max/800/1*WiX3WpyTaMl3WpFDVAmFeQ.png)

Я создал сущность с именем **Task**  и добавил новый атрибут **name** с типом **String**. Представьте себе,
группу людей, назовем это сущностью, а атрибуты у людей, это ноги, руки, пальцы, и так далее.
Итак, давайте начнем с сохранения данных на втором **ViewController**, который я называл
**AddTaskViewController**.

Конечно, в целях экономии, мы должны иметь доступ кядру **CoreData**. Есть два страшных слова,
которые вы должны помнить: **NSPersistentContainer** и **NSManagedObjectContext**.
Отношения довольно прямо пропорциональны. **Container** как коробка, которая содержит ядро **CoreData** и **Context** как отверстие в коробке, что позволяет пользователям сохранять /
извлекать данные из коробки.

Кстати, если вы нажмете на AppDelegate.swift, вы увидите похожие методы и свойства основных
данных Предустановленные при первом создании проекта. Таким образом, все, что нам нужно
сделать, это использовать эти свойства и методы. Я знаю, это звучит немного грубо.

Таким образом, приведенный ниже код, нужен, чтобы показать вам, как получить доступ
к **NSManagedObjectContext**, который находится в файле **AppDelegate.swift** и использовать
его встроенную функцию **saveContext** для сохранения данных, когда пользователь пишет,
что-то в текстовом поле, а затем нажимает на кнопку.

Код в файле **AddTaskViewController**: 

```swift
class AddTaskViewController: UIViewController {

 @IBOutlet weak var taskTextField: UITextField!

 override func viewDidLoad() {

 super.viewDidLoad()

}

 @IBAction func buttonTapped(_ sender: UIButton) {

  let context = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext

  let task = Task(context: context) // Link Task & Context

  task.name = taskTextField.text!

 // Save the data to coredata

  (UIApplication.shared.delegate as! AppDelegate).saveContext()

  let _ = navigationController?.popViewController(animated: true)

 }

}

```

Поскольку задача была связана с контекстом, то **saveContext** функция используется, чтобы указать
контекст для хранения его имя. Кстати, это, как **saveContext** выглядит в **AppDelegate.swift**
(не нужно запоминать, но полезно посмотреть)

```swift
func saveContext () {

 let context = persistentContainer.viewContext

 if context.hasChanges {

  do {

  try context.save()

  } catch {

   let nserror = error as NSError

   fatalError("Unresolved error (nserror), (nserror.userInfo)")

 }

}
```

Теперь пришло время, чтобы отобразить имя каждой задачи, которые хранятся на диске запросов.
Перед тем, как заполнить таблицу, посмотрите на верхней части файла **ViewController**.

```swift
class ViewController: UIViewController, UITableViewDataSource, UITableViewDelegate {

 @IBOutlet weak var tableView: UITableView!

 let context = (UIApplication.shared.delegate as! AppDelegate).persistentContainer.viewContext

 var tasks: [Task] = []

 override func viewDidLoad() {

 super.viewDidLoad()

  tableView.delegate = self

  tableView.dataSource = self

 }

 override func viewWillAppear(_ animated: Bool) {

  getData()

  tableView.reloadData()

 }

```

Это верно, как же **GetData()** выглядит? Да, это часть получение данных. Мы собираемся извлечь
массив **Task** и сохранить его в переменной **tasks**.

```swift
func getData() {
 do {
  tasks = try context.fetch(Task.fetchRequest())
} catch {
 print("Fetching Failed")
 }
}
```

Теперь, когда мы закончили получение данных, пришло время, сделать что-то с данными, отображая
их в каждой ячейке.

```swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
 let cell = UITableViewCell()
 let task = tasks[indexPath.row]
 
 if let myName = task.name {
  cell.textLabel?.text = myName
  }
  return cell
}
 func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
 return tasks.count
}? После того, как вы закончили выборку данных, все остальное в значительной степени то же самое. Но, как об удалении?
```

Что-то тут есть? Теперь мы должны удалить через "дыру" с помощью, **NSManagedObjectContext**,
а затем получить запрос и перезагрузить таблицу еще раз.

```swift
func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
 if editingStyle == .delete {
   let task = tasks[indexPath.row]
   context.delete(task)
   (UIApplication.shared.delegate as! AppDelegate).saveContext()
   
   do {
     tasks = try context.fetch(Task.fetchRequest())
   } catch {
     print("Fetching Failed")
   }
 }
  tableView.reloadData()
}
```

Запускаем проект и надблюдаем финальный результат, если выключить приложения и включить
значения будут на месте.

![](https://cdn-images-1.medium.com/max/800/1*C5aHtFtemVYQbBJIQxX-vA.gif)

Финальный проект выложен [тут](https://github.com/bobleesj/Blog_Intro_to_CoreData).

Автор статьи: **Bob Lee**.

Оригинальная статья: [Beginner’s Guide to Core Data in Swift 3](https://medium.com/ios-geek-community/beginners-guide-to-core-data-in-swift-3-85292ef4edd#.s40wltm2c).
