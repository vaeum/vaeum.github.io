---
layout: post
title:  "Дневник начинающего разработчика. Урок 2 Рандомный вывод изображений в Imageview."
categories: Swift Xcode
tags: Swift Xcode
---

![lesson 2](http://s020.radikal.ru/i710/1610/65/9dba01e19ffb.jpg)



Все привет!

Логика нашего приложения такая. При нажатии на кнопку рандомно появляются картинки
и вкачестве маленького бонуса расскажу как по тапу отображать только одну картинку. Покажу
разные типы **Constraints**, которыми воспользуемся. И так приступим. 

Для начала создайте проект **Single View Application**, название проекта **Lesson2**.

![](http://s020.radikal.ru/i719/1610/a3/1af61f9d58db.jpg)

Выбреде из библиотеки объектов, **Image View**, **Label**, **2 Button** и перенесите его на экран
в **Main.Storyboard**.

![](http://i069.radikal.ru/1610/26/3295cdfcdcc7.jpg)



Пока не задавайте размер,  а просто перенесите  на экран.

![](http://s017.radikal.ru/i420/1610/7e/911e7d732d63.jpg)



Все элементы, которые будем использовать есть и теперь мы займемся расположением их на эране
**Main.storyboard**. Скачайте картинки, которые я подготовил к проекту [по ссылке](https://cloud.mail.ru/public/9TjA/gKekxZCTe). После того как
архив скачался и открылся в папке, перейдите в **Xcode** в файл **Assets.xcassets** проекта. Нажмите
на иконку как показано на скриншоте ниже и в появившимся меню выберете пункт **Import** и
выберете файлы картинок для проекта.

![](http://s017.radikal.ru/i419/1610/b2/c411ce91b8ce.jpg)



После добавление картинок вы увидете список с менами этих картинок, тут можно по желаниюю
редактировать название картинок, если эту необходимо.
![](http://s019.radikal.ru/i604/1610/c6/c1694ba40912.jpg)





Теперь переходим в **Main.storyboard** и выбираем наш **Image View** и открываем
**Show the Attributes Inspector**.

![](http://s015.radikal.ru/i331/1610/0b/ca182a283e08.jpg)





В блоке название **Image View** выберете пункт **Image** и выберете любую картинку, это нужно, чтобы
узнать какой размер на экране будет занимать картинка. В блоке **View**  в пункте **Content Mode**
выбрете пункт **Aspect Fit**, картинка будет отображаться согласно пропорциям.

![](http://i062.radikal.ru/1610/5a/251b360fe470.jpg)

Теперь выберете **Image View** (в нем отобразилась наша картинка) и увеличивайте его пока картинка
не займет весь экран приложения. Теперь расположите по центру оставшився элементы: **Label**,
**2 Button**.

![](http://s017.radikal.ru/i402/1610/79/9d30c4012471.jpg)



Теперь нужно задать **Constraints**, чтобы элементы не слиплись и не пропали из экрана
при эмуляции. Зажмите клавишу **ctrl** и перетащите **Image View** на **View**.
![](http://i042.radikal.ru/1610/af/cd72b17fe236.jpg)





После этого появится меню. С зажатой клавишей **shift** выберете пункты как на картинки и нажите
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

Теперь выделите элемент **Label** назовите его **name image** и расширьте его область для текста
до границы. И задайте ему **Constraints**, для
этого на нужно кликнуть на икинку под название **Pin** и выбрать как показано на скриншоте:



![](http://s018.radikal.ru/i508/1610/4a/771ecf0ae152.jpg)



И нажать на кнопку **Add 4 Constraints**.

 С последними элементами поступим по другому. Переименнуем кнопки как показанно на
скриншоте. И расположим их, примерно, на одинаковых растояниях друг от друга.

![](http://s017.radikal.ru/i402/1610/79/9d30c4012471.jpg)



Выбираем кнопку **Рандомно** и нажимаем на иконку **Align**.

![](http://s017.radikal.ru/i425/1610/fa/d21e23372fb5.jpg)



Ставим галочки в тех места где установленный на скриншоте ниже. На экране Main.storyboard появились оранжевые линии, они говорят, о том, что элемент расположен не там где он должен быть, но ничего мы потом это исправим. Если не исправить это то при билде, элементы будут распологаться по середине экрана, куда указывали оранжевые пунктирные линии.

![](http://s019.radikal.ru/i605/1610/b1/d5c64b93bcb6.jpg)



Пеперь переходим в **Pin** эта иконка расположенна рядом с **Align** и указываем: долину, ширину
и отступ сверху как на на скриншоте.

![](http://s018.radikal.ru/i504/1610/2d/079e39b35f48.jpg)

После этого нажимаем на иконку по названием **Resolve Auto Layout Issues**, она находится рядом
с **Pin**.

![](http://s16.radikal.ru/i191/1610/29/fc9a22a4a6f6.jpg)



В появившимся окне выбираем **Update Constaints**, чтобы изменить положение Constaints, где середина будет считаться от место положения элемента button. 

![](http://s017.radikal.ru/i440/1610/4c/43eaf968d035.jpg)



Существуют и другие способы как можно добавить ограничения элементам, в данным момент этот
способ не всегда правильный и у него есть свои недостатки, но в рамках данного урока он подойдет.



Теперье проделайте тоже самое с другой кнопкой и будем приступим к написанию кода. Для начала
уберите картинку, которую добавляли **Image View**, чтобы при билде на экране было пустота.

Выберете в проекте **Main.storyboard** и с зажатым **alt** выберет файл **ViewController.swift**,
чтобы вызвать редактор кода (**Assistant Editors**). Выбираете **ImageView** и с зажатой клавишей **ctrl** переносите в редактор кода элементы:

![](http://s018.radikal.ru/i501/1610/5a/5af487030384.jpg)

 

![](http://s020.radikal.ru/i712/1610/e1/b4e42a6e8f99.jpg)



На кнопках меняем тип соединения(Connection) с **Outlet** на **Action**.

![](http://s017.radikal.ru/i444/1610/e0/8b1c94ae4028.jpg)



![](http://s018.radikal.ru/i516/1610/4e/3800664ba76f.jpg)



**Создаем  первый массив, где будут храниться рандомные картинки:**

```swift
var randomImage = ["image_1", "image_2", "image_3", "image_4", "image_5", "image_6", "image_7", "image_8", "image_9", "image_10"]
```

Элементы в массиве это навание каждой картинке.

**Создаем второй массив, где будет хранится одна картинка:**

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

Принцип работы такой. Содаем переменную, которой присваиваем метод arc4random_uniform(),
где в скобках указывает диапазон действия этого метода. Этот метод выдает рандомно числа,
а мы эти числа приравниваем к порядков номеру в массиве. После чего с помощью конструкции
**switch-case**, мы роверяем и подставляем соответсвующие элементы массива и выводим их
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