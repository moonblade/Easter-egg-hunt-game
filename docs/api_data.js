define({ "api": [
  {
    "type": "delete",
    "url": "/level",
    "title": "delete level",
    "parameter": {
      "examples": [
        {
          "title": "request",
          "content": "{\n  level: {\n      level: 101,\n  },\n  user: {\n      id: \"791a4270d908c5d131e59f4ee95b9f4a\"\n  }\n}",
          "type": "josn"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "success",
          "content": "{\n     \"code\" : 0,\n     \"message\": \"Success\"\n}",
          "type": "josn"
        }
      ]
    },
    "group": "level",
    "version": "0.0.0",
    "filename": "routes/v1/level.js",
    "groupTitle": "level",
    "name": "DeleteLevel"
  },
  {
    "type": "post",
    "url": "/level",
    "title": "get level",
    "parameter": {
      "examples": [
        {
          "title": "request",
          "content": "{\n  level: {\n      level: 101,\n  },\n  user: {\n      id: \"791a4270d908c5d131e59f4ee95b9f4a\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "success",
          "content": "{\n   \"_id\": \"57b92c66ec186bcd4b21de5e\",\n   \"level\": 1,\n   \"key\": \"791a4270d908c5d131e59f4ee95b9f4\",\n   \"basescore\": 5000,\n   \"num\": 0\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "unauthorized error",
          "content": "{\n  \"error\": {\n    \"message\": \"Unauthorized access\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "group": "level",
    "version": "0.0.0",
    "filename": "routes/v1/level.js",
    "groupTitle": "level",
    "name": "PostLevel"
  },
  {
    "type": "put",
    "url": "/level",
    "title": "put level",
    "parameter": {
      "examples": [
        {
          "title": "request",
          "content": "{\n level: {\n     level: 101,\n     key: \"testKey\",\n     basescore: 5000\n },\n user: {\n     id: \"791a4270d908c5d131e59f4ee95b9f4\"\n }\n}",
          "type": "josn"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "success",
          "content": "{\n     \"code\" : 0,\n     \"message\": \"Success\"\n}",
          "type": "josn"
        }
      ]
    },
    "group": "level",
    "version": "0.0.0",
    "filename": "routes/v1/level.js",
    "groupTitle": "level",
    "name": "PutLevel"
  },
  {
    "type": "delete",
    "url": "/player",
    "title": "delete player",
    "parameter": {
      "examples": [
        {
          "title": "request",
          "content": "{\n  player: {\n      id: \"654321\",\n  },\n  user: {\n      id: \"791a4270d908c5d131e59f4ee95b9f4a\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "success",
          "content": "{\n     \"code\" : 0,\n     \"message\": \"Success\"\n}",
          "type": "josn"
        }
      ]
    },
    "group": "player",
    "version": "0.0.0",
    "filename": "routes/v1/player.js",
    "groupTitle": "player",
    "name": "DeletePlayer"
  },
  {
    "type": "get",
    "url": "/player",
    "title": "get player",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id of the player to get</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "success",
          "content": "{\n \"_id\": \"57b9454c6ba8386c2ca2926c\",\n \"id\": 65432,\n \"name\": \"testName\",\n \"__v\": 0,\n \"status\": 0,\n \"auth\": 0,\n \"level\": 0,\n \"score\": 0\n}",
          "type": "json"
        }
      ]
    },
    "group": "player",
    "version": "0.0.0",
    "filename": "routes/v1/player.js",
    "groupTitle": "player",
    "name": "GetPlayer"
  },
  {
    "type": "put",
    "url": "/player",
    "title": "put player",
    "parameter": {
      "examples": [
        {
          "title": "request",
          "content": "{\n  player: {\n      id: \"654321\",\n      name: \"testName\",\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "success",
          "content": "{\n     \"code\" : 0,\n     \"message\": \"Success\"\n}",
          "type": "josn"
        }
      ]
    },
    "group": "player",
    "version": "0.0.0",
    "filename": "routes/v1/player.js",
    "groupTitle": "player",
    "name": "PutPlayer"
  }
] });
