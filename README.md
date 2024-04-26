# Contacts API

This is a RESTful API built with Express.js and the `@jworkman-fs/asl` package for managing a digital contact book. It supports CRUD operations, filtering, sorting, and pagination.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- Node.js
- npm

### Installing

A step-by-step guide to get a development environment running:

1. Clone the repository:
   ```bash
   git clone https://yourrepository.com/yourproject.git

2. Navigate to the project directory:
    ```bash
    cd yourproject
   
3. Install the dependencies:
    ```bash
    npm install
   
4. Start the server:
    ```bash
    npm start

### API Endpoints

Each endpoint manipulates or displays information related to contacts in the digital contact book:

### List Contacts

-GET /v1/contacts 
--Query parameters:
---sort (optional): Field to sort by.
---direction (optional): Direction of sorting, asc or desc.
---page (optional): Page number in pagination.
---limit (optional): Number of items per page.

### Create Contact

-POST /v1/contacts
--Body:
---firstname: First name of the contact.
---lastname: Last name of the contact.
---email: Email address of the contact.
---phone: Phone number of the contact.
---birthday: Birthday of the contact.

### Get Single Contact

-GET /v1/contacts/:id
--URL parameters:
---id: The ID of the contact.

### Update Contact
-PUT /v1/contacts/:id
--URL parameters:
---id: The ID of the contact.
--Body:
---firstname: First name of the contact.
---lastname: Last name of the contact.
---email: Email address of the contact.
---phone: Phone number of the contact.
---birthday: Birthday of the contact.

### Delete Contact
-DELETE /v1/contacts/:id
-URL parameters:
-id: The ID of the contact.

### Running the tests

To run the automated tests for this system, run the following command:

```bash
npm test
```
or
```bash
jest
```

### Built With

- [Express.js](https://expressjs.com/) - The web framework used
- [Jest](https://jestjs.io/) - Testing framework
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [@jworkman-fs/asl](https://www.npmjs.com/package/@jworkman-fs/asl) - Advanced Server-side Languages package for FS University

