# Node.js Portfolio Application

This is a Node.js application built with Express.js that follows semantic HTML structure by default. It provides both HTML and JSON responses based on query parameters.

## Features

- Semantic HTML structure with `<header>`, `<main>`, and `<footer>`
- JSON responses for all endpoints when `format=json` is in the query string
- MongoDB integration for data persistence
- Contact form functionality
- Search functionality for projects
- Dynamic routing for project details
- 404 error handling with a custom HTML page

## Endpoints

### GET Endpoints
- `/` - Homepage
- `/?format=json` - Homepage data in JSON format
- `/about` - About page
- `/about/?format=json` - About page data in JSON format
- `/projects` - Projects page
- `/projects/?format=json` - Projects data in JSON format
- `/projects/search?query=xyz` - Search projects (JSON response)
- `/projects/:id` - Project details
- `/projects/:id/?format=json` - Project details in JSON format
- `/contact` - Contact form
- `/contact/?format=json` - Contact form data in JSON format

### POST Endpoints
- `/contact` - Contact form submission

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv for environment variables
- Morgan for HTTP request logging

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Import the sample data to MongoDB by running `node data/seed.js`. This will create profile(home, about and contacts) and project data in the database.
5. Start the server with:
    -  `node index.js`

## Environment Variables
- `PORT`: The port on which the server will run (defaults to 3001 if not specified)
- `MONGODB_URI`: MongoDB connection string (required for database functionality)

## Database
This application uses MongoDB for data storage. Make sure you have a MongoDB instance running and provide the connection string in the `.env` file.

