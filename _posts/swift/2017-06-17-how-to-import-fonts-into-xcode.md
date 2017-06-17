---
title: How to Import Fonts into Xcode (Swift 3) (Перевод)
layout: post
categories: IOS Fonts Swift Xcode
tags: IOS Fonts Swift Xcode
description: How to Import Fonts into Xcode (Swift 3) (Перевод)
published: true
---

![How to Import Fonts into Xcode](/images/post/how-to-import-fonts-into-xcode/1.gif)

Итак, вы в процессе создания своего первого приложения ... давайте добавим в этот интерфейс с некоторые классные шрифты! Вот как это сделать за 6 шагов.

### Шаг 1. Найдите классный шрифт и загрузите его.

Я использовал [DaFont](http://www.dafont.com/) для своего личного логотипа и нашел еще один хороший шрифт Ember для этого проекта / blogpost. Я выбрал Ember, потому что он находится в общественном достоянии, но вы можете легко выбрать хороший шрифт, а затем отправить своему дизайнеру. (Мне также очень понравился [Boquerón](http://www.dafont.com/boqueron.font?text=Yay+it%27s+Erica), но, возможно, я сохраню его для другого проекта). Убедитесь, что шрифт входит в **TFF** (формат TrueType) или **OTF** (формат OpenType).

### Шаг 2. Сохраните шрифты и перетащите их в свой проект.

Когда вы перетаскиваете папку шрифтов в свой проект, обязательно **copy items as needed**.

![How to Import Fonts into Xcode](/images/post/how-to-import-fonts-into-xcode/2.png)

Я перетащил **ember** в папку загруженных шрифтов.

![How to Import Fonts into Xcode](/images/post/how-to-import-fonts-into-xcode/3.png)

Обязательно перетащите эту папку шрифтов в свой проект Xcode!

### Шаг 3: Нажмите на папку шрифтов, чтобы убедиться, что они включены в пункте Target Membership.

![How to Import Fonts into Xcode](/images/post/how-to-import-fonts-into-xcode/4.png)

### Шаг 4: Сделайте быструю проверку, ваших шрифтов в “Build Phases” -> “Bundle Resources”.

![How to Import Fonts into Xcode](/images/post/how-to-import-fonts-into-xcode/5.png)

### Шаг 5: Вручную введите имена шрифтов в вашем plist.

![How to Import Fonts into Xcode](/images/post/how-to-import-fonts-into-xcode/6.png)

### Шаг 6: Используйте шрифт!

В **main.storyboard** найдите шрифт в разделе **Font** в выпадающем списке.

![How to Import Fonts into Xcode](/images/post/how-to-import-fonts-into-xcode/7.png)

Программно выберите шрифт и примените его. Ниже я меняю шрифт моей кнопки на шрифт **Ember**.

![How to Import Fonts into Xcode](/images/post/how-to-import-fonts-into-xcode/8.png)

Я вызываю функцию **changeFonts()** в **viewDidLoad()**.

![How to Import Fonts into Xcode](/images/post/how-to-import-fonts-into-xcode/9.png)

Автор оригинала: **Erica Millado**.
[Ссылка на оригинальную статью](https://medium.com/yay-its-erica/how-to-import-fonts-into-xcode-swift-3-f0de7e921ef8)


