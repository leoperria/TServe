# TServe
Super simple TypeScript + InversifyJS + Expressjs REST API web service

Inspired to https://github.com/inversify/inversify-express-example/tree/master/Basic

The registry class that holds todo items simulate a database so is bound as constant value:

```ts
appContainer.bind<TodoRegistry>(TYPES.TodoRegistry).toConstantValue(new TodoRegistry());
```


## Sample To-do list API

#### Create a new todo item

```
POST http://localhost:8888/api/v1/todo
```

Request body:
```json
{
   "title": "blah blahasdasd"
}
```

Response: 
```json
{
    "id": "c700b169-1a42-4d53-8b40-f29ec244c935",
    "title": "blah blahasdasd",
    "completed": false
}
```

#### Get all toto items

```
GET http://localhost:8888/api/v1/todo
```

Response: 
```json
[
    {
        "id": "de8a0d0a-2897-44b4-8102-8191b668e3c4",
        "title": "blah blahasdasd",
        "completed": false
    },
    {
        "id": "f4eb8e86-1190-4673-9b48-851d5fea951e",
        "title": "blah blahasdasd",
        "completed": true
    },
    {
        "id": "6db83f2a-4b05-4057-baba-5b7c6c47b584",
        "title": "blah blahasdasd",
        "completed": false
    }
]
```

#### Get a particular todo item

```
GET http://localhost:8888/api/v1/todo/de8a0d0a-2897-44b4-8102-8191b668e3c4
```

Response: 
```json
{
    "id": "de8a0d0a-2897-44b4-8102-8191b668e3c4",
    "title": "blah blahasdasd",
    "completed": false
}
```

#### Update a todo item

```
PUT http://localhost:8888/api/v1/todo/c700b169-1a42-4d53-8b40-f29ec244c935
```

Request body:
```json
{
    "id": "c700b169-1a42-4d53-8b40-f29ec244c935",
    "title": "blah blahasdasd",
    "completed": true
}
```

Response: 
```json
{
    "id": "c700b169-1a42-4d53-8b40-f29ec244c935",
    "title": "blah blahasdasd",
    "completed": true
}
```


#### Delete a todo item

```
DELETE http://localhost:8888/api/v1/todo/de8a0d0a-2897-44b4-8102-8191b668e3c4
```

Response: 
```json
{
    "id": "de8a0d0a-2897-44b4-8102-8191b668e3c4",
    "title": "blah blahasdasd",
    "completed": false
}
```