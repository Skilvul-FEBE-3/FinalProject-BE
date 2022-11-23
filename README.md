# Backend-Mental-Hack

## Mental Hack API

# API Spesification Mental-Hack

```
https://finalproject-be-production.up.railway.app
```

---

## 1. Auth

### `POST` Register

```
/auth/register
```

### Body raw (json)

```json
{
  "name": "john doe",
  "email": "john@gmail.com",
  "password": "john",
  "confPassword": "john"
}
```

> menambahkan user baru dengan role `user` dan profile img `default.jpg`

### `POST` Login

```
/auth/login
```

### Body raw (json)

```json
{
  "email": "admin@gmail.com",
  "password": "admin"
}
```

> login dengan email dan password yang telah di daftar mengembalikan mengembalikan token jwt yang berisi id, name, email, role

### `DELETE` Logout

```
/auth/logout
```

---

---

## 2. User

> `fitur crud user harus rolenya admin`

### `GET` Get all Users

```
/user
```

### `GET` Get user by id

```
/users/<userId>
```

### `POST` Create user

```
/users
```

Bodyraw (json)

```json
{
  "name": "admin",
  "email": "admin@gmail.com",
  "password": "admin",
  "role": "admin" // enum (user / admin)
}
```

### `PATCH` Update user

```
/users/<userId>
```

```json
{
  "name": "dwi",
  "email": "dwi@gmail.com",
  "password": "dwi",
  "role": "user" enum (user / admin)
}
```

> - bisa salah satu yang di update

### `DELETE` delete user

```
/users/<userId>
```

### ` POST` update img profile

Body form-data

```
/users/updateprofilepicture
```

> 'Content-type': 'multipart/form-data' dengan key `file`
