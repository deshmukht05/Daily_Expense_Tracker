# Daily Expense Tracker

A full-stack expense-tracking application built using React.js, Node.js, Drizzle ORM, and MySQL.

Enter an expense title and amount, save the expense to a MySQL database, and view stored records through the React interface.

## Overview

Daily Expense Tracker provides a simple interface for recording expenses and viewing saved entries.

The React frontend collects an expense title and amount from the user. After submission, the Node.js backend processes the request and saves the expense to MySQL.

The application retrieves stored expenses using SQL queries and displays the results on the frontend.

## Features

- Add an expense with a title and amount.
- Submit expense data through a React form.
- Store expense records in MySQL.
- Retrieve saved expenses using SQL queries.
- Display stored expenses in the user interface.
- Integrate database operations using Drizzle ORM.
- Keep saved expense records available beyond the current browser session.

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend interface and expense form |
| Node.js | Backend request processing |
| Drizzle ORM | Database integration |
| MySQL | Persistent expense storage |
| SQL | Retrieving stored expense records |

## How It Works

1. The user opens the expense tracker.
2. The user enters an expense title and amount.
3. The frontend submits the expense data to the backend.
4. The backend saves the expense to MySQL.
5. The application retrieves saved records using SQL queries.
6. The React interface displays the stored expenses.

## Application Flow

```text
React Expense Form
        |
        | Submit expense title and amount
        v
Node.js Backend
        |
        | Save expense through database integration
        v
MySQL Database
        |
        | Retrieve records using SQL queries
        v
Node.js Backend
        |
        | Send expense data to the frontend
        v
React Expense Display
```

## Example Usage

### Input

```text
Expense Title: Lunch
Amount: 150
```

### Displayed Record

```text
Title          Amount
Lunch          150
```

The example illustrates the information recorded by the application. The actual layout depends on the implemented interface.

## Expense Data

Each expense includes the following user-provided information:

| Field | Description |
|---|---|
| Title | A name or description for the expense |
| Amount | The value of the expense |

Add the actual database table name, column names, and any additional fields here if you want to document the complete schema.

## Getting Started

### Prerequisites

- Node.js and npm
- MySQL
- Git, if cloning the repository

### 1. Clone the Repository

Replace the placeholders with your GitHub username and repository name.

```bash
git clone [https://github.com/your-username/your-repository-name.git](https://github.com/your-username/your-repository-name.git)
cd your-repository-name
```

### 2. Install Dependencies

Install dependencies in each directory that contains a `package.json` file:

```bash
npm install
```

If the frontend and backend are maintained in separate directories, install their dependencies separately.

### 3. Configure MySQL

Create the database required by the project and configure the backend's database connection.

Document the exact configuration keys used by your application, including any required:

- Database host.
- Database port.
- Database username.
- Database password.
- Database name.
- Backend server port.

Do not commit passwords or other credentials to the repository.

### 4. Initialize the Database

Use the database schema setup or migration process configured for this project.

Add your exact Drizzle setup command here so that other developers can create the required expense table.

### 5. Configure the Frontend

If required by your implementation, configure the frontend to use the correct backend address.

Document the actual setting and configuration location used by the application.

### 6. Start the Backend and Frontend

Run the scripts defined in the relevant `package.json` files.

Complete the following table with the actual commands:

| Component | Directory | Start Command |
|---|---|---|
| Backend | Add backend directory | Add backend command |
| Frontend | Add frontend directory | Add frontend command |

Open the frontend address displayed in the terminal.

## Using the Application

1. Start MySQL, the backend, and the frontend.
2. Open the application in your browser.
3. Enter an expense title.
4. Enter the expense amount.
5. Submit the form.
6. View the saved expense in the interface.

## Project Configuration

Complete these details to make local setup easier:

| Setting | Project Value |
|---|---|
| Backend entry file | Add your entry filename |
| Frontend directory | Add your frontend path |
| Backend directory | Add your backend path |
| Frontend address | Add your local frontend URL |
| Backend address | Add your local backend URL |
| Database name | Add your database name |
| Expense table | Add your actual table name |
| Database initialization command | Add your schema or migration command |

## Learning Objectives

This project provides practice with:

- Building forms in React.
- Handling expense title and amount inputs.
- Submitting frontend data to a backend.
- Processing requests using Node.js.
- Integrating Drizzle ORM with MySQL.
- Inserting expense records into a database.
- Retrieving stored records using SQL.
- Displaying backend data in a React interface.
- Connecting frontend, backend, and database layers.
- Working with persistent application data.

## Future Improvements

Potential improvements, if not already implemented:

- Edit and delete expenses.
- Validate empty titles and invalid amounts.
- Display loading, success, and error messages.
- Calculate total expenses.
- Add expense categories.
- Record and filter expenses by date.
- Add monthly summaries.
- Display charts and spending trends.
- Search expenses by title.
- Export expenses as CSV.
- Add pagination for larger expense lists.
- Add authentication and separate records for each user.
- Add automated tests.

## Contributing

Suggestions and improvements are welcome.

1. Fork the repository.
2. Create a branch for your changes.
3. Make and test your changes.
4. Submit a pull request.

## Author

Tushar Deshmukh

## License

Add your chosen license and a corresponding LICENSE file to specify the terms for using, modifying, and distributing this project.
