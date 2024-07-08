# Kanban Board API

This is the documentation for the API of the Kanban board web application. The API allows users to create, modify, and manage cards and columns, and incorporates a complete authentication and authorization system.
deploy: https://apikanban.onrender.com
use: https://apikanban.onrender.com/api

## Endpoints

# Authentication API Endpoints

## Overview

This API provides endpoints for user authentication, including registration, login, and logout. It handles user validation, password hashing, token generation, and cookie management.

## Functions

### Register User

- **URL:** `POST /register`
- **Description:** Registers a new user with the provided username, email, and password.
- **Request Body:**
  "username": "string",
  "email": "string",
  "password": "string"
- **Responses:**
  - `201 Created`: User successfully registered.
  - `400 Bad Request`: Validation error or missing parameters.
  - `409 Conflict`: Username or email already exists.
  - `500 Internal Server Error`: Server error.

### Login User

- **URL:** `POST /login`
- **Description:** Logs in a user with the provided email and password, generating a JWT token for authentication.
- **Request Body:**
  "email": "string",
  "password": "string"
- **Responses:**
  - `200 OK`: User successfully logged in, returns a JWT token.
  - `400 Bad Request`: Validation error or missing parameters.
  - `401 Unauthorized`: Invalid credentials.
  - `500 Internal Server Error`: Server error.

### Logout User

- **URL:** `GET /logout`
- **Description:** Logs out the currently authenticated user by clearing the access token cookie.
- **Responses:**
  - `200 OK`: User successfully logged out.
  - `500 Internal Server Error`: Server error.

## Error Handling

- `400 Bad Request`: Invalid request format or missing parameters.
- `401 Unauthorized`: Invalid credentials or unauthorized access.
- `409 Conflict`: User already exists (during registration).
- `500 Internal Server Error`: Server encountered an unexpected condition.



# Section API Endpoints

## Overview

This API provides endpoints to manage sections associated with users in a database. It includes functionalities for creating, retrieving, updating, and deleting sections, as well as retrieving all sections of a user.

## Functions

### Create Section

- **URL:** `POST /sections/:id_user`
- **Description:** Creates a new section for a specified user.
- **Request Body:**
  "title_section": "string"
- **Parameters:**
  - `id_user` (path): ID of the user to whom the section belongs.
- **Responses:**
  - `201 Created`: Section successfully created.
  - `400 Bad Request`: Validation error or missing parameters.
  - `401 Unauthorized`: Invalid user ID or unauthorized operation.
  - `500 Internal Server Error`: Server error.

### Get Sections

- **URL:** `GET /sections/:id_user`
- **Description:** Retrieves all sections belonging to a specified user.
- **Parameters:**
  - `id_user` (path): ID of the user whose sections are being retrieved.
- **Responses:**
  - `200 OK`: Successfully retrieved sections.
  - `400 Bad Request`: Invalid user ID.
  - `401 Unauthorized`: Unauthorized access.
  - `500 Internal Server Error`: Server error.

### Update Section

- **URL:** `PUT /sections/:id_section`
- **Description:** Updates the title of a specific section.
- **Request Body:**
  "title_section": "string"
- **Parameters:**
  - `id_section` (path): ID of the section to be updated.
- **Responses:**
  - `200 OK`: Section successfully updated.
  - `400 Bad Request`: Validation error or missing parameters.
  - `401 Unauthorized`: User is not authorized to update the section.
  - `500 Internal Server Error`: Server error.

### Delete Section

- **URL:** `DELETE /sections/:id_section`
- **Description:** Deletes a specific section.
- **Parameters:**
  - `id_section` (path): ID of the section to be deleted.
- **Responses:**
  - `200 OK`: Section successfully deleted.
  - `400 Bad Request`: Invalid section ID.
  - `401 Unauthorized`: User is not authorized to delete the section.
  - `500 Internal Server Error`: Server error.

### Get All Sections of User

- **URL:** `GET /sections`
- **Description:** Retrieves all sections of the authenticated user.
- **Responses:**
  - `200 OK`: Successfully retrieved all sections of the user.
  - `401 Unauthorized`: User is not authenticated.
  - `500 Internal Server Error`: Server error.



# Task API Endpoints

## Overview

This API provides endpoints to manage tasks associated with sections owned by users in a database. It includes functionalities for creating, retrieving, updating, and deleting tasks, as well as retrieving all tasks of a user.

## Functions

### Create Task

- **URL:** `POST /tasks/:id_section`
- **Description:** Creates a new task within a specified section.
- **Request Body:**
  "title_task": "string",
  "description_task": "string"
- **Parameters:**
  - `id_section` (path): ID of the section where the task will be created.
- **Responses:**
  - `201 Created`: Task successfully created.
  - `400 Bad Request`: Validation error or missing parameters.
  - `401 Unauthorized`: Invalid section ID or unauthorized operation.
  - `500 Internal Server Error`: Server error.

### Get Tasks

- **URL:** `GET /tasks/:id_section`
- **Description:** Retrieves all tasks within a specified section.
- **Parameters:**
  - `id_section` (path): ID of the section whose tasks are being retrieved.
- **Responses:**
  - `200 OK`: Successfully retrieved tasks.
  - `400 Bad Request`: Invalid section ID.
  - `401 Unauthorized`: Unauthorized access.
  - `500 Internal Server Error`: Server error.

### Update Task

- **URL:** `PUT /tasks/:id_task`
- **Description:** Updates the title and description of a specific task.
- **Request Body:**
  "title_task": "string",
  "description_task": "string"
- **Parameters:**
  - `id_task` (path): ID of the task to be updated.
- **Responses:**
  - `200 OK`: Task successfully updated.
  - `400 Bad Request`: Validation error or missing parameters.
  - `401 Unauthorized`: User is not authorized to update the task.
  - `500 Internal Server Error`: Server error.

### Delete Task

- **URL:** `DELETE /tasks/:id_task`
- **Description:** Deletes a specific task.
- **Parameters:**
  - `id_task` (path): ID of the task to be deleted.
- **Responses:**
  - `200 OK`: Task successfully deleted.
  - `400 Bad Request`: Invalid task ID.
  - `401 Unauthorized`: User is not authorized to delete the task.
  - `500 Internal Server Error`: Server error.

### Update Task Section

- **URL:** `PATCH /tasks/:id_task`
- **Description:** Moves a specific task to a different section.
- **Request Body:**
  "id_section": "integer"
- **Parameters:**
  - `id_task` (path): ID of the task to be moved.
- **Responses:**
  - `200 OK`: Task successfully moved to the new section.
  - `400 Bad Request`: Validation error or missing parameters.
  - `401 Unauthorized`: User is not authorized to move the task or invalid section ID.
  - `500 Internal Server Error`: Server error.

### Get All Tasks of User

- **URL:** `GET /tasks`
- **Description:** Retrieves all tasks of the authenticated user.
- **Responses:**
  - `200 OK`: Successfully retrieved all tasks of the user.
  - `401 Unauthorized`: User is not authenticated.
  - `500 Internal Server Error`: Server error.



# User API Endpoints

## Overview

This API provides endpoints for managing user profiles and retrieving user information from the database. It includes functions for getting all users, fetching user profiles, and updating user profiles.

## Functions


### Get User Profile

- **URL:** `GET /user/profile`
- **Description:** Retrieves the profile of the authenticated user.
- **Responses:**
  - `200 OK`: Returns the user profile object.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: Server encountered an unexpected condition.

### Update User Profile

- **URL:** `PUT /user/profile`
- **Description:** Updates the profile of the authenticated user.
- **Request Body:**
  "username": "string",
  "email": "string",
  "password": "string"
- **Responses:**
  - `200 OK`: User profile successfully updated. Returns a success message.
  - `400 Bad Request`: Validation error or missing parameters.
  - `500 Internal Server Error`: Server encountered an unexpected condition.

### Get All Users

- **URL:** `GET /user`
- **Description:** Retrieves all users from the database.
- **Responses:**
  - `200 OK`: Returns an array of user objects.
  - `500 Internal Server Error`: Server encountered an unexpected condition.


## Error Handling

- `400 Bad Request`: Invalid request format or missing parameters.
- `404 Not Found`: User profile not found.
- `500 Internal Server Error`: Server encountered an unexpected condition.



# Database Configuration

## Environment Variables

To connect to the database and configure JWT, we need to set the following environment variables:

### Database

- **`DB_USER`**: The database user name.
- **`DB_HOST`**: The database host address.
- **`DB_DATABASE`**: The name of the database.
- **`DB_PASSWORD`**: The database user password.
- **`DB_PORT`**: The port on which the database is listening.

### JWT

- **`JWT_SECRET`**: The secret key used to sign JWT tokens.

## Example `.env` File

Create a `.env` file in the root of your project and add the following lines with your database and JWT configuration values:

