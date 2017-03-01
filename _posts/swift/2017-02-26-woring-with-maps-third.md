---
title: Woring With Maps (Перевод). Часть третья.
layout: post
categories: Swift Xcode MapKit
tags: Swift Xcode MapKit
description: "Третья часть перевода главы, в которой объясняется как работать с MapKit."
---

![Работае и MapKit framework.](/images/post/Simon-Ng-Beginning-iOS-10-Programming-with-Swift.jpg)

Продолжаем перевод главы. [Первая часть перевода.](http://vaeum.com/blog/2017/02/18/woring-with-maps-first/) [Вторая часть перевода.](http://vaeum.com/blog/2017/02/24/woring-with-maps-second/)

### Добавление аннотации к полноэкранной карте

Хорошо, давайте перейдем к реализации полноэкраной карты.
Как обычно, мы сначала создадим пользовательский класс для контроллера карты.
В навигаторе проекта щелкните правой кнопкой мыши на папку **FoodPin** и выберите
пункт **"New File ..."**. Создайте новый класс, используя шаблон класса
**Cocoa Touch**, и укажите имя класса **MapViewController**. Убедитесь, что вы
установили его в качестве подкласса **UIViewController**, и сохраните файл
в папке проекта.

Опять же, мы сначала импортируем фреймворк **MapKit**, для этого ставим следующую строку
в самом начале файла **MapViewController.swift**:

```swift
import MapKit
```
Затем объявите следующую выходную переменную для просмотра карты и другую
переменную с типом **Restaurant** для выбора ресторана:

```swift
@IBOutlet var mapView: MKMapView!
var restaurant: Restaurant!
```
Переменная **IBOutlet** используется для установления соединения с **Storyboard**. 
Перейдя к **Interface Builder**, выберите контроллер, на котором расположена
полноэкранная карта. Потом перейдите в **Identity inspector**, в поле **Class**
вставьте название созданного файла **MapViewController**. Затем установите
связь между переменной на выходе и картой.

![Подключение связей между переменной на выходе и картой](https://monosnap.com/file/oDjZMZVfoqdTmkqFTuh7h7Hb1thy7P.png)

Чтобы добавить аннотацию на карте, добавьте следующий код в метод
**viewDidLoad()**:

```swift
override func viewDidLoad() {
		super.viewDidLoad()
		
		// Convert address to coordinate and annotate it on map
		let geoCoder = CLGeocoder()
		geoCoder.geocodeAddressString(restaurant.location, completionHandler: { placemarks, error in
			if let error = error {
				print(error)
				return
			}
			
			if let placemarks = placemarks {
				// Get the first placemark
				let placemark = placemarks[0]
				
				// Add annotation
				let annotation = MKPointAnnotation()
				annotation.title = self.restaurant.name
				annotation.subtitle = self.restaurant.type
				
				if let location = placemark.location {
					annotation.coordinate = location.coordinate
					
					// Display the annotation
					self.mapView.showAnnotations([annotation], animated: true)
					self.mapView.selectAnnotation(annotation, animated: true)
				}
			}
			
		})
	}  
```
Приведенный выше код, очень похож на тот, который мы только что обсуждали,
поэтому я не буду вдаваться в подробности. Мы превращаем адрес в координату
для аннотирования. Еще раз, мы используем **MKPointAnnotation**, чтобы
добавить пин на карту. Но на этот раз мы относим его к заголовкам и
подзаголовкам, использовав метод **showAnnotations** объекта **MapKit**,
поставим пин на карте. Метод достаточно умен, чтобы определить наиболее
пригодный регион для аннотирования. По умолчанию сносками информация
не отображается на карте, пока пользователь не нажимает на пин. Здесь мы также
используем метод **selectAnnotation** для отображения выноски.

Существует еще одна вещь перед тестированием приложения. Мы не имеем выбранный
ресторан на контроллере. В классе **RestaurantDetailViewController** нужно
обновить метод **prepare(for:sender:)** следующим образом: 

```swift
override func prepare(for segue: UIStoryboardSegue, sender: AnyObject?) {
    if segue.identifier == "showReview" {
        let destinationController = segue.destination as! ReviewViewController
        destinationController.restaurant = restaurant
    } else if segue.identifier == "showMap" {
        let destinationController = segue.destination as! MapViewController
        destinationController.restaurant = restaurant
} } 
```
Мы просто получили выбранный ресторан и передаем его в контроллер назначения.
В этом случае, это класс **MapViewController**. Хорошо, давайте скомпилируем
и запустим наше приложение. Нажмите на **"Мини-карту"** в окне детальной
информации о ресторане, и вы увидите пин на полноэкранной карте.

![Отображение пина на карте.](https://monosnap.com/file/Hv7wHMVEpj4BG4Kir9JTfZE0Iykt2O.png)

### Добавление изображения и аннотации к пину

Было бы замечательно,а если мы можем показать эскиз ресторана в выноске пина?

Как уже упоминалось в начале этой главы, вид аннотации — является фактическим
объектом для визуального представления аннотаций. Для того, чтобы добавить
эскиз или изображение в аннотацию, вы должны изменить вид аннотации. Чтобы
сделать это, вы должны принять протокол **MKMapViewDelegate**, который определяет
набор дополнительных методов, которые можно использовать для получения карты
изменённых сообщений. Карта использует один из этих методов, чтобы запросить
аннотацию. Каждый раз, когда нужно посмотреть на карте аннотацию, вызывается
**mapView(_:viewFor:)** метод: 

```swift
optional func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) -
> MKAnnotationView?
```
До сих пор мы не приняли протокол и обеспечили собственную реализацию метода.

Поэтому отображается вид аннотации по умолчанию. Мы собираемся реализовать метод
и создать свой собственный вид аннотации и встроить изображение ресторана.

Вернитесь к файлу **MapViewController.swift** и допишите протокол
**MKMapViewDelegate**:

```swift
class MapViewController: UIViewController, MKMapViewDelegate 
```
В методе **viewDidLoad()** добавьте следующую строку кода для определения
делегата **mapView**:

```swift
 mapView.delegate = self
```
**Краткое примечание:** Здесь мы определяем **MapViewController** как делегат
объекта **mapView**. Структура делегации является одним из наиболее
распространённых моделей в развитии **IOS**. Теперь я предполагаю, что у вас есть
хорошее понимание картины делегата. Если нет, прочитайте главу 7 раз.

Далее вставьте код в следующий метод **mapView(_:viewForAnnotation:)**:

```swift
func mapView(_ mapView: MKMapView, viewFor annotation: MKAnnotation) ->
MKAnnotationView? {
    let identifier = "MyPin"
    if annotation.isKind(of: MKUserLocation.self) {
        return nil
} 
    // Reuse the annotation if possible
    var annotationView:MKPinAnnotationView? =
mapView.dequeueReusableAnnotationView(withIdentifier: identifier) as?
MKPinAnnotationView
    if annotationView == nil {
        annotationView = MKPinAnnotationView(annotation: annotation,
reuseIdentifier: identifier)
        annotationView?.canShowCallout = true
} 
    let leftIconView = UIImageView(frame: CGRect.init(x: 0, y: 0, width: 53,
height: 53))
    leftIconView.image = UIImage(named: restaurant.image)
    annotationView?.leftCalloutAccessoryView = leftIconView
    return annotationView
}
```
Пройдемся по коду строка за строкой.

Кроме метки текущее местоположение пользователя является также своего рода
аннотацией. Виды карты также вызывает этот метод, когда происходит аннотирование 
местоположения пользователя. Как вы знаете, текущее местоположение отображается
ввиде синей точки на картах. Даже если мы не включили приложение, чтобы отобразить
текущее местоположение, мы не хотим изменить свой вид аннотации. В самом 
начале кода мы проверяем, является ли объект аннотаций своего рода
**MKUserLocation**. Если да, то мы просто возвращаем **nil** и карта сохранит
и отобразит местоположение с помощью синей точки.

Из соображений производительности предпочтительно повторно использовать
существующий вид аннотаций вместо того, чтобы создавать новый. Карта достаточна
умная, чтобы кешировать неиспользуемый вид аннотации, который она использует.
Подобно **UITableView**, мы можем вызвать вверх по **dequeueReusableAnnotationView
(withIdentifier:)** методу, чтобы увидеть доступны ли все неиспользуемые виды.
Затем мы **MKPinAnnotationView** приведем его обратно.

Если нету доступных неиспользуемых видов, мы создаем новый экземпляр объекта
**MKPinAnnotationView** со свойством **canShowCallout**. Мы до сих пор используем
стандартный пин как вид аннотации. Но мы добавим эскиз выбранного ресторана в
**leftCalloutAccessoryView**, который является видом, отображающимся на левой
стороне выноски пина.

Круто! Нажмите кнопку **Run** и запустите приложение. Выберите ресторан и нажмите
**"Мини-карту"**.В полноэкранном виде вы должны увидеть эскиз в выноске пина.

![Отображение изображения в аннотации](https://monosnap.com/file/RJx9szG6nxKPWTLEQGtge6q8i7AZvM.png)

### Редактирование цвета пина

В 9 прошивке или более поздней версии, вы можете настроить цвет пина на любой
другой цвет. **Apple** предоставляет новое свойство **pinTintColor** для
**MKPinAnnotationView**. Чтобы изменить цвет пина, все, что вам нужно сделать, это
присвоить свойство **pinTintColor** с объектом **UIColor**.

```swift
annotationView?.pinTintColor = UIColor.orange
```

### Настройка карты

Начиная с 9 прошивки, **Apple** также позволяет разработчикам контролировать то,
что происходит на экране карты. Вот три новые свойства для вас, чтобы
контролировать содержание в карте:
* **showTraffic** - показывает любой высокий траффик карты, на ваш взгляд
* **showScale** - показывает масштаб на верхнем левом углу вида карты
* **showCompass** - отображает контроль компас на верхнем правом углу просмотра карты

![Отображение новых свойств на карте.](https://monosnap.com/file/UvsytlqCqajt4UsLQRHnqSlTvOVrGw.png)

В демо режиме вы можете вставить следующие строки кода в метод **viewDidLoad()**,
и посмотреть результат:

```swift
mapView.showsCompass = true
mapView.showsScale = true
mapView.showsTraffic = true
```

На этом перевод главы подошел к концу.
[Ссылка на финальный проект.](https://github.com/allakin/FoodPin-3)

Перевод главы из книги: [Beginning iOS 10 Programming with Swift 3](https://www.amazon.com/Beginning-iOS-10-Programming-Swift/dp/1520222599/ref=sr_1_1?s=books&ie=UTF8&qid=1487189058&sr=1-1&keywords=Simon+Ng)

Автор книги: Simon Ng


