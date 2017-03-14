---
title: >-
  Introduction to Static Table Views, UIimagePickerContorller and
  NSLayoutConstraint(Перевод). Часть вторая.
layout: post
categories: Swift Xcode StaticTableView
tags: Swift Xcode StaticTableView
description: >-
  Работа с Static Table Views, UIimagePickerContorller and NSLayoutConstraint.
  Часть вторая.
published: true
related: ["Static Table Views(Перевод) Часть первая.", "Static Table Views(Перевод) Часть вторая.", "Static Table Views(Перевод) Часть третья."]
---

![Работа  с Static Table Views, UIimagePickerContorller and NSLayoutConstraint.](/images/post/StaticTableView.jpg)

### Добавление связей

Итак, мы создали автономный контроллер представления таблицы,а теперь хотим вызвать контроллер, когда пользователь нажимает на кнопку **"+"**
в правом верхнем углу экрана. Очевидно, что нам нужно создать кнопку с
контроллером **"Новый ресторан"** с помощью **Seque**. В **Interface Builder**
сначала перетащите элемент **Button** из библиотеки объектов в **navigation bar**
проекта. В **Attribute inspector** измените идентификатор на **Add** и вы
увидите значок **+**.

![Static Table Views](https://monosnap.com/file/UGCKnvUNHSpQsrBoxWMRNzKQCLx1p4.png)

> **Примечание:** панель кнопок (UIBarButtonItem) очень похожа на стандартную кнопку (UIButon). Тем не менее, панель кнопок разработана специально для панели навигации и панели инструментов.

Затем, удерживая клавишу управления, перетащите иконку **+** в контроллер
навигации нового ресторана. Отпустите кнопки и выберите **present modally**
для типа **Seque**. Установите идентификатор **addRestaurant** к seque **Attribute inspector**.

![Add Present Modally Seque](https://monosnap.com/file/FPxPz9r3yCmXmLOynkjJXOt4SWW1YQ.png)

> **Совет:** Вы можете щелкнуть правой кнопкой мыши любую пустую область в **Storyboard**, там отобразится zoom, где вы сможете установить свою область увеличения.

Подобно контроллеру модального представления, который сделали ранее, мы должны
предоставить пользователям возможность отклонить контроллер. На панели навигации
контроллера **New Restaurant** добавьте элемент в виде значка в верхний левый
угол. В **Attribute inspector** установите для него идентификатор **Cancel**.
Когда пользователь нажимает на кнопку **Cancel**, модальный вид будет отключен.
Для этого мы создадим функцию отмены. Выберите файл **RestaurantTableViewController.swift** и создайте следующее действие отмены:

```swift
@IBAction func unwindToHomeScreen(segue:UIStoryboardSegue) {
}
```
После добавления этого метода, **Interface Builder** может распознать действие отмены. Теперь вернемся к **Main.storyboard**. Удерживая **control key**, перетащите курсор от кнопки **Cancel** к значку **Exit**. В раскрывающемся меню выберите параметр **unwindToHomeScreenWithSegue:** для подключения функции.
![Подклчение unwindToHomeScreenWithSegue](http://s56.radikal.ru/i154/1703/ff/cae7d8783179.gif)

Теперь давайте запустим проект и посмотрим, как работает выход из модального преставления. После запуска приложения нажмите значок **"+"**. Вы должны увидеть экран **New Restaurant screen**.

![Анимация работы выхода из модального представления](http://s019.radikal.ru/i638/1703/62/6ca7644b9baf.gif)

### Отображение библиотеки фотографий с помощью UIImagePickerController

Когда пользователь кликает на первую ячейку просмотра таблицы, там отображается встроенная библиотека фотографий и позволяет пользователям выбрать фотографию. В
**UIKit framework** предусмотрен удобный API под названием **UIImagePickerController**
для загрузки фотографий из библиотеки. Замечательно то, что один и тот же
API может использоваться для отображения интерфейса камеры и фотографий.

Симулятор не поддерживает функцию камеры. Если вы хотите протестировать
приложение, которое использует встроенную камеру, вам понадобится реальное
устройство IOS.

> **Примечание:** Начиная с Xcode 7, вам больше не нужно регистрироваться в **Apple Developer Program**, прежде чем вы сможете протестировать свое приложение на реальном устройстве.

Чтобы все было просто, мы будем использовать **UIImagePickerController** для
выбора сохраненных изображений. Сначала создайте новый класс с именем
**AddRestaurantController** и установите его как подкласс
**UITableViewController**, который создали ранее. В **storyboard** выберите
контроллер **Add Restaurant** и в графе **custom class** задайте
**AddRestaurantController**.

В файле **AddRestaurantController.swift** удалите следующие сгенерированные методы, поскольку они не нужны для статического табличного представления:

```swift
override func numberOfSections(in tableView: UITableView) -> Int {
    // #warning Incomplete implementation, return the number of sections
return 0 } 

override func tableView(_ tableView: UITableView, numberOfRowsInSection
section: Int) -> Int {
    // #warning Incomplete implementation, return the number of rows
return 0 } 
```

Затем добавьте следующий метод, который вызывается, когда ячейка выбрана и загружается библиотека фотографий: 

```swift
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath:
IndexPath) {
    if indexPath.row == 0 {
        if UIImagePickerController.isSourceTypeAvailable(.photoLibrary) {
            let imagePicker = UIImagePickerController()
            imagePicker.allowsEditing = false
            imagePicker.sourceType = .photoLibrary
            present(imagePicker, animated: true, completion: nil)
        }
} } 
```

Как мы ранее говорили, метод **tableView(_:didSelectRowAt:)** вызывается, когда
ячейка выбирается. В этом случае мы хотим только отобразить библиотеку, когда
выбрана первая ячейка. Таким образом, у нас есть условная проверка в самом начале.
Чтобы загрузить библиотеку фотографий, все, что вам нужно сделать, это создать
экземпляр **UIImagePickerController** и установить его **sourceType** в 
**.photoLibrary**. Затем отобразить метод **present(_:animated:completion:)**
для вызова библиотеки фотографий.

Вот и все. Легко правда? Иногда пользователь может запретить вам доступ к
библиотеке. В качестве хорошей практики всегда следует использовать метод
**isSourceTypeAvailable** класса, чтобы проверить доступен ли определенный
источник **media source**.

Если вы скомпилируйте и запустите приложение, вы увидите ошибку при нажатии
на фотографию:

```
[access] This app has crashed because it attempted to access privacy-sensitive
data without a usage description. The app's Info.plist must contain an
NSPhotoLibraryUsageDescription key with a string value explaining to the user
how the app uses this data.
```

В **IOS 10** или более поздней версии в целях конфиденциальности вы должны
ясно указать причину, по которой ваше приложение обращается к библиотеке
фотографий пользователя. Если вы не сделали этого, то увидите выше приведенную ошибку.

Чтобы исправить это, вам нужно добавить ключ **(NSPhotoLibraryUsageDescription)**
в файл **Info.plist** и указать причину.

Теперь выберите файл **Info.plist** в навигаторе проектов. Щелкните правой кнопкой мыши в любую пустую область в редакторе и выберите **Add Row**. Выберите **Privacy - Photo Library Usage Description** ключ и установите значение:

> You need to grant the app access to your photo library so you can pick your favorite restaurant photo. 

![Add Row Privacy Photo Library Usage Description](https://monosnap.com/file/0bn9DTWKO39DAfocs76fzCc8bSdDG8.png)

Теперь скомпилируйте и запустите приложение. Нажав на ячейку с фотографией, должна вызываться встроенная библиотека фотографий. При появлении запроса, не забудьте нажать **"OK"**, чтобы ваше приложение получило доступ к библиотеке. Если вы хотите добавить свои фотографии, то просто перетащите их из **Finder**
в симулятор. Это автоматически добавит фотографии в приложение.

![Add Row Privacy Photo Library Usag](https://monosnap.com/file/ksvsF2EbBa7ehGF8GicqgNWMI3nch3.png)

![Add Row Privacy Photo Library Usage Description](http://s50.radikal.ru/i128/1703/f1/b4f04b558037.gif)

### Добавление протокола UIImagePickerControllerDelegate

Если вы выберите фотографию из библиотеки,то она не будет отображаться в режиме
просмотра изображений. Как узнать, какую фотографию пользователь выбирает?
Чтобы взаимодействовать с интерфейсом выбора изображений, класс
**AddRestaurantController** должен принять двух делегатов
**UIImagePickerControllerDelegate** и **UINavigationControllerDelegate**.

```swift
class AddTableViewController: UITableViewController,
UIImagePickerControllerDelegate, UINavigationControllerDelegate
```
Когда пользователь выбирает фотографию из библиотеки, вызывается метод делегата
**imagePickerController(_:didFinishPickingMediaWithInfo:)**.

```swift
func imagePickerController(_ picker: UIImagePickerController,
	didFinishPickingMediaWithInfo info: [String : Any]) {
} 
```

Используя этот метод, мы можем получить выбранную фотографию из параметров метода.
Перед внедрением метода давайте объявим **@IBOutlet** переменную для отображения
изображения. Позже мы установим фотографию с выбранным изображением. 

```swift
@IBOutlet weak var photoImageView: UIImageView!
```

Перейдите в **Interface Builder** и соедините изображения ячейки с 
**@IBOutlet weak var photoImageView**

Затем реализуйте метод делегата следующим образом:

```swift
func imagePickerController(_ picker: UIImagePickerController,
didFinishPickingMediaWithInfo info: [String : Any]) {
    if let selectedImage = info[UIImagePickerControllerOriginalImage] as?
UIImage {
        photoImageView.image = selectedImage
        photoImageView.contentMode = .scaleAspectFill
        photoImageView.clipsToBounds = true
} 
    dismiss(animated: true, completion: nil)
}
```

Когда метод вызывается, система передает вам **info dictionary object**, который
содержит выбранное изображение. **UIImagePickerControllerOriginalImage** это
ключ изображения, выбранного пользователем. 

Выше приведенный код отображает в **photoImageView** выбранное пользователем
изображение. Мы также изменяем режим содержимого, чтобы изображение отображалось в 
режиме заполнение ячейки. Наконец, мы вызываем метод **dismiss**, чтобы
закрыть окно выбора изображения.

Не забудьте добавить эту строку кода в метод **tableView(_:didSelectRowAt:)**
сразу после объявления **imagePicker**: 

```swift
imagePicker.delegate = self 
```

Теперь вы можете протестировать приложение. Попробуйте выбрать фотографию из
альбома и она должна отобразиться прямо в ячейке.

![Displaying the Photo Library Using UIImagePickerController](http://s010.radikal.ru/i313/1703/46/3ceee32b856e.gif)

На этом перевод второй части закончен.
[Ссылка на первую часть](http://vaeum.com/blog/2017/03/06/introduction-to-static-table-views-first/)

Перевод главы из книги: [Beginning iOS 10 Programming with Swift 3](https://www.amazon.com/Beginning-iOS-10-Programming-Swift/dp/1520222599/ref=sr_1_1?s=books&ie=UTF8&qid=1487189058&sr=1-1&keywords=Simon+Ng)

Автор книги: Simon Ng


