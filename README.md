# My Node.js Portfolio

This is a Node.js website using Express.js that follows semantic HTML structure by default. It provides JSON responses when `format=json` is in the query string.

## Features

- Semantic HTML structure with `<header>`, `<main>`, and `<footer>`.
- JSON responses for all endpoints.
- Search functionality for projects.
- Dynamic routing for project details.
- 404 error handling with a custom HTML page.

## Endpoints
#GET 
- `/` - Homepage
- `/?format=json` - data json 
- `/about` - About page
- `/about/?format=json` - data json
- `/projects` - Projects page
- `/projects/?format=json` - data json
- `/projects/search?query=xyz` - Search projects #JSON 
- `/projects/:id` - Project details
- `/projects/:id/?format=json` - data json
- `/contact` - Contact form
- `/contact/?format=json` - data json

#POST
- `/contact` - Contact form submission


## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server with `node index.js`.
