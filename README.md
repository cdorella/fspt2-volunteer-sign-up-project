# Volunteer Sign Up Project

Welcome to my first MVP. This was done over the course of 2 weeks as a bootcamp project for CodeOp.

The project is a volunteer sign up page inspired by "Esperança", a community of volunteers that go out to neighborhoods of Barcelona handing out food and talking to people living on the streets.

In order to build this MVP I used the following stack:

Front-end: ReactJs, JavaScript, HTML, CSS & Bootstrap.

Back-end: NodeJs, Express & MySQL.

## Documentation

## User Flow Diagram

<img src="images/User%20Flow.png">

## Database schema

<img src="images/Database%20Schema.JPG">

## API Routes Plan

<img src="images/API%20Routes%201.JPG">
<img src="images/API%20Routes%202.JPG">

## Full Stack Architecture Drawing

<img src="images/MVP%20Project%20Architecture.jpg">

## Setup

### Dependencies

Run `yarn` on root folder to install dependencies related to Express.

`cd client` and run `yarn` install dependencies related to React.

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called sign_up_project: `create database sign_up_project`
- Add a `.env` file to the main folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=sign_up_project
  DB_PASS=YOURPASSWORD
```

- Run `yarn migrate` in the main folder of this repository, in a new terminal window. This will create the 5 tables you need for this project in your database (events, tasks, volunteers, event_tasks, tasks_volunteers).

### Run Your Development Servers

- Run `yarn start` in project directory to start the Express server on port 5000
- `cd client` and run `yarn start` to start client server in development mode with hot reloading in port 3000.
- You can test your client app in `http://localhost:3000`
- You can test your API in `http://localhost:5000/api`

## Notes

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
