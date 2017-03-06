---
layout: post
title:  "Дневник начинающего разработчика. Урок 2 Рандомный вывод изображений в Imageview."
categories: Swift Xcode
tags: Swift Xcode
description: "Урок 2 Рандомный вывод изображений в Imageview."
---

![lesson 2](http://s017.radikal.ru/i407/1610/35/e37c09f4842e.jpg)

Всем привет!

Логика нашего приложения такая: при нажатии на кнопку рандомно появляются картинки.
А в качестве маленького бонуса, расскажу, как по тапу отображать только одну картинку и покажу
разные типы **Constraints**, которыми воспользуемся. Итак приступим.

Для начала создайте проект **Single View Application**, название проекта **Lesson2**.

![](http://s020.radikal.ru/i719/1610/a3/1af61f9d58db.jpg)

Выбираете из библиотеки объектов **Image View**, **Label**, **2 Button** и переносите его на экран
в **Main.Storyboard**.

![](http://i069.radikal.ru/1610/26/3295cdfcdcc7.jpg)

Пока не задавайте размер,  а просто перенесите  на экран.

![](http://s017.radikal.ru/i420/1610/7e/911e7d732d63.jpg)

Все элементы, которые будем использовать, есть и теперь мы займемся расположением их на эране
**Main.storyboard**. Скачайте картинки, которые я подготовил к проекту
[по ссылке](https://cloud.mail.ru/public/9TjA/gKekxZCTe). После того как
архив скачался и открылся в папке, перейдите в **Xcode** в файл **Assets.xcassets** проекта. Нажмите
на иконку, как показано на скриншоте ниже, и, в появившимся меню, выбираете пункт **Import** и далее
выбираете файлы картинок для проекта.

![](http://s017.radikal.ru/i419/1610/b2/c411ce91b8ce.jpg)

После добавления картинок, вы увидите список с именами этих картинок, тут можно по желанию
редактировать названия картинок, если это необходимо.
![](http://s019.radikal.ru/i604/1610/c6/c1694ba40912.jpg)

Теперь переходим в **Main.storyboard**,  выбираем наш **Image View** и открываем
**Show the Attributes Inspector**.

![](http://s015.radikal.ru/i331/1610/0b/ca182a283e08.jpg)

В блоке с названием **Image View** выбираем пункт **Image** и любую картинку, это нужно, чтобы
узнать какой размер на экране будет занимать картинка. В блоке **View**  в пункте **Content Mode**
выбираем пункт **Aspect Fit**, картинка будет отображаться согласно пропорциям.

![](http://i062.radikal.ru/1610/5a/251b360fe470.jpg)

Теперь выбираем **Image View** (в нем отобразилась наша картинка) и увеличиваем его, пока картинка
не займет весь экран приложения. Теперь расположите по центру оставшився элементы: **Label**,
**2 Button**.

![](http://s017.radikal.ru/i402/1610/79/9d30c4012471.jpg)

Теперь нужно задать **Constraints**, чтобы элементы не слиплись и не пропали из экрана
при эмуляции. Зажмите клавишу **ctrl** и перетащите **Image View** на **View**.
![](http://i042.radikal.ru/1610/af/cd72b17fe236.jpg)

После этого появится меню. С зажатой клавишей **shift**, выбираем пункты, как на картинке, и нажимаем
на **Add Constraints**, который и добавит ограничения **Image View**.

![](http://s019.radikal.ru/i610/1610/39/4c30684dee85.jpg)

**Типы ограничений(Constraints):**

1. Ограничение левого края;
2. Ограничение правого края;
3. Ограничение верхнего края;
4. Ограничение нижнего края;
5. Ограничение по горизонтале;
6. Ограничение по вертикале;
7. Ограничение по ширине;
8. Ограничение по высоте;
9. Ограничение по соотношению.

Теперь выделите элемент **Label**, назовите его **name image**,  расширьте его область для текста
до границы и задайте ему **Constraints**, для
этого нужно кликнуть на иконку под названием **Pin** и выбрать, как показано на скриншоте:

![](http://s018.radikal.ru/i508/1610/4a/771ecf0ae152.jpg)

И нажать на кнопку **Add 4 Constraints**.

С последними элементами поступим по другому. Переименуем кнопки, как показанно на
скриншоте, и расположим их, примерно, на одинаковых расстояниях друг от друга.

![](http://s017.radikal.ru/i402/1610/79/9d30c4012471.jpg)

Выбираем кнопку **Рандомно** и нажимаем на иконку **Align**.

![](http://s017.radikal.ru/i425/1610/fa/d21e23372fb5.jpg)

Ставим галочки в тех местах, где установлены на скриншоте ниже. На экране Main.storyboard
появились оранжевые линии, они говорят о том, что элемент расположен не там, где он должен
быть, но ничего, мы потом это исправим. Если не сделать этого исправления, то при билде,
элементы будут распологаться по середине экрана, куда указывали оранжевые пунктирные линии.

![](http://s019.radikal.ru/i605/1610/b1/d5c64b93bcb6.jpg)

Теперь переходим в **Pin**, эта иконка расположенна рядом с **Align** и указываем: длину, ширину
и отступ сверху, как на на скриншоте.

![](http://s018.radikal.ru/i504/1610/2d/079e39b35f48.jpg)

После этого нажимаем на иконку с названием **Resolve Auto Layout Issues**, она находится рядом
с **Pin**.

![](http://s16.radikal.ru/i191/1610/29/fc9a22a4a6f6.jpg)

В появившимся окне выбираем **Update Constaints**, чтобы изменить положение Constaints, где
середина будет считаться от места положения элемента button.

![](http://s017.radikal.ru/i440/1610/4c/43eaf968d035.jpg)

Существуют и другие способы, как можно добавить ограничения элементам, в данный момент этот
способ не всегда правильный и у него есть свои недостатки, но в рамках данного урока он подойдет.

Теперь проделайте тоже самое с другой кнопкой и приступаем к написанию кода. Для начала
уберите картинку, которую добавляли **Image View**, чтобы при билде на экране была пустота.

Выбираем в проекте **Main.storyboard** и с зажатым **alt** выбираем файл **ViewController.swift**,
чтобы вызвать редактор кода (**Assistant Editors**). Выбираете **ImageView** и с зажатой
клавишей **ctrl** переносите в редактор кода элементы:

![](http://s018.radikal.ru/i501/1610/5a/5af487030384.jpg)

![](http://s020.radikal.ru/i712/1610/e1/b4e42a6e8f99.jpg)

На кнопках меняем тип соединения(Connection) с **Outlet** на **Action**.

![](http://s017.radikal.ru/i444/1610/e0/8b1c94ae4028.jpg)

![](http://s018.radikal.ru/i516/1610/4e/3800664ba76f.jpg)

**Создаем  первый массив, где будут храниться рандомные картинки:**

```swift
var randomImage = ["image_1", "image_2", "image_3", "image_4", "image_5", "image_6", "image_7", "image_8", "image_9", "image_10"]
```

Элементы в массиве - это названия каждой картинки.

**Создаем второй массив, где будет храниться одна картинка:**

```swift
var oneImage = ["2"]
```

**Пишем код в созданном Action randomChangeButton.**

```swift
@IBAction func randomChangeButton(_ sender: UIButton) {
    let random = arc4random_uniform(10)

    switch random {
    case 0:
        imageLabel.image = UIImage(named: randomImage[0])
        nameLabel.text = randomImage[0]
    case 1:
        imageLabel.image = UIImage(named: randomImage[1])
        nameLabel.text = randomImage[1]
    case 2:
        imageLabel.image = UIImage(named: randomImage[2])
        nameLabel.text = randomImage[2]
    case 3:
        imageLabel.image = UIImage(named: randomImage[3])
        nameLabel.text = randomImage[3]
    case 4:
        imageLabel.image = UIImage(named: randomImage[4])
        nameLabel.text = randomImage[4]
    case 5:
        imageLabel.image = UIImage(named: randomImage[5])
        nameLabel.text = randomImage[5]
    case 6:
        imageLabel.image = UIImage(named: randomImage[6])
        nameLabel.text = randomImage[6]
    case 7:
        imageLabel.image = UIImage(named: randomImage[7])
        nameLabel.text = randomImage[7]
    case 8:
        imageLabel.image = UIImage(named: randomImage[8])
        nameLabel.text = randomImage[8]
    case 9:
        imageLabel.image = UIImage(named: randomImage[9])
        nameLabel.text = randomImage[9]
    default:
        print("error randomChangeButton")
    }
}
```

Принцип работы такой. Создаем переменную, которой присваиваем метод arc4random_uniform(),
где в скобках указываем диапазон действия этого метода. Этот метод выдает рандомно числа,
а мы эти числа приравниваем к порядковому номеру в массиве. После чего с помощью конструкции
**switch-case**, мы проверяем и подставляем соответсвующие элементы массива и выводим их
в **Main.storyboard**.

**Разберем по подробней, как мы отобразили данные:**
imageLabel.image = UIImage(named: randomImage[9])

1. imageLabel - это подключенный элемент **ImageView**.
2. imageLabel.image - так мы обращаемся к свойству  этого элемента **ImageView**.
3. UIImage - мы указываем, что приравниваем именно картинкики.
4. UIImage(named: ) - указываем на имя этой картинки.
5. UIImage(named: randomImage[9]) - в качестве имени картинки мы ссылаемся на порядковый номер элемента в массиве randomImage.

nameLabel.text = randomImage[9]

1. nameLabel  - это подключенный элемент **label**.
2. namelabel.text - свойство элемента
3. randomImage[9] - порядковый номен в массиве randomImage.

Пишем код в созданном Action oneImageButton.**

```swift
@IBAction func oneImageButton(_ sender: UIButton) {
    imageLabel.image = UIImage(named: oneImage[0])
    nameLabel.text = ""
}
```

Теперь запускаем наше приложение и результат должен быть примерно таким.

![](http://s011.radikal.ru/i318/1610/c8/5b8e2ab9c804.gif)

Всем спасибо! Увидимся через неделю.


