# Что это?!
 - Лаба по ДГИБ, 3 курс ИБАС. Аутентификация
# Как этим пользоваться?
 - Клонируешь репозиторий:<br>
 	`git clone https://github.com/KucherenkoIvan/Authorization.git`
 - Переходишь в появившуюся папку:<br>
 	`cd Authorization`
 - Устанавливаешь зависимости:<br>
 	`npm run deps`
 - Запускаешь:<br>
 	`npm run start` - если на компе установлен PostgreSQL и в нем есть база данных authDB (не забудь создать её)<br>
 	`npm run start:docker` - если у тебя есть Docker и ты умеешь им пользоваться<br>
 - Всё, можешь смело юзать модуль, как тебе захочется
# Некоторые детали
 - Если используешь Docker, то на http://127.0.0.1:8080 будет висеть админка для бд<br>
   	`логин`: admin@email.com<br>
   	`пароль`: admin<br>
 - Дальше в ней нужно будет подключиться к серверу:<br>
   	`host`: postgres<br>
   	`port`: 5432<br>
   	`database`: authDB<br>
   	`username`: postgres<br>
   	`password`: Нууу, ты знаешь, где его взять
