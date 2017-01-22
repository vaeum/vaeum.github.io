---
title: Настраиваем автоматическую публикацию NPM модуля с помощью Travis CI
layout: post
categories: GIT Travis
tags: GIT travis NPM
---

Сервис Travis CI может публиковать, или обновлять ваши NPM модули автоматически,
это очень удобно так как вся рутина по тестированию ложиться на плечи этого сервиса,
и в случае ошибок он нас оповестит по почте. Как сделать так чтобы при создании
тега публиковалась новая версия вашего NPM пакет, читайте в статье.

#### Шаг 1

Создаем Github аккаунт и логинимся с помощью него на сервис https://travis-ci.org/

#### Шаг 2

Добавляем репозиторий с NPM модулем в своем профиле https://travis-ci.org/profile/,
нажав на переключатеть

![Alt text](https://monosnap.com/file/xPdx1aVPgE0WAWmC70s221ulDSQvyt.png)

#### Шаг 3

Устанавливаем Ruby Gems

```
$ sudo apt-get install rubygems
```

После этого должна быть доступна команда **gem**

#### Шаг 4

Устанавливаем 2 гема travis CLI gem и json gem

```
$ sudo gem install json
$ gem install travis
```

#### Шаг 5

Создаем файл `.travis.yml` в корне проекта, и добавляем следующие строки в него,
не забудьте заменить `your@emailhere.com` на свой email

```yaml
language: node_js
```

#### Шаг 6

В этом шаге узнаем свой `npmjs API key` и копируем его в буфер обмена (после **_authToken=**).
Он нужен для того чтобы публиковать NPM модули автоматически

```
$ cat ~/.npmrc | grep _auth
```

Пример `npmjs API key`

```
a44afac7-b93c-016e-675d-744137689de8
```

#### Шаг 7

Находясь в корневой папке проекта,  через терминал запускаем команду

```
$ travis setup npm
```

После этой команды `Travis CLI` задаст несколько вопросов для настройки публикации
наших модумей в NPM

- Detected repository as ${your repo name}, is this correct? \|yes\| - жмем enter
- NPM email address: - вводим свой email
- NPM api key: - вставляем свой api key
- release only tagged commits? \|yes\|
  - если ввести **yes**, то Travis будет публиковать модули только если создан Git Tag,
  - если ввести **no**, то Travis будет публиковать модули после любого коммита
- Release only from ${your repo name}? \|yes\| - жмем enter
- Encrypt API key? \|yes\| - жмем enter для того чтобы Travis зашифровал наш API key

#### Шаг 8

После выполнения команды `travis setup npm` и ответов на вопросы наш  файл `.travis.yml` будет примерно таким:

```yaml
language: node_js
deploy:
  provider: npm
  email: ${your email}
  api_key:
    secure: ${...key}
  on:
    tags: true
    repo: ${your repo name}
```

`tags: true` добавляется если на вопрос *release only tagged commits* ответить **yes**

Так же рекоммендую добавить параметр `skip_cleanup` со значением `true` в секцию `deploy`
для того что бы, Travis перед публикацией не очищал наш проект

#### Шаг 9

Вносим необходимые правки, обязательно увеличиваем номер версии публикуемого модуля
в нашем `package.json` в секции `version`

Добавляем сделанные изменения в индекс, командой

```
$ git add .
```

Создаем коммит

```
$ git commit -m "add travis auto publish"
```

Если на вопрос *release only tagged commits* ответили yes, то нужно еще создать git тег

```
$ git tag 0.1234
```

Дальше пушим в наш удаленный репозиторий тег а потом и наш коммит

```
$ git push origin --tags
$ git push origin master
```

После нашего пуша в репозиторий, Travis пересоберет проект и попытается опубликовать
модуль в репозитории NPM, это скриншот удачной регистрации нашего модуля:

![Alt text](https://monosnap.com/file/1MUT2aK8w0PdAMMmprTymoeIl2PJLh.png)
