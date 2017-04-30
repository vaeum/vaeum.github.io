---
title: Prepare For Segue With Array - Xcode 8.2 Swift 3.0
layout: post
categories: Swift Xcode
tags: Swift Xcode PrepareForSegue Snippet
description: Передача массива с помощью Prepare For Segue
published: true
---

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue.jpg)

Сегодня я покажу, как можно передать массив с помощью **Prepare For Segue** и, потом, отобразить массив в таблице.

Для начала создайте проект с любым названием и выберите язык Swift. 

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_1.jpg)
![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_2.jpg)

В библиотеке объектов найдите **Table View Controller** и перетащите его в **StoryBoard**. Выберите по умолчанию созданный **View Controller** и уберите стрелку, которая указывает на него. Для этого выбираете **View Controller** и во вкладке атрибут инспектора убираете галочку со следующего пункта:

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_3.jpg)

После этого выберите **Table View Controller** и добавьте к нему **Navigation Contoller**. 

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_4.jpg)

Далее выделите созданный **Navigation Controller** и добавьте к нему стрелку,  поставив галочку в этом пункте.

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_5.jpg)

Теперь добавьте объект **Bar Button Item** к **Table View Controller**.

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_6.jpg)

И в настройках **System item** выберите **Add**.

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_7.jpg)

После того, как все это сделано, создайте **Segue** от **Table View Controller** к **View Controller** и выберите тип связи **Show Detail**.
 
![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_8.gif)

Теперь установите индетификатор для созданной связи **addNewLabel**. 

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_9.jpg)

Теперь добавьте **Label** в ячейку таблицы и назовите её **names**. Выберите **table view** в **Table View Controller** и установите индетификатор **cell**.

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_10.jpg)

В **View Controller** добавьте объекты: **2 Button**, **1 Textfield**. Назовите их и укажите ограничения. По желанию можно задать цвет **View**, чтобы отличались контроллеры. 

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_11.jpg)

Теперь создайте два файла: **TableViewController** и **TableViewCell**. Привяжите  **TableViewController** к нашей таблице:

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_12.jpg)

Откройте файл **TableViewCell.swift** и вставьте следующий код:

```swift
class TableViewCell: UITableViewCell {
	@IBOutlet weak var namesLabel: UILabel!
}
```

Теперь соедините **@IBOutlet** с вашим **label** в таблице. 

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_13.gif)

Откройте файл **ViewController.swift** и добавьте следующий код:

```swift
class ViewController: UIViewController {
	
	@IBOutlet weak var textfield: UITextField!
	
	@IBAction func saveButtonText(_ sender: Any) {
		
	}
	
}
```

После этого соедините: **@IBOutlet** с **TextField**, а **@IBAction** с **Button** вашего **View Controllera**.

Откройте файл **TableViewController.swift** и добавьте следующий код:

```swift
class TableViewController: UITableViewController {

	var name: [String] = []
	
	@IBAction func returnTableView(segue: UIStoryboardSegue) {
	}
	
	// MARK: - Table view data source
	
	override func numberOfSections(in tableView: UITableView) -> Int {
		// #warning Incomplete implementation, return the number of sections
		return 1
	}
	
	override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
		// #warning Incomplete implementation, return the number of rows
		return name.count
	}
	
		override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
		let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! TableViewCell
		
		cell.namesLabel.text = name[indexPath.row]
		
		return cell
		}
}
```

Вернитесь в **Main.Storyboard** и сделайте выход из **View Contoller** по нажатию на кнопку, для того, чтобы можно было выйти из этого экрана, когда туда перейдем.

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_14.gif)

И установите индетификатор **backTableView** для **unwind segue**.

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_15.jpg)

Теперь вернитесь в файл **TableViewController.swift** и обновите код:

```swift
class TableViewController: UITableViewController {

	var name: [String] = []
	
	@IBAction func returnTableView(segue: UIStoryboardSegue) {
		self.tableView.reloadData()
	}
	
	// MARK: - Table view data source
	
	override func numberOfSections(in tableView: UITableView) -> Int {
		// #warning Incomplete implementation, return the number of sections
		return 1
	}
	
	override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
		// #warning Incomplete implementation, return the number of rows
		return name.count
	}
	
	
		override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
		let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath) as! TableViewCell
		
		cell.namesLabel.text = name[indexPath.row]
		
		return cell
		}
	
	
	override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
		if segue.identifier == "addNewLabel" {
			let destinationVC = segue.destination as! ViewController
			destinationVC.names = name
		}
	}
}
```
И также обновите код в файле **ViewController.swift**:

```swift
class ViewController: UIViewController {
	
	@IBOutlet weak var textfield: UITextField!
	
	var names: [String] = []
	
	@IBAction func saveButtonText(_ sender: Any) {
		
		var error = ""
		
		if (textfield.text?.isEmpty)! {
			error = "поле пустое"
		}
		
		if error != "" {
			let alert = UIAlertController(title: "Ошибка", message: "У вас \(error)!!!", preferredStyle: .alert)
			let okAction = UIAlertAction(title: "Хорошо", style: .default, handler: nil)
			alert.addAction(okAction)
			present(alert, animated: true, completion: nil)
			textfield.placeholder = "У вас \(error)!!!"
		} else {
			names.append(textfield.text!)
			print(names)
			performSegue(withIdentifier: "backTableView", sender: self)
		}
	}
	
	override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
		if segue.identifier == "backTableView" {
			let destinationVC = segue.destination as! TableViewController
			destinationVC.name = names
		}
	}
	
}
```

После этого запустите приложение и протестируйте его. Должно работать так:

![Prepare For Segue](/images/post/prepare_for_segue/prepare_for_segue_16.gif)
