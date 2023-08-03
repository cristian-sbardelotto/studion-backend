## API Reference

### Register a new user

```http
  POST /register
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Example body

```json
{
  "username": "user123",
  "password": "veryStrongPassword"
}
```

#### @returns - Returns the created user.

---

### Login on your acccount

```http
  POST /login
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |

#### Example body

```json
{
  "username": "user123",
  "password": "veryStrongPassword"
}
```

#### @returns - Returns the **user token**.

---

### List all events

```http
  GET /
```

> Your user token is required. Pass the prefix "Bearer" before the token string.

#### @returns - Returns all the events created.

---

### List an event by ID

```http
  GET /events/<event_id_here>
```

> Your user token is required. Pass the prefix "Bearer" before the token string.

#### @returns - Returns the event details.

---

### Create an event

```http
  POST /events
```

| Parameter         | Type     | Description  |
| :---------------- | :------- | :----------- |
| `name`            | `string` | **Required** |
| `location`        | `string` | **Required** |
| `maxParticipants` | `number` | **Required** |
| `date`            | `Date`   | **Optional** |
| `description`     | `string` | **Optional** |

> Your user token is required. Pass the prefix "Bearer" before the token string.

#### Example body

```json
{
  "name": "Party",
  "location": "Santa Catarina, Brazil",
  "maxParticipants": 1000,
  "date": "2023-07-30T12:18:40.028Z",
  "description": "Come check out this amazing event"
}
```

#### @returns - Returns the created event.

---

### Update an event by ID

```http
  PUT /events/<event_id_here>
```

| Parameter         | Type     | Description  |
| :---------------- | :------- | :----------- |
| `name`            | `string` | **Optional** |
| `location`        | `string` | **Optional** |
| `maxParticipants` | `number` | **Optional** |
| `date`            | `Date`   | **Optional** |
| `description`     | `string` | **Optional** |

> Your user token is required. Pass the prefix "Bearer" before the token string.

#### Example body

```json
{
  "name": "Updated Party"
}
```

#### @returns - Returns the updated event.

---

### Delete an event by ID

```http
  DELETE /events/<event_id_here>
```

> Your user token is required. Pass the prefix "Bearer" before the token string.

#### @returns - Returns the deleted event.
