# Auth Server
Стартер для запуска сервера с JWT авторизацией и базой данных в докере.

## Локальная разработка
Для старта локальной разработки необходимо запустить сервер и докер с базой данных 
```
"start:dev": "nest start --watch",
"start:db": "docker-compose up -d",
```

## Swagger
После запуска сервера локально, swagger доступен по ссылкам:

http://localhost:3000/swagger

http://localhost:3000/swagger-json

## Полезности
Для генерации секретов можно использовать следующие команды в консоли
```
node
crypto.randomBytes(64).toString('base64')
```