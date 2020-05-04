# IAB

**Internal API Bridge**

> This project is part of [Univ UC](https://github.com/univuc).

## Features

IAB is a library, which consists of a set of functions.

### Internal API wrapper

IAB helps to facilitate internal RESTful APIs.

### Common

IAB provides common features like networking, arg, env, logging, etc.

## Usage

### UIP

#### getUser(id): Promise<User|null>

**Params**

- `id`: Student number or slack user id 

**Returns**

- `User` if succeeded
- `null` if not exist

#### addUser(user): Promise<User|null>

**Params**

- `user`: User domain entity 

**Returns**

- `User` if succeeded
- `null` if failed

#### updateUser(user): Promise<User|null>

**Params**

- `user`: User domain entity 

**Returns**

- `User` if succeeded
- `null` if failed

### SMS

#### sendChat(text, channel): Promise<String|null>

**Params**

- `text`: Payload
- `channel`: Slack message channel

**Returns**

- `String` if succeeded
- `null` if failed

