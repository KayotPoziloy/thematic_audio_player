## Установка и запуск
```bash
npm install
npm start
```

без инициализации бд

```bash
npm install
cd src & node index.js
```

## config.json
```json
[
  {
    "name": "game 1",

    "tag": {
      "example": "This contains the information on which the playlist interface should be based",
      "background": "image...",
      "colors": [ "#123123", "#333333", "#321321" ]
    },

    "music": [
      {
        "name": "Седая ночь",
        "author": "Юрий Шатунов",
        "filename": "audio.mp3",
        "tag": {
          "data": "...",
          "background": "image...",
          "colors": [ "#123123", "#333333", "#321321" ]
        }
      }
    ]
  }
]
```

## API
`/api/user/signin?login=$1&password=$2` - возвращает и записывает в cookie токен при успешной авторизации с логином `$1` и паролем `$2`

`/api/user/signup?login=$1&password=$2&name=$3` - добавляет нового пользователя в бд пользователя с логином `$1`, паролем `$2` и именем `$3`

`/api/user/logout` - удаляет токен из cookie

`/api/user/getinfo` - возвращает информацию об авторизированном пользователе

<br>

`/api/music/getplaylists` - возвращает список всех плейлистов (игр)

`/api/music/getmusics?id=$1` - возвращает список всех треков по id плейлиста

`/api/music/setlike?id=$1` - ставит лайк по id трека

`/api/music/removelike?id=$1` - убирает лайк по id трека

`/api/music/getliked` - возвращает список всех треков по id

`/api/music/m/__filename__` - endpoint для скачивания музыки по названию файла

Все запросы возвращают json `{ error: {error_code: 000, msg: ""} }` или `{ error: null, ... }`