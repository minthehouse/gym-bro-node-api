# Gym Bro Node API

Welcome to the Gym Bro Node API repository! 
This backend application, written in Node.js using Express.js, supports the Gym Bro (CRUD) application. 
The API facilitates the management of daily workouts and diets for users, providing functionality for searching, saving, and retrieving data.

## Features

### 1. User Profile
- **User Registration:** Users can register with the system, providing details such as name, email, password, and optional information like gender, age, and fitness goals.

### 2. Exercise Tracking
- **Workout History:** Users can track their daily workouts, including details such as exercises performed, weights, and repetitions.
- **Exercise Types:** The API supports various exercise types categorized by muscle groups.

### 3. Diet Management
- **Search and Save:** Users can search for foods, create diets, and save food items to their diets.
- **Nutritional Information:** The API calculates and stores nutritional information, including calories, protein, carbohydrates, and fat, for each food item.


## Main Models and Relations

1. **User Model**
   - Represents a registered user with details such as name, email, and profile information.
   - Associated with diets and workouts.

2. **Workout Model**
   - Represents a user's workout session, associated with exercises.

3. **Diet Model**
   - Represents a user's daily food intake, associated with food items and the user.

This structure forms the basis for managing user profiles, workouts, diets, and the relationships between them. 
The data flow allows users to track their exercise routines and daily food intake effectively. Feel free to refer to the `schema.prisma` file for more details on the database implementation.

## Middleware and Validation

The API utilizes the express-validator package for middleware to validate HTTP requests, ensuring that required and valid fields are present. This pattern enhances the reliability and security of the application.

## Technologies Used

### 1. Node.js and Express.js
- **Node.js:** A JavaScript runtime built on the V8 engine, enabling server-side execution of JavaScript.
- **Express.js:** A web application framework for Node.js, simplifying the development of robust APIs.

### 2. Prisma ORM
- **Prisma:** An open-source database toolkit that simplifies database access and migrations.
  
### 3. Authentication with JWT Tokens
- **JSON Web Tokens (JWT):** The API employs JSON Web Tokens (JWT) for user authentication. Upon successful login or registration, the server issues a JWT token that must be included in the headers of subsequent requests for authentication.

### 4. Integrated FoodData Central API
- **U.S. Department of Agriculture:** The API integrates with the FoodData Central API for comprehensive food search functionality and nutritional information retrieval.

### 5. Render Hosting Platform
- **Render:** The application is hosted on the Render platform, eliminating the need for manual installations. Render provides seamless deployment and scaling.

## Testing

For development and testing purposes, the `Thunder Client` VS Code extension is recommended for endpoint testing. This extension simplifies the process of testing API endpoints directly within the VS Code environment.

## Getting Started

To get started with the Gym Bro Node API, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/minthehouse/gym-bro-node-api.git
   ```

2. Navigate to the project directory:
   ```bash
   cd gym-bro-node-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the database:
   - Create a PostgreSQL database and update the database URL in the `config.json` or environment variables.

5. Run the migrations:
   ```bash
   npx prisma migrate dev
   ```

6. Start the server:
   ```bash
   npm start
   ```

   The server will be running at the specified port (e.g., `http://localhost:3000`).

Feel free to adapt the instructions based on your specific setup and requirements.
