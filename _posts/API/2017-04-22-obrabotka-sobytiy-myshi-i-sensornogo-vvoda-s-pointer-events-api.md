---
title: Обработка событий Мыши и Сенсорного ввода с Pointer Events API
layout: post
categories: Дайджесты
tags: Дайджесты
description: Обработка событий Мыши и Сенсорного ввода с Pointer Events API.
excerpt_text: >-
  Обзор API Pointer Events. Нового API для работы с обработчиками событий Мыши и Сенсорного ввода.
published: true
---

![](/images/post/API/22-04-2017/pointer-events-api-2.png)

* TOC
{:toc}

# “Обработка событий Мыши и Сенсорного ввода с Pointer Events API”

Поскольку все больше и больше людей используют свои мобильные телефоны и планшеты для работы с веб-браузерами, мы как разработчики, должны убедиться что наши веб-интерфейсы полностью доступны и функциональны через сенсорный интерфейс этих устройств. Настройка обработчиков событий `click` и `hover` помогает нам в этом, но этого явно не достаточно что бы конкурировать с вводом данных по средством мыши и клавиатуры.

К счастью, появился новый API который поможет нам удовлетворить потребность пользователей в мыши, сенсорным устройствах и стилусах. Его имя - **Pointer events** (Не путать с [CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events) из за схожести в названии), и это позволяет нам добавлять обработчики событий, которые лучше подходят для работы со всеми типами ввода данных.


## Встречайте новые события

Новый **Pointer Event API** представляет собой усовершенствованную версию [Mouse Event](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) интерфейс, который мы все использовали до сих пор. Это расширяет функциональность старого API и добавляет поддержку мультитач жестов, точного ввода и более гладкого взаимодействия сенсорного экрана.


* [pointerdown](https://developer.mozilla.org/en-US/docs/Web/Events/pointerdown) – Курсор становится активным
* [pointerup](https://developer.mozilla.org/en-US/docs/Web/Events/pointerup) – Курсор перестает быть активным
* [pointerover](https://developer.mozilla.org/en-US/docs/Web/Events/pointerover), [pointerenter](https://developer.mozilla.org/en-US/docs/Web/Events/pointerenter) – Курсор входит в пределы границы элемента
* [pointerout](https://developer.mozilla.org/en-US/docs/Web/Events/pointerout), [pointerleave](https://developer.mozilla.org/en-US/docs/Web/Events/pointerleave) – Курсор выходит за пределы границы элемента
* [pointermove](https://developer.mozilla.org/en-US/docs/Web/Events/pointermove) – Курсор перемещается внутри границ элемента
* [pointercancel](https://developer.mozilla.org/en-US/docs/Web/Events/pointercancel) – Курсор перестал генерировать события, например входное устройство отключается
* [gotpointercapture](https://developer.mozilla.org/en-US/docs/Web/Events/gotpointercapture) – Курсор вошел в состояние захвата, например при перемещение подвижного элемента интерфейса
* [lostpointercapture](https://developer.mozilla.org/en-US/docs/Web/Events/lostpointercapture) – Завершение состояния захвата курсора

Большинство событий курсора имеют прямые альтернативы среди старых событий мыши. После того, как новый API получит полную поддержку браузера, мы сможем заменить его более современными альтернативами:

```javascript
const button = document.querySelector("button");

// Instead of mouseover
button.addEventListener('mouseover', doSomething);

// We can use pointerover
button.addEventListener('pointerover', doSomething);
```

Взаимодействие с мышью должно быть одинаковым в обоих случаях. Однако использование пальцев или стилуса будет проще программировать с помощью нового API.


## Recognizing Input Type

Удивительной особенностью **Pointer Events API** является то, что он может определить, какой тип ввода был использован. Это может быть полезно, если вы хотите проигнорировать некоторые из методов ввода или предоставить специальную обратную связь для каждого из них.

```javascript
button.addEventListener('pointereover', function(ev){
  switch(ev.pointerType) {
    case 'mouse':
      // The used device is a mouse or trackpad.
      break;
    case 'touch':
      // Input via touchscreen.
      break;
    case 'pen':
      // Stylus input.
      break;
    default:
      // Browser can't recognize the used device.
      break;
  }
});
```


## Other Properties

Интерфейс Pointer Events также предоставляет некоторые другие интересные данные. Он включает все [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) свойства плюс следующие:

* [pointerId](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerId) – Уникальный идентификатор указателя, вызывающего событие.
* [width](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/width) и [height](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/height) – Размер области контакта в пикселях.
* [pressure](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pressure) – Давление прикосновения, если таковое имеется.
* [tiltX](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltX) и [tiltY](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltY) – Угол, при котором стилус прикасается к экрану.
* [isPrimary](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/isPrimary) – Определяет, было ли событие выбрано основным устройством указателя.

![Клики мыши всегда имеют ширину и высоту 1, а размер сенсорного экрана варьируется.](/images/post/API/22-04-2017/pointer-properties.png)
Клики мыши всегда имеют ширину и высоту 1, а размер сенсорного экрана варьируется.


## Поддержка браузеров

События указателя являются достаточно новыми, поэтому совместимость с браузером еще не совершенна. Chrome (настольные и мобильные), Edge, IE и Opera имеют полную поддержку; Firefox и Safari этого не делают.

[![Pointer Events Browser Compatibility on Can I Use](/images/post/API/22-04-2017/pointer-events-browser-support.png)](http://caniuse.com/#feat=pointer)
Совместимость **Pointer Events** с браузерами можно проверить в [Can I Use](http://caniuse.com/#feat=pointer)

Чтобы проверить, имеет ли браузер Pointer Events API, вы можете использовать объект window:

```javascript
if (window.PointerEvent) {
  // Pointer Events enabled.
} else {
  // Pointer Events not supported
}
```

Популярный open-source [pollyfill](https://github.com/jquery/PEP) также доступен для тех, кто не хочет ждать полной поддержки во всех браузерах.


## Вывод

Хотя у него пока нет полной поддержки в браузерах, Pointer Events API в конце концов возьмет на себя старые события мыши. Он предоставляет множество полезных функций, которые позволят повысить доступность Интернета и дать разработчикам возможность создавать более сложные приложения для сенсорных и стилусных приложений.

Если вы хотите узнать больше об API Power Events, мы рекомендуем проверить эти ресурсы:

* [Pointing the Way Forward](https://developers.google.com/web/updates/2016/10/pointer-events) – Статья на Google Developers
* [Pointer Events – Level 2](https://w3c.github.io/pointerevents/#intro) – W3C редактор проектов
* [Pointer Events on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)



[Оригинал статьи](http://tutorialzine.com/2017/04/handle-mouse-and-touch-input-with-the-pointer-events-api/)
