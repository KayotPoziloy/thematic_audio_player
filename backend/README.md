## Installation and launch
```bash
npm install
npm start
```

without initializing the database

```bash
npm install
npm run start:noinit
```

## src/music/config.json
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

## OpenAPI
OpenAPI json available at `http://localhost:PORT/api` and `backend/src/api.html`
