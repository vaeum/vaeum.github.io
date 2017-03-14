---
title: >-
  Introduction to Static Table Views, UIimagePickerContorller and
  NSLayoutConstraint(Перевод) Часть первая.
layout: post
categories: Swift Xcode StaticTableView
tags: Swift Xcode StaticTableView
description: >-
  Работа с Static Table Views, UIimagePickerContorller and NSLayoutConstraint.
  Часть первая.
published: true
related: ["Static Table Views(Перевод) Часть первая.", "Static Table Views(Перевод) Часть вторая.", "Static Table Views(Перевод) Часть третья."]
---

![Работа  с Static Table Views, UIimagePickerContorller and NSLayoutConstraint.](/images/post/StaticTableView.jpg)

[Ссылка на исходный проект.](https://github.com/allakin/FoodPin-3)

До сих пор приложение **FoodPin** способно отображать только содержимое.
Нам нужно найти способ, чтобы добавить новый ресторан. В этой главе мы
создадим новый экран, который отображает форму ввода для сбора информации
о ресторане. В этой форме пользователь сможет сам выбрать ресторан и
загрузить из своей фото галлереи. Вы узнаете несколько вещей:

1. Как создавать форму, используя статический вид таблицы;
2. Как использовать **UIimagePickerController**, чтобы выбрать фотографию из своей галлереи;
3. Как определить программно автоматическое ограничение изображения с использованием **NSLayoutConstraint**.

В первых главах книги мы прошли основы представления таблиц. Таблицы, которые я
показывал, динамичны по своей природе. Обычно вы создаете ячейку и заполняете её
динамичным содержимым. Тем не менее, вид таблицы не ограничивается динамическим
контентом. Иногда вы можете просто использовать таблицу для представления формы
или экрана настройки. В этом случае статическая таблица то, что вам нужно.
Статический вид таблиц идеален для ситуаций, когда существует заранее
определенное количество элементов данных, которые будут отображаться.

**Xcode** позволяет разработчикам создавать статические таблицы с минимальным
кодом. Чтобы проиллюстрировать, как легко можно использовать **StoryBoard** и
реализовать статический вид таблицы, мы будем добавлять новый экран для
добавления в таблицу нового ресторана. Давайте начнем!

### Добавление нового Table View Controller

Перейдите к **Main.Storyboard** и перетащите контроллер представления таблицы
из библиотеки объектов в **StoryBoard**. В **Attribute inspector** измените
**Content** представления таблицы с **Dynamic Prototypes** на **Static Cells**.
После изменения вы получите таблицу с тремя пустыми статическими
ячейками.

![Static Table Cell](https://monosnap.com/file/hd6xzpNAMPYNfGIX0lKtvhu8eg1Hws.png)

Для нашей формы ввода нам нужно в общей сложности 5 ячеек в таблице:
1. **Cell#1** — для отображения ресторана;
2. **Cell#2** — текстовое поле с названием **Name Label**
2. **Cell#3** — текстовое поле с названием **Type Label**
3. **Cell#4** — текстовое поле с названием **Location Label**
4. **Cell#5** — заголовок **Have You Been Here label** и две кнопки **"Да"**, **"Нет"**

Вы можете легко увеличить количество ячеек путем выбора **Table View Section**
в созданном контролере и переходе в **Attribute inspector**, в пункте **Rows**
вы сможете поменять количество ячеек с 3 до 5.

![Static Table Cell](https://monosnap.com/file/54bwfMeqwIkoyZDZ1yOw0vKcDvmmO3.png)

Теперь мы можем определить каждую ячейку в таблице. [Во-первых скачайте пакет иконок](http://www.appcoda.com/resources/swift3/photoicons.zip)
И добавьте изображения в **Assets.xcassets** проекта.

![Добавление иконок в Assets.xcassets](https://monosnap.com/file/7eQHbGwI6LfMWrnPY2kOW0mEaK4wyU.png)

> Credit: Icons made by **Freepik** from www.flaticon.com and is licensed by [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)

Для первой ячейки измените её высоту до 250 (или на любое значение, которое вы
предпочитаете), а также измените цвет фона на светло-серый. Также установите
параметр выбора в **None**.

![Static Table Cell](https://monosnap.com/file/dPc6UWumgtohP7Uk4TWunlPlpEdQNY.png)

Затем перетащите **Image View** из библиотеки в первую ячейку таблицы. В
**Attribute inspector** установите изображение, которое хранилось в архиве.
Измените размер изображения до 64х64 и поместите его прямо в центр ячейки.
Нажмите на **Editor > Resolve Auto Layout Issues > Add missing constraints**,чтобы
добавить необходимые ограничения.

![Resolve Auto Layout Issues](https://monosnap.com/file/7PtVmawPf8uwqfjghlRVD5zJzk9G0S.png)

Для второй ячейки измените её высоту до 72. Перетащите **Label** в ячейку
и измените её название на **NAME**. Затем перетащите текстовое поле в ячейку и
поместите его под **Label**. Текстовое поле предназначено для захвата пользовательского
ввода и отображения редактируемого текста. Как правило, вы используете его, чтобы
собрать небольшое количество текста от пользователя. В **Attribute inspector**,
установите значение **Restaurant Name** в пункте **placeholder** и установите
**None** в пункте **border style**. **Placeholder** отображается, когда нет
текста в текстовом поле. В **Size inspector** установите ширину текстового поля до
339.

![Static Table Cell](https://monosnap.com/file/1sZ8sD0jmZWT5dmzcqNIzmNffrbdKa.png)

Теперь вам надо определить ограничения. Выберите **NAME** и **Text Field** панели
**Editor > Resolve Auto Layout Issues > Add missing constraints** и добавьте
недостающие ограничения, чтобы добавить необходимые. Для третьей и четвертой
ячейки повторите те же операции, но установите **Type** и **Location**
соответственно. Для пятой ячейки установите её высоту 92. Затем добавьте две
кнопки в ячейку. Одну кнопку назовите **Yes**, а другую назовите **NO**. Для
кнопки **Yes** измените её фоновый цвет на красный, а для **NO** установите серый
фон. Кроме того, установите цвет текста на белый для обеих кнопок. Опять же
выберите **Label** и **Buttons** и, затем, добавьте им недостающие ограничения.
Ниже показан пример расположения элементов.

![Static Table Cell](https://monosnap.com/file/XQetJrJFDDf8PdtSuZzlm5f0Ek4cSH.png)

Чтобы закончить макет экрана, необходимо встроить контроллер таблицы в
**navigation controller**. Перейдите к меню **Xcode** и выберите **TableViewController**
и перейдите в **Editor > Embed in > Navigation Controller**. Установите заголовок
в панели навигации **New Restaurant**.

Не написав ни одной строчки кода, вы создаете таблицу с формой с помощью
статического представления в виде таблицы. Вы можете создавать формы
со статическими видами таблицы, а также применять ту же технику для создания
экранов, таких как **Setting** и других. В конце у вас должно получиться примерно так.

![Static Table Cell](https://monosnap.com/file/BoGs7QvSDK6Kb2p1m6yBW94zUFkHVn.png)

На этом перевод первой части закончен.

Перевод главы из книги: [Beginning iOS 10 Programming with Swift 3](https://www.amazon.com/Beginning-iOS-10-Programming-Swift/dp/1520222599/ref=sr_1_1?s=books&ie=UTF8&qid=1487189058&sr=1-1&keywords=Simon+Ng)

Автор книги: Simon Ng


