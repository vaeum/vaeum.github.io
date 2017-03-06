---
title: Как создать пустую ветку в GIT
layout: post
categories: GIT
tags: GIT Branch
description: ""
---

Во многих проектах код содержится в одном репозитории, а документация в другом.

И если проект имеет backend часть, то скорее всего она содержится в еще одном репозитории.

В GIT вы можете хранить это все в одном репозитории в отдельных и изолированных ветках.

Обычные ветки делятся файлами в каталоге, но GIT умеет создавать пустые ветки.

Вы можете создать пустую ветку командой:

```
$ git checkout --orphan NEWBRANCH
```

Параметр `--orphan` создает новую ветку, без коммитов. После запуска комманды вы
перейдете в ветку `NEWBRANCH`, и ваш первый коммит создаст новую историю ветки.

{::comment}
The `--orphan` command keeps the index and the working tree files intact in order
to make it convenient for creating a new history whose trees resemble
the ones from the original branch.
{:/comment}

Так как вы хотите создать новую пустую ветку, которая не имеет ничего общего с оригинальной
веткой, вы можете удалить все файлы в новом рабочем каталоге:

```
$ git rm -rf .
```

Теперь вы можете начать добавлять файлы и коммитить их, и они будут находиться в своих ветках.
Если вы посмотрите на log, то вы увидете, что он изолирован от оригинального.

Используя команду `checkout`, вы можете перемещаться между ветками, например:

```
$ git checkout master (back at the master branch)
$ git checkout NEWBRANCH (back at the new isolated branch)
```

Опция `--orphan` поддерживается GIT версии 1.7.2 и выше.

Оригинальная статья [http://www.bitflop.dk/tutorials/how-to-create-a-new-and-empty-branch-in-git.html](http://www.bitflop.dk/tutorials/how-to-create-a-new-and-empty-branch-in-git.html)
