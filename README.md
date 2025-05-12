<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
  

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Project setup
## 🚀 How to Run

### 1. Install Dependencies
```bash
$ npm install
```

### 2. Set Up Environment
- Create .env file in root folder.
- Fill .env with your database credentials.


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```




# 🔐 NestJS Authentication Demo

This is a simple backend application built with **NestJS** for basic authentication (register and login) using **raw SQL**, **bcrypt** for password hashing, and **DTO-based validation** using `class-validator`.

---

## 📁 Folder Structure

```json

authenticationdemo1/
├── src/
│ ├── auth/
│ │ ├── auth.controller.ts # Handles API routes for login/register
│ │ ├── auth.service.ts # Core business logic for authentication
│ │ ├── auth.repository.ts # Raw SQL DB operations
│ │ ├── dto/
│ │ │ ├── login.dto.ts # Input and output DTOs for login
│ │ │ └── register.dto.ts # Input DTO for registration
│ │ └── auth.module.ts # Auth module setup
├── db/
│ └── db.utils.ts # MySQL connection pool and query function
├── main.ts # Application entry point
├── app.module.ts # Root module
├── .env # Local environment config (ignored in git)
├── .env.example # Sample environment file
├── package.json
├── tsconfig.json
└── README.md

```

---

## ⚙️ Tech Stack

- **NestJS**: Modular and extensible framework
- **MySQL**: Relational database
- **bcrypt**: Secure password hashing
- **class-validator**: Input validation
- **dotenv**: Environment variable management

---

## Project Logic & Flow

### 🔐 Authentication Flow

#### ✅ Registration
1. Validates all fields via `RegisterDto`
2. Checks if email already exists
3. Verifies password & confirmPassword match
4. Hashes password using `bcrypt`
5. Inserts new user into the database

#### ✅ Login
1. Validates fields via `LoginDto`
2. Finds user by email
3. Compares input password with hashed password
4. Returns success or failure message

---

### DTO Validation
All inputs are validated using class-validator decorators like:

- @IsDefined()

- @IsEmail()

- @Matches() for password and number format

##  Core Modules

### 🔸 `auth.controller.ts`
- Defines routes: `POST /auth/register` and `POST /auth/login`
- Passes request body to service layer

### 🔸 `auth.service.ts`
- Handles core logic
- Hashing, comparison, validations
- Calls repository methods for DB operations

### 🔸 `auth.repository.ts`
- Uses **raw SQL** via `mysql2` to query or insert user data

### 🔸 `db.utils.ts`
- Initializes and exports a shared MySQL connection pool
- `query()` function used across repository

---

## ✅ API Endpoints

### 🔸 `POST /auth/register`

**Body:**
```json
{
  "fullName": "John Doe",
  "number": "1234567890",
  "email": "john@example.com",
  "password": "Pass@1234",
  "confirmPassword": "Pass@1234"
}
```

**Response:**
```json

{ "message": "Registration successful" }
```

### 🔸 POST /auth/login
```json
{
  "email": "john@example.com",
  "password": "Pass@1234"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "status": "success"
}
```



## Future Enhancements
- JWT token issuance & guard-based protection
- Role-based access control (admin, user, etc.)
- Unit & E2E tests
- Swagger documentation