# MovieGo

MovieGo is a web application that allows users to browse and search for movies. It consists of a frontend built with React and a backend built with Node.js and Express.

## Project Structure


## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (which includes npm)
- [Git](https://git-scm.com/)

## Setup

1. **Clone the repository:**

    ```bash
    
    cd reg
    

2. **Install dependencies:**

    For the frontend:

    ```bash
    cd frontend
    npm install
    ```

    For the backend:

    ```bash
    cd ../backend
    npm install
    ```

## Running the Application

1. **Start the backend server:**

    ```bash
    cd backend
    node server.js
    ```

    The backend server will start and run on `http://localhost:3001`.

2. **Start the frontend development server:**

    Open a new terminal window and navigate to the frontend directory:

    ```bash
    cd frontend
    npm run dev
    ```

    The frontend development server will start and run on `http://localhost:3000`.

## Folder Structure

- **frontend/**: Contains the React frontend application.
- **backend/**: Contains the Node.js and Express backend application.

## Environment Variables

To run the backend server, you need to configure environment variables. Create a `.env` file in the `backend` directory and add the necessary variables:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
