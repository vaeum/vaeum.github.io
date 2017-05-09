---
title: Swifty Tips ⚡️ (Перевод)
layout: post
categories: Swift Xcode
tags: Swift Xcode
description: Swifty Tips
published: true
---

![Swift Syntax Cheat Codes](/images/post/swifty_tips/1.jpg)

Когда я начал разрабатывать на **IOS**, мне всегда было интересно узнать о передовых методах, используемых гигантскими компаниями. Как выглядит их структура проекта? Какую архитектуру они используют? Какие библиотеки сторонних разработчиков наиболее популярны? Это моё желание опираться на опыт других людей и не тратить время на проблемы, которые уже решены.

Прошло 4 года. Я работал со многими клиентами и имел много умных людей в своей команде, чтобы обсуждать эти методы. Поэтому в этой статье я хочу рассказать о не очень очевидных практиках, которые я использую сейчас для IOS разработки.

Вы также можете их использовать, критиковать или улучшать.

Давайте начнем. 🚀

### 1 - Избегать чрезмерного использования ссылочных типов

Вы должны использовать только ссылочные типы для живых объектов. Что я подразумеваю под «живыми»? Давайте рассмотрим ниже пример:

```swift
struct Car {
  let model: String
}
class CarManager {
  private(set) var cars: [Car]
  func fetchCars()
  func registerCar(_ car: Car)
}
```
Это мертвый код, который предоставляет данные и имеет просто значение. Он ничем не управляет. Так что это не должно жить и, поэтому, его не надо определять как ссылочный тип.

С другой стороны, **CarManager** должен быть активным объектом. Поскольку это объект, который запускает сетевой запрос, **ждёт** для ответа и сохраняет все загруженные машины. Вы не можете выполнить какое-либо асинхронное действие для типа значения, потому что, опять же, он мертв. Сам объект **CarManager**, который живёт в сфере действия, забирает автомобили с сервера и регистрирует новые автомобили, как настоящий менеджер в реальной компании.

Эта тема заслуживает собственного блога, поэтому я не буду углубляться. Но я рекомендую посмотреть [эту ссылку](https://news.realm.io/news/andy-matuschak-controlling-complexity/) автора [Andy Matuschak](https://medium.com/@andymatuschak) или [презентацию на **WWDC**](https://developer.apple.com/videos/play/wwdc2015/414/), чтобы понять, почему это так важно для создания приложений, защищенных от вирусов.

### 2 - Никогда не использовать не явно развернутые свойства

Вы не должны использовать не явно развернутые свойства по умолчанию. Вы даже можете забыть их в большинстве случаев. Но могут быть некоторые особые случаи, когда вам нужно это решение, чтобы порадовать компилятор. И важно понять логику, лежащую в основе этого.

В принципе, если свойство должно быть **nil** во время инициализации, то позже ему будет присвоено значение. Вы можете определить это свойство как не явно развернутое и никогда не получите доступ к нему до того, как код будет установлен. Если не хотите, чтобы компилятор предупреждал вас о том, что он равен **nil**.

Предположим, у нас есть **nameLabel outlet**.

```swift
class SomeView: UIView {
  @IBOutlet let nameLabel: UILabel
}
```

Если вы напишете это так, компилятор попросит вас определить инициатор и присвоить  **none-nil** значение к **nameLabel**. Это совершенно нормально, потому что вы утверждаете, что **SomeView** всегда имеет **nameLabel**. Но вы не можете этого сделать, потому что привязка будет выполняться за кулисами в **initWithCoder**. Вы уверены, он не будет **nil**, так что нет необходимости делать проверку на **nil**. Но в тоже время, вы не можете (или не должны) его заполнять.

В этом случае вы определяете его как не явно развернутое свойство. Это похоже на подписание контракта с компилятором:

>Вы: «Это никогда не будет **nil**, так что перестать предупреждать меня об этом».
>Компилятор: «ОК».

```swift
class SomeView: UIView {
  @IBOutlet var nameLabel: UILabel!
}
```

**Популярный вопрос:**
Должен ли я использовать не явно развертывание при извлечении ячейки из **table view**?

**Не очень популярный ответ:**
Нет. Или по крайне мере выводить сообщение об ошибке:

```swift
guard let cell = tableView.dequeueCell(...) else {
  fatalError("Cannot dequeue cell with identifier \(cellID)")
}
```

![Swift Syntax Cheat Codes](/images/post/swifty_tips/2.gif)

### 3 - Избегайте чрезмерного использования AppDelegate

**AppDelegate** — это не место для хранения в **PersistentStoreCoordinator** ваших глобальных объектов, вспомогательных функций и т.д. Это как любой класс, который реализует протокол. Забудьте об этом.

Я понимаю, что у вас есть важные дела в **applicationDidFinishLaunching**, но слишком легко выйти из-под контроля, когда проект растет. Всегда старайтесь создавать отдельные классы (и файлы) для управления различными видами обязанностей.

👎 Не стоит делать так:

```swift
let persistentStoreCoordinator: NSPersistentStoreCoordinator
func rgb(r: CGFloat, g: CGFloat, b: CGFloat) -> UIColor { ... }
func appDidFinishLaunching... {
  Firebase.setup("3KDSF-234JDF-234D")
  Firebase.logLevel = .verbose
  AnotherSDK.start()
  AnotherSDK.enableSomething()
  AnotherSDK.disableSomething()
  AnotherSDK.anotherConfiguration()
  persistentStoreCoordinator = ...
  return true
}
```

![Swift Syntax Cheat Codes](/images/post/swifty_tips/3.gif)
Разработчик в AppDelegate.swift

👍 Лучше сделать так:

```swift
func appDidFinishLaunching... {
  DependencyManager.configure()
  CoreDataStack.setup()
  return true
}
```

### 4 - Избегайте чрезмерного использования параметров по умолчанию

Вы можете установить значение по умолчанию для параметров в функции. Это очень удобно, потому что иначе вы, в конечном итоге, создадите разные версии той же функции, что и ниже, просто для добавления синтаксиса.

```swift
func print(_ string: String, options: String?) { ... }
func print(_ string: String) {
  print(string, options: nil)
}
```

С параметрами по умолчанию это становится:

```swift
func print(_ string: String, options: String? = nil) { ... }
```

![Swift Syntax Cheat Codes](/images/post/swifty_tips/4.gif)

Легко правда? Очень просто установить цвет по умолчанию для вашего пользовательского интерфейса, чтобы предоставить параметры по умолчанию для вашей функции или назначить тайм-аут по умолчанию для вашего сетевого компонента. Но, вы должны быть осторожны, когда дело доходит до зависимостей.

Давайте рассмотрим следующий пример:

```swift
class TicketsViewModel {
  let service: TicketService
  let database: TicketDatabase
  init(service: TicketService,
       database: TicketDatabase) { ... }
}
```

Использование цели в приложении:

```swift
let model = TicketsViewModel(
  service: LiveTicketService()
  database: LiveTicketDatabase()
)
```

Использование цели в тесте:

```swift
let model = TicketsViewModel(
  service: MockTicketService()
  database: MockTicketDatabase()
)
```

Несколько причин, по которым у вас есть протоколы для сервиса (**TicketService**) и базы данных (**TicketDatabase**), — это абстрагирование от любых конкретных типов. Это позволяет вам внедрять любую реализацию, которая вам нравится в **TicketsViewModel**. Поэтому, если вы введете **LiveTicketService** в качестве параметра по умолчанию в **TicketsViewModel**, это фактически сделает **TicketsViewModel** зависимым от **LiveTicketService**, который является конкретным типом. Это противоречит тому, что мы пытаемся достичь в первую очередь, верно?

**Еще не уверены?**

Изображение, в котором указаны цели приложений и тестов. **TicketsViewModel** обычно добавляется к обеим целям. Затем вы добавили бы реализацию **LiveTicketService** в целевое приложение, а реализацию **MockTicketService** — в тестовую. Если вы создадите зависимость между и **MockTicketService** и **LiveTicketService**, ваш тестовый объект не будет компилироваться, потому что он не должен знать о **LiveTicketService!**

### 5 - Использование переменных параметов

Потому что это круто, супер легко реализовать и мощно.

```swift
func sum(_ numbers: Int...) -> Int {
  return numbers.reduce(0, +)
}
sum(1, 2)       // Returns 3
sum(1, 2, 3)    // Returns 6
sum(1, 2, 3, 4) // Returns 10
```

### 6 - Использование нужных типов

![Swift Syntax Cheat Codes](/images/post/swifty_tips/5.gif)

**Swift** поддерживает внутренние типы, поэтому вы можете(должны) вставлять типы везде, где это имеет смысл.

👎 Не стоит делать так:

```swift
enum PhotoCollectionViewCellStyle {
  case default
  case photoOnly
  case photoAndDescription
}
```
Вы никогда не будете использовать это перечисление вне **PhotoCollectionViewCellStyle**, поэтому нет смысла помещать его в глобальную область видимости.

👍 Лучше сделать так:

```swift
class PhotoCollectionViewCell {
  enum Style {
    case default
    case photoOnly
    case photoAndDescription
  }
  let style: Style = .default
  // Implementation...
}
```

Это имеет больше смысла, потому что **Style** является частью **PhotoCollectionViewCell** и на 23 символа короче, чем **PhotoCollectionViewCellStyle**.

![Swift Syntax Cheat Codes](/images/post/swifty_tips/6.gif)

### 7 - По умолчанию идет финальная версия 🏁

По умолчанию классы должны быть окончательными, поскольку обычно они не предназначены для расширения.

### 8 - Больше имен в ваших константах

Знаете ли вы, что можете правильно называть свои глобальные константы вместо использования уродливых префиксов, таких как **PFX** или **k**?

👎 Не стоит делать так:

```swift
static let kAnimationDuration: TimeInterval = 0.3
static let kLowAlpha = 0.2
static let kAPIKey = "13511-5234-5234-59234"
```

👍 Лучше сделать так:

```swift
enum Constant {
  enum UI {
    static let animationDuration: TimeInterval = 0.3
    static let lowAlpha: CGFloat = 0.2
  }
  enum Analytics {
    static let apiKey = "13511-5234-5234-59234"
  }
}
```

Мое личное предпочтение — использовать только **С** вместо **Constant**, потому что это достаточно очевидно. Вы можете выбрать, как пожелаете.

### 9 - Избегайте не правильного использования

**_** является переменной заполнителем, которая содержит не используемые значения. Это способ сообщить компилятору «я не забочусь о значении», чтобы он не стал жаловаться.

👎 Не стоит делать так:

```swift
if let _ = name {
  print("Name is not nil.")
}
```
Не обязательный элемент, вы можете проверить, пуст ли он. Вам не нужно вынимать все, если вам ничего не нужно.

👍 Лучше сделать так:

**Nil-контроль:**

```swift
if name != nil {
  print("Name is not nil.")
}
```

**Неиспользуемый возврат:**

```swift
_ = manager.removeCar(car) // Returns true if successful.
```

**Блоки завершения:**

```swift
service.fetchItems { data, error, _ in
  // Hey, I don't care about the 3rd parameter to this block.
}
```

### 10 - Избегайте двусмысленных имен методов

Это действительно относится к любому языку программирования, который должен понимать человек. Люди не должны прилагать дополнительные усилия для понимания того, что вы имеете в виду, уже трудно понять язык программирования!

**Например, проверьте этот вызов метода:**

```swift
driver.driving()
```

**Что это на самом деле? Мои догадки были бы:**
1. Он обозначает водителя как движущую силу.
2. Он проверяет, водит ли водитель, и возвращает **true**, если это так.

![Swift Syntax Cheat Codes](/images/post/swifty_tips/7.gif)

Если кому-то нужно увидеть реализацию, чтобы понять, что делает метод. Особенно, если вы работаете в команде, передавая старые проекты, вы будете читать больше, чем пишете код. Так что будьте предельно ясны, когда называете вещи, чтобы люди не страдали, понимая ваш код.

### 11 - Избегайте большого вывода информации в журнале

Прекратите печатать каждую маленькую ошибку или ответ, который вы получите. Шутки в сторону. Это эквивалентно тому, что не печатается вообще. Потому что в какой-то момент вы увидите, что ваше окно журнала скроллится от ненужной информации.

![Swift Syntax Cheat Codes](/images/post/swifty_tips/8.gif)

👍 Лучше сделать так:

1. Используйте [уровень журнала](https://www.tutorialspoint.com/log4j/log4j_logging_levels.htm) ошибок в используемых вами фреймворках.
2. Используйте фреймворки ведения журнала (или реализуйте его самостоятельно), которые позволяют вам устанавливать уровни журналов. Некоторые популярные фреймворки: [**XCGLogger**](https://github.com/DaveWoodCom/XCGLogger), [**SwiftyBeaver**](https://github.com/SwiftyBeaver/SwiftyBeaver)
3. Прекратите использовать журнал в качестве основного источника для отладки. Xcode предоставляет мощные инструменты для этого. Проверьте этот пост в [блоге](https://www.objc.io/issues/19-debugging/debugging-case-study/), чтобы узнать больше.

### 12 - Избегайте отключения неиспользуемого кода

Прекратите комментировать фрагменты кода. Если вам это не нужно, просто удалите его! Так просто. Я никогда не решал проблему путем включения устаревшего кода. Поэтому очищайте свой беспорядок и делайте свой код читаемым.

**Что, если я скажу тебе ...**

![Swift Syntax Cheat Codes](/images/post/swifty_tips/9.png)

... что вы можете достичь большинства из них с помощью автоматизации? См. Статью [**Candost**](https://medium.com/@candost) на [«Использование **SwiftLint** и опасность для стремительных лучших практик»](https://medium.com/developermind/using-swiftlint-and-danger-for-swift-best-practices-48432e4e268a).

**Спасибо за прокрутку полностью!**

Автор оригинала: **Göksel Köksal**
[Ссылка на оригинальную статью](https://medium.com/@gokselkoksal/swifty-tips-%EF%B8%8F-8564553ba3ec)