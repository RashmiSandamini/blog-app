# 📝 Blog Platform

A full-stack blog platform with an **Admin Panel** to manage blog posts and a **User Interface** for readers to browse and view content.

This is Phase 1 of the application, where a single admin manages all posts. User registration functionality is present in the codebase but will be included in the next phase, where admins will also have the ability to manage users and assign roles (admin/user).

---

## 🚀 Features

### 🔐 Admin Panel

- Admin login with JWT authentication
- Create new blog posts
- Edit existing posts
- Delete blog posts
- Protected routes to prevent unauthorized access

### 🌐 User Interface

- View a list of published blog posts
- Read individual blog posts
- Fully responsive and mobile-friendly UI

### 🛠 Backend

- RESTful API using Express.js
- Authentication with JSON Web Tokens (JWT)
- MySQL database
- Secure password storage using bcrypt

---

## 🧰 Tech Stack

| Layer       | Technology                |
| ----------- | ------------------------- |
| Frontend    | React, Vite, Tailwind CSS, shadcn UI |
| Backend     | Node.js, Express.js       |
| Database    | MySQL                     |
| Auth        | JWT, bcrypt               |
| Forms       | React Hook Form, Zod      |
| HTTP        | Axios                     |
| Text Editor | MDXEditor                 |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/RashmiSandamini/blog-app.git
cd blog-app
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

#### Configure `.env`

```env
PORT = 3000
MYSQL_HOST = localhost
MYSQL_USER = <YOUR_MYSQL_USER>
MYSQL_PASSWORD = <YOUR_MYSQL_PASSWORD>
MYSQL_DATABASE = blog_app
JWT_SECRET = <YOUR_JWT_SECRET>
CLIENT_URL = http://localhost:5173
```

#### Run Backend Dev Server

```bash
npm run start:dev
```

### 3. Setup the Databse

Make sure you have MySQL installed and import the SQL dump provided in the folder `blog_app.sql` by following one of the methods below.

#### Option 1: Using Command Line

1. Create the database by running:

   ```bash
    CREATE DATABASE blog_app;
   ```

2. Import the SQL dump by running this command in your terminal (navigate to the folder containing `blog_app.sql`):

   ```bash
    mysql -u <YOUR_MYSQL_USER> -p blog_app < blog_app.sql
   ```

   Replace <YOUR_MYSQL_USER> with your MySQL username (e.g., root). Enter your password when prompted.

#### Option 2: Using MySQL Workbench

1. Open MySQL Workbench and connect to your MySQL server.
2. Create a new schema (database) named `blog_app`.
3. Go to `Administration` > `Data Import`.
4. Select `Import from Self-Contained File` and choose the `blog_app.sql` file.
5. Select the `blog_app` schema as the default target schema.
6. Click `Start Import` to load the data.

### 4. Setup the Frontend

```bash
cd ../frontend
npm install
```

#### Configure `.env.local`

```env
VITE_API_BASE_URL = http://localhost:3000/api
```

#### Run Frontend Dev Server

```bash
npm run dev
```

## 📍 Access the App

User Interface: `http://localhost:5173`

To log in as an admin, use the following credentials.

```bash
Username = admin
Password = 1234
```

## Assumptions and Limitations

### Assumptions

- This version supports a single admin user managing blog content.
- User registration and login flows exist in the codebase but are currently disabled.

### Limitations

- Raw SQL queries are used instead of an ORM like Sequelize, which will be integrated in future updates.
- No support for multiple admin accounts or user roles at this time.


## 📍 Watch the Demonstration

([[Watch the demo video]](https://drive.google.com/file/d/1u0xJNE6xxBwgEZtw1dYGLnDNJ9X0zCfa/view?usp=sharing))

