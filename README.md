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

### `POST` me

```
/auth/me
```

### Body raw (json)

```json
{
  "token": "<token>"
}
```

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

### `Patch` update img profile

Body form-data

```
/users/updateprofilepicture
```

> 'Content-type': 'multipart/form-data' dengan key `file`

## 3. Blog

> > BLOG

### `GET` all Blog

```
/blog
```

### `GET` blog by id

```
/blog/:id
```

### `POST` blog **HANYA ADMIN**

```
/blog
```

```JSON
body-raw (JSON)
{
"image" : "gambar2.jpg",
"title" : "ini judul2",
"subTitle" : "ini subTitle2",
"description" : "ini description2",
"createdBy" : "637df1bff73d4c3f5d47eaf8"
}
```

### `PATCH ` blog by id **HANYA ADMIN**

```
/blog/:id
```

```JSON
body-raw (JSON)
{
"image" : "gambar2.jpg",
"title" : "ini judul2",
"subTitle" : "ini subTitle2",
"description" : "ini description2",
"createdBy" : "637df1bff73d4c3f5d47eaf8"
}
```

bisa edit salah satu

### `DELETE` blog by id **HANYA ADMIIN**

```
/blog/:id
```

> > BLOG COMMENT

### `POST` comment

```
/:id/comment
```

body-raw (JSON)

```JSON
{
"content" : "cek komen",
"postedBy" : "637df1bff73d4c3f5d47eaf8"
}
```

### `GET` comment by id blog

```
/:id/comment
```

### `DELETE` comment by id

```
/:id/comment/:idComment
```

## 4. Video

## 5. FAQ

### `GET` get FAQs

```
/faq
```

###### `limit and page`

```
/faq?limit=1&page=1
```

> Dapat menyeting berapa jumlah data yang ingin ditampilkan

###### `filtering question`

```
/faq?question=<question_value>
```

> anda bisa memakai opsi di atas

```
/faq?limit=1&page=5&question=example
```

### `POST` create FAQ

```
/faq
```

Body raw (json)

```json
{
  "question": "testing pertanyaan10",
  "answer": "testing jawaban"
}
```

### `PATCH` create FAQ

```
/faq/<faqId>
```

Body raw (json)

```json
{
  "question": "testing pertanyaan10",
  "answer": "testing jawaban"
}
```

### `DELETE` delete FAQ

```
/faq/<faqId>
```
