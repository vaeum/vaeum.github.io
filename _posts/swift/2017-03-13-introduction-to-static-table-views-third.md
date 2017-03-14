---
title: >-
  Introduction to Static Table Views, UIimagePickerContorller and
  NSLayoutConstraint(Перевод) Часть третья.
layout: post
categories: Swift Xcode StaticTableView
tags: Swift Xcode StaticTableView
description: >-
  Работа с Static Table Views, UIimagePickerContorller and NSLayoutConstraint.
  Часть третья.
published: true
related: ["Static Table Views(Перевод) Часть первая.", "Static Table Views(Перевод) Часть вторая.", "Static Table Views(Перевод) Часть третья."]
---

![Работа с Static Table Views, UIimagePickerContorller and NSLayoutConstraint.](/images/post/StaticTableView.jpg)

### Автоматическое определение ограничений компоновки

К сожалению, изображение не было хорошо отображено. Это потому, что некоторые ограничения макета отсутствуют. Давайте сначала вернемся к ограничениям компоновки  изображения. Если вы перейдете в **Main.Storyboard** и взгляните на изображение,то увидите,что мы определили ограничения для центрирования изображения в вертикальном и горизонтальном направлениях.

![Работа с Static Table Views](https://monosnap.com/file/pz8ZQ7TSCEko8E5gmoC4bfWDyZs2fT.png)

Когда приложение загружает выбранное изображение из библиотеки фотографий, оно пытается удовлетворить ограничения и центрировать изображения в ячейке. Но если изображение больше просматриваемой области изображения, оно будет отображаться не полностью.

Чтобы устранить эти проблемы, мы должны добавить несколько ограничений, чтобы изображение было привязано к видимой области. Вместо того, чтобы визуально определить ограничение через **Interface Builder editor**, вы можете добавить ограничения, используя **NSLayoutConstraint**. На этот раз давайте посмотрим, как их создать программно.

![Работа с Static Table Views](https://monosnap.com/file/jMlhEqjpz3oInXYZO4OFaWej9Hyjjo.png)

На скриншоте показано примерное ограничение макета, которое мы создали перед использованием **Interface Builder**. Такое же ограничение может быть записано с использованием **NSLayoutConstraint** следующим образом:

```swift 
let leadingConstraint = NSLayoutConstraint(item: mapView, attribute:
NSLayoutAttribute.leading, relatedBy: NSLayoutRelation.equal, toItem:
mapView.superview, attribute: NSLayoutAttribute.leading, multiplier: 1,
constant: 0)
leadingConstraint.isActive = true
```
Ограничение макета фактически определяет взаимосвязь между двумя объектами пользовательского интерфейса. Если вы сравните свойства ограничения в **Attribute inspector** с теми, которые определены в коде, вы должны понять их взаимосвязь. Параметр **item** соответствует **First item**, **attribute** соответствует элементу после точки в **First item**, **relatedBy** соответсвует **Relation**, **toItem** соответствует **Second item**, **multiplier** соответствует **Multiplier** и **constant** соответствует **Constant**.

По умолчанию ограничения не активируются после создания экземпляра. Вы должны установить для свойства **isActive** в значение **true**, чтобы его активировать.

Теперь вернемся к изображению, мы должны добавить четыре ограничения компоновки для **top**, **bottom**, **leading (i.e. left)**, **trailing (i.e. right)** сторон изображения. Обновите метод делегата с помощью следующего кода:

```swift
func imagePickerController(_ picker: UIImagePickerController,
didFinishPickingMediaWithInfo info: [String : AnyObject]) {
    if let selectedImage = info[UIImagePickerControllerOriginalImage] as?
UIImage {
        photoImageView.image = selectedImage
        photoImageView.contentMode = .scaleAspectFill
        photoImageView.clipsToBounds = true
} 
    let leadingConstraint = NSLayoutConstraint(item: photoImageView, attribute:
NSLayoutAttribute.leading, relatedBy: NSLayoutRelation.equal, toItem:
photoImageView.superview, attribute: NSLayoutAttribute.leading, multiplier: 1,
constant: 0)
    leadingConstraint.isActive = true
    let trailingConstraint = NSLayoutConstraint(item: photoImageView, attribute: NSLayoutAttribute.trailing, relatedBy: NSLayoutRelation.equal,
toItem: photoImageView.superview, attribute: NSLayoutAttribute.trailing,
multiplier: 1, constant: 0)
    trailingConstraint.isActive = true
    let topConstraint = NSLayoutConstraint(item: photoImageView, attribute:
NSLayoutAttribute.top, relatedBy: NSLayoutRelation.equal, toItem:
photoImageView.superview, attribute: NSLayoutAttribute.top, multiplier: 1,
constant: 0)
    topConstraint.isActive = true
    let bottomConstraint = NSLayoutConstraint(item: photoImageView, attribute:
NSLayoutAttribute.bottom, relatedBy: NSLayoutRelation.equal, toItem:
photoImageView.superview, attribute: NSLayoutAttribute.bottom, multiplier: 1,
constant: 0)
    bottomConstraint.isActive = true
    dismiss(animated: true, completion: nil)
} 
```

Здесь мы программно определяем и активируем четыре ограничения макета для представления изображения, чтобы изображение было привязано к ячейке. Теперь давайте снова запустим приложение. Теперь приложение должно иметь возможность правильно отображать выбранное изображение.

![Add NSLayoutConstraint to ImageView](http://s020.radikal.ru/i703/1703/31/b27fe12eff5c.gif)

### Ваше упражнение

До сих пор мы обрабатывали только ячейку изображения входной формы. Ваше упражнение заключается в добавлении кнопки **Save** в верхнем правом углу навигационной панели. Когда пользователь нажимает на кнопку, вы получаете значение текстовых полей, проверяете их и распечатываете в консоли.

![AlertController](https://monosnap.com/file/YluFPcsRipv3wAY8yQCzK3NRdmxCTj.png)

Кроме того, вам нужно сделать выбор кнопок **Yes/No** в поле **Have You Been Here**, цвет фона кнопки **No** будет изменен на красный. И наоборот, цвет фона кнопки **Yes** будет изменен на серый.

![Change buttons color](https://monosnap.com/file/RYuGAWQfm6ECEoHxEkOHE09qBOqlPE.png)

Это упражнение сложнее, чем предыдущее, поэтому я дам вам пять советов. Первый намек заключается в том, что вам нужно объявить следующие переменные в классе 
**AddRestaurant** и связать каждый из них с соответствующим компонентом пользовательского интерфейса:

```swift
@IBOutlet var nameTextField: UITextField!
@IBOutlet var typeTextField: UITextField!
@IBOutlet var locationTextField: UITextField!
@IBOutlet var yesButton: UIButton!
@IBOutlet var noButton: UIButton!
```

Следующий совет: вам нужно обратиться к документации [UITextField](https://developer.apple.com/reference/uikit/uitextfield). Читая документацию, вы узнаете какой атрибут используется для хранения текста текстового поля.

В-третьих, вы должны объявить метод действия сохранения в классе **AddRestaurant**. Когда кнопка **Save** будет нажата, этот метод будет вызван. Поэтому вам придется подключить кнопку с помощью **action method** в **Interface Builder**. В этом методе вы будете писать код для выполнения следующих действий:
* Проверка правильности формы. Проверьте, не заполнен ли текст в тексте. В противном случае используйте **UIAlertController**, чтобы отобразить запрос предупреждения.
* Распечатайте значения формы в консоли. Вот пример:

> Name: Optional("For Kee Restaurant")
> Type: Optional("Hong Kong Style")
> Location: Optional("Hong Kong")
> Have you been here: true

Затем вы можете установить идентификатор для **unwind segue** и выполнить его программно. Это позволяет отключить контроллер представления **Add Restaurant** и вернуться на главный экран.

```swift
performSegue(withIdentifier: "unwindToHomeScreen", sender: self) 
```

В качестве альтернативы, вы можете также вызывать следующий метод для отклонения контроллера:

```swift
dismiss(animated: true, completion: nil)
```

Вам нужно будет создать другой метод действия для переключения цвета кнопок **Yes** и **No**. В качестве последнего намека, вот скелет метода действия:

```swift
@IBAction func toggleBeenHereButton(sender: UIButton) {
    // Yes button clicked
    if sender == yesButton {
    isVisited = true
        // Change the backgroundColor property of yesButton to red
        // Change the backgroundColor property of noButton to gray
    } else if sender == noButton {
        isVisited = false
        // Change the backgroundColor property of yesButton to gray
        // Change the backgroundColor property of noButton to red
} } 
```

Я включил решение для вас. Вы можете найти ссылку для загрузки в конце главы. Тем не менее, я настоятельно вам рекомендую поработать над упражнением. Будет интересно узнать о вашей собственной реализации.

Решение упражнения вы можете скачать по [ссылке](http://www.appcoda.com/resources/swift3/FoodPinStaticTableViewExercise.zip).

На этом перевод главы закончен.
[Ссылка на первую часть.](http://vaeum.com/blog/2017/03/06/introduction-to-static-table-views-first/) [Ссылка на вторую часть.](http://vaeum.com/blog/2017/03/08/introduction-to-static-table-views-second/)

Перевод главы из книги: [Beginning iOS 10 Programming with Swift 3](https://www.amazon.com/Beginning-iOS-10-Programming-Swift/dp/1520222599/ref=sr_1_1?s=books&ie=UTF8&qid=1487189058&sr=1-1&keywords=Simon+Ng)

Автор книги: Simon Ng


