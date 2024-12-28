# Deploy server

Файл server.js содержит скрпит проксирующий запросы с
* localhost:2000/api/... -> localhost:4000/api/...
* localhost:2000/... -> localhost:3000/...
А так же содержит endpoints:
* localhost:2000/__update - обновляет с github бэк и фронт и перезапускает его
* localhost:2000/get_last_update - возвращает дату и время последнего обновление
Кроме того скрипт заменяет все "localhost:4000" на "xyz.tcp.xyz.ngrok.io:xyz" во всех файлах фронтенда
