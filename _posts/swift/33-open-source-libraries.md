---
title: 33 iOS open source libraries that will dominate 2017 (Перевод)
layout: post
categories: IOS Libraries Digests
tags: IOS Libraries Digests
description: 33 iOS open source libraries that will dominate 2017
published: true
---

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/1.jpg)

Привет, разработчики iOS! Меня зовут Paweł, и я независимый разработчик iOS и автор 🚀 Enter Universe.

Почти два года назад я опубликовал [27 iOS-библиотек с открытым исходным кодом, чтобы ускорить разработку.](https://medium.com/app-coder-io/27-ios-open-source-libraries-to-skyrocket-your-development-301b67d3124c#.ec6cbi74j) Это моя лучшая история (относительно реакции средних пользователей) здесь:

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/2.png)

Если 155 тысяч человек обеспокоены настолько, чтобы прорваться сквозь стену текста в Интернете, чтобы найти лучшие iOS-библиотеки с открытым исходным кодом, я доставляю.
Заглядывая в [мой профиль GitHub](https://github.com/ecler), я нашел с этого момента более 180 новых репозиторий, поэтому это отличный повод обновить свой средний контент.

### Поздоровайтесь с 33 pods, которые появились в 2017 году. Началось зажигание.

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/3.jpg)

В нижней части рассказа вы найдете сводный список TL; DR, содержащий все эти библиотеки, ссылки на них и имена CocoaPods (если они доступны). Нет необходимости делать заметки во время чтения. Теперь перейдем к делу.

### 1. [IGListKit](https://github.com/Instagram/IGListKit) by Instagram Engineering

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/4.gif)

IGListKit, созданный разработчиками Instagram, основан на данных UICollectionView для создания быстрых и гибких списков. Кроме того, это поможет вам не заканчиваться контроллерами Massive View в вашем приложении. Ознакомьтесь с учебным пособием [Рэя Вендерлиха](https://www.raywenderlich.com/147162/iglistkit-tutorial-better-uicollectionviews) о реализации этой библиотеки в вашем проекте или [прочитайте эту статью от Родриго Кавальканте](https://medium.com/cocoaacademymag/iglistkit-migrating-an-uitableview-to-iglistkitcollectionview-65a30cf9bac9#.nlslha2yt) о переносе существующего UITableView на IGListCollectionView.

### 2. [Realm](https://github.com/realm/realm-cocoa) by realm.io

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/5.png)

Realm - это мобильная база данных, которая работает непосредственно внутри телефонов, планшетов и носителей, а не только на iOS. Если вы хотите попробовать что-то отличное от Core Data, попробуйте Realm. Многие говорят, что это современная, готовая к производству замена для родного решения Apple.

### 3. [Moya](https://github.com/Moya/Moya) by Ash Furrow

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/6.png)

Мойя - это недостающий сетевой уровень для вашего приложения. Вместо того, чтобы думать, где (и как) вы должны ставить свои сетевые запросы, Мойя справится с этим для вас.

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/7.png)

### 4. [SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON) by Pinglin Tang

Король JSON парсинга в Свифте.

Преобразуйте это:

```swift
if let statusesArray = try? JSONSerialization.jsonObject(with: data, options: .allowFragments) as? [[String: Any]],
    let user = statusesArray[0]["user"] as? [String: Any],
    let username = user["name"] as? String {
    // Finally we got the username
}
```

В это:

```swift
let json = JSON(data: dataFromNetworking)
if let userName = json[0]["user"]["name"].string {
  // Now you got your value
}
```

Опциональная обертка выполняется автоматически.

### 5. [Valet](https://github.com/square/Valet) by Square

Valet позволяет безопасно хранить данные в iOS или OS X Keychain, не зная о том, как работает Keychain. Он поддерживает обмен данными между несколькими приложениями (одного и того же разработчика) на одном устройстве и совместное использование в одном приложении на устройствах с iCloud. Поддержка сенсорного ID? Нет проблем.

### 6. [Firebase Analytics](https://firebase.google.com/docs/analytics/ios/start) by Google Developers

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/8.png)

Сделано (ну, приобретено) Google, вероятно, лучшее бесплатное аналитическое решение для iOS. Отслеживать использование приложений, участие пользователей и события; Установить свойства пользователя; Создавать собственные аудитории; и более.

### 7. [AsyncDisplayKit](https://github.com/facebook/AsyncDisplayKit)

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/9.png)

Facebook построил этот асинхронный UI SDK для своего приложения Paper. Если вы заинтересованы в рендеринге вашего приложения со скоростью 60 кадров в секунду, обязательно посмотрите на эту библиотеку. Здесь вы можете прочитать историю из команды [Buffer](https://overflow.buffer.com/2016/10/04/implementing-asyncdisplaykit-within-buffer-ios/).

### 8. [DZNEmptyDataSet](https://github.com/dzenbot/DZNEmptyDataSet)

Пользователь установил ваше приложение, и он видит пустой UITableView. DZNEmptyDataSet поможет вам избежать этого, предоставив по умолчанию реализацию шаблона [«Пустой набор данных»](http://patternry.com/p=blank-slate/).

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/10.png)

### 9. [Chameleon](https://github.com/ViccAlexander/Chameleon) by Vicc Alexander

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/11.png)

Chameleon - легкий, но мощный цветовой фреймворк для iOS. Он основан на идее, что программные приложения должны работать без усилий, одновременно сохраняя свои прекрасные интерфейсы.

С Chameleon вы можете легко прекратить возиться с значениями RGB, тратить часы на то, чтобы определить правильные цветовые комбинации для использования в вашем приложении, и беспокоиться о том, будет ли ваш текст доступен для чтения на различных цветах фона вашего приложения.

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/12.png)
![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/13.png)


### 10. [PermissionScope](https://github.com/nickoneill/PermissionScope) by Nick O'Neill

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/14.png)

PermissionScope - это платформа Swift для интеллектуального запроса разрешений пользователей. Он содержит не только простой пользовательский интерфейс для запроса разрешений, но и унифицированный API разрешений, который может сообщить вам статус любого заданного системного разрешения или легко запросить их.

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/15.png)

### 11. [FileKit](https://github.com/nvzqz/FileKit) by Nikolai Vazquez

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/16.png)

FileKit - это среда Swift, которая обеспечивает простое и выразительное управление файлами. [Взгляните на примеры использования](https://github.com/nvzqz/FileKit#paths).

### 12. [SwiftyUserDefaults](https://github.com/radex/SwiftyUserDefaults) by Radek Pietruszewski

SwiftyUserDefaults делает пользовательские настройки по умолчанию приятными для использования, комбинируя экспрессивный Swifty API с преимуществами статической типизации. Определите свои ключи в одном месте, легко используйте типы значений и получите дополнительную безопасность и удобные проверки времени компиляции.

### 13. [Kingfisher](https://github.com/onevcat/Kingfisher) by 王巍(Wei Wang)

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/17.png)

Kingfisher - это легкая библиотека pure-swift для асинхронной загрузки и кэширования изображений из Интернета.

### 14. [Hero](https://github.com/lkzhao/Hero) by Luke Zhao

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/18.png)

Hero - это библиотека для построения переходов контроллера iOS. Он предоставляет слой поверх упрощенных API перехода UIKit, делая пользовательские переходы легкой задачей для разработчиков.

### 15. [Hedwig](https://github.com/onevcat/Hedwig) by 王巍(Wei Wang)

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/19.png)

Hedwig - это пакет Swift, который предоставляет набор API высокого уровня, позволяющий легко отправлять электронную почту на SMTP-сервер. Если вы планируете отправлять электронные письма со своего следующего удивительного приложения сервера Swift, Hedwig может быть хорошим выбором.

### 16. [DeviceKit](https://github.com/dennisweissmann/DeviceKit) by Dennis Weissmann

DeviceKit - это замена типа значения для UIDevice. Получите информацию об устройстве и уровне заряда аккумулятора.

### 17. [Charts](https://github.com/danielgindi/Charts)

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/20.png)

Красивая линия, пирог, бар, разброс, пузырь, радар и многое другое, библиотека диаграмм.

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/21.png)

### 18. [MGSwipeTableCell](https://github.com/MortimerGoro/MGSwipeTableCell)

Простой в использовании подкласс UITableViewCell, который позволяет отображать swipeable кнопки с различными переходами.

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/22.png)

### 19. [RandomKit](https://github.com/nvzqz/RandomKit) by Nikolai Vazquez

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/23.png)

Простая и простая генерация случайных данных.

### 20. [ResponseDetective](https://github.com/netguru/ResponseDetective)

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/24.png)

ResponseDetective - это неинтрузивная структура для перехвата любых исходящих запросов и входящих ответов между вашим приложением и вашим сервером для целей отладки.

### 21. [Onboard](https://github.com/mamaral/Onboard)

Легко создавайте красивый и привлекательный интерфейс с несколькими строками кода.

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/25.gif)

### 22. [Quick](https://github.com/Quick/Quick) + [Nimble](https://github.com/Quick/Nimble) by もどかしい

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/26.png)

Quick - это система тестирования Swift и Objective-C BDD, сопровождаемая Nimble, матрицей сопряжений.

### 23. [Natalie](https://github.com/krzyzanowskim/Natalie) by Marcin Krzyzanowski

Natalie генерирует Swift-код, основанный на файлах Storyboards, чтобы облегчить работу с Storiesboards и segues. Сгенерированный файл уменьшает использование строк в качестве идентификаторов для Segues или Storyboards.

### 24. [RxSwift](https://github.com/ReactiveX/RxSwift) by ReactiveExtensions*

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/27.png)

Заинтересованы в реактивном программировании в Swift? Вот RxSwift.

### 25. [GDPerformanceView](https://github.com/dani-gavrilov/GDPerformanceView-Swift) by Daniil Gavrilov

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/28.png)

GDPerformanceView показывает FPS, использование процессора, версии приложений и iOS над строкой состояния и сообщает использование FPS и CPU через делегата.

### 26. [Alamofire](https://github.com/Alamofire/Alamofire)

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/29.png)

Alamofire - это сетевая библиотека HTTP, написанная в Swift.

### 27. [SwiftyStoreKit](https://github.com/bizz84/SwiftyStoreKit) by Andrea Bizzotto

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/30.png)

SwiftyStoreKit является легким дополнением для приложений на iOS 8.0+, tvOS 9.0+ и macOS 10.10+.

### 28. [Timepiece](https://github.com/naoty/Timepiece) by AnyType

Интуитивная обработка данных в Swift.

### 29. [CryptoSwift](https://github.com/krzyzanowskim/CryptoSwift) by Marcin Krzyzanowski

Функции, связанные с криптографией, и helpers для Swift, реализованные в Swift.

### 30. [FSCalendar](https://github.com/WenchaoD/FSCalendar)

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/31.png)

Полностью настраиваемая библиотека календарей iOS, совместимая с Objective-C и Swift.

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/32.jpg)
![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/33.png)

### 31. [ImageViewer](https://github.com/MailOnline/ImageViewer) by Kristian Angyal

Средство просмотра изображений в Twitter.

### 32. [PromiseKit](https://github.com/mxcl/PromiseKit)

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/34.png)

PromiseKit - это продуманная и полная реализация обещаний на любой платформе с swiftc, она имеет превосходные возможности Objective-C и восхитительные специализации для iOS, macOS, tvOS и watchOS.

### 33. [Ensembles](https://github.com/drewmccormack/ensembles) by Drew McCormack

![33 iOS open source libraries that will dominate 2017](/images/post/33-open-source-libraries/35.png)

Ensembles - это платформа Objective-C с поддержкой Swift, которая расширяет базовую структуру ядра Apple, чтобы добавить синхронизацию одноранговых узлов для Mac OS и iOS. Несколько постоянных хранилищ SQLite можно связать вместе с помощью платформы синхронизации файлов, такой как iCloud или Dropbox. Рамку можно легко расширить, чтобы поддерживать любую службу, способную перемещать файлы между устройствами, включая пользовательские серверы.

### TL; DR список библиотек для быстрого доступа:


1. IGListKit [UICollectionView framework] -> 
```pod 'IGListKit', '~> 2.0.0'
```
2. Realm [mobile database] -> 
```pod 'RealmSwift'
```
3. Moya [encapsulated network layer] -> 
```pod 'Moya', '8.0.0'
```
4. SwiftyJSON [JSON parsing] -> 
```pod 'SwiftyJSON'
```
5. Valet [Keychain helper] -> 
```pod 'Valet'
```
6. Firebase Analytics [analytics] -> 
```pod 'Firebase/Core'
```
7. AsyncDisplayKit [asynchronous UI SDK] -> 
```pod 'AsyncDisplayKit'
```
8. DZNEmptyDataSet [empty state pattern] -> 
```pod 'DZNEmptyDataSet'
```
9. Chameleon [flat colors framework] -> 
```pod 'ChameleonFramework/Swift', :git => 'https://github.com/ViccAlexander/Chameleon.git'
```
10. PermissionScope [iOS permissions framework] -> 
```pod 'PermissionScope'
```
11. FileKit [file management] -> 
```pod 'FileKit', '~> 4.0.0'
```
12. SwiftyUserDefaults [user defaults helper] -> 
```pod 'SwiftyUserDefaults'
```
13. Kingfisher [image downloading] -> 
```pod 'Kingfisher', '~> 3.0'
```
14. Hero [custom view controller transitions] -> 
```pod 'Hero'
```
15. Hedwig [email sending]
16. DeviceKit [device info] -> 
```pod 'DeviceKit', '~> 1.0'
```
17. Charts [well… charts] -> 
```pod 'Charts'
```
18. MGSwipeTableCell [swipeable table cells] -> 
```pod 'MGSwipeTableCell'
```
19. RandomKit [random numbers generation] -> 
```pod 'RandomKit', '~> 3.0.0'
```
20. ResponseDetective [debug network requests] -> 
```pod 'ResponseDetective'
```
21. Onboard [user onboarding] -> 
```pod 'Onboard'
```
22. Quick + Nimble [BDD testing] -> 
```pod 'Quick' pod 'Nimble'
```
23. Natalie [code generating from storyboard]
24. RxSwift [reactive programming] -> 
```pod 'RxSwift', '~> 3.0'
```
25. GDPerformanceView [real time FPS and CPU usage] -> 
```pod 'GDPerformanceView-Swift', '~> 1.1.0'
```
26. Alamofire [networking] -> 
```pod 'Alamofire', '~> 4.3'
```
27. SwiftyStoreKit [In App Purchases] -> 
```pod 'SwiftyStoreKit'
```
28. Timepiece [date helper] -> 
```pod 'Timepiece'
```
29. CryptoSwift [cryptography] -> 
```pod 'CryptoSwift'
```
30. FSCalendar [calendar] -> 
```pod 'FSCalendar'
```
31. ImageViewer [Twitter inspired image viewer] -> 
```pod 'ImageViewer'
```
32. PromiseKit [promises] -> 
```pod 'PromiseKit', '~> 4.0'
```
33. Ensembles [Core Data synchronization] -> 
```pod 'Ensembles'
```

Автор оригинала: **Paweł Białecki**.
[Ссылка на оригинальную статью](https://medium.com/app-coder-io/33-ios-open-source-libraries-that-will-dominate-2017-4762cf3ce449)


