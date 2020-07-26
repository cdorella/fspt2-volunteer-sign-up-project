require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
	host: DB_HOST || "127.0.0.1",
	user: DB_USER || "root",
	password: DB_PASS,
	database: DB_NAME || "sign_up_project",
	multipleStatements: true,
	dateStrings: true,
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");

	let createDatabase = `CREATE DATABASE ${DB_NAME};`;
	con.query(createDatabase, function (err, result) {
		if (err) throw err;
		console.log("Database creation `sign_up_projects` was successful!");
	});

	let useDatabase = `USE ${DB_NAME};`;
	con.query(useDatabase, function (err, result) {
		if (err) throw err;
		console.log("Connection to `sign_up_project` database was successful!");
	});

	let createEventsQuery =
		"DROP TABLE if exists events; CREATE TABLE events(id INT NOT NULL AUTO_INCREMENT, date DATE NOT NULL, route VARCHAR(40) NOT NULL, PRIMARY KEY (id));";
	con.query(createEventsQuery, function (err, result) {
		if (err) throw err;
		console.log("Table creation `events` was successful!");
	});

	let createTasksQuery =
		"DROP TABLE if exists tasks; CREATE TABLE tasks(id INT NOT NULL AUTO_INCREMENT, task_name VARCHAR(40) NOT NULL, task_description VARCHAR(255), PRIMARY KEY (id));";
	con.query(createTasksQuery, function (err, result) {
		if (err) throw err;
		console.log("Table creation `tasks` was successful!");
	});

	let createVolunteersQuery =
		"DROP TABLE if exists volunteers; CREATE TABLE volunteers(id INT NOT NULL AUTO_INCREMENT, first_name VARCHAR(40) NOT NULL, last_name VARCHAR(40) NOT NULL, email VARCHAR(80) NOT NULL, phone_number VARCHAR(15) NOT NULL, PRIMARY KEY (id));";
	con.query(createVolunteersQuery, function (err, result) {
		if (err) throw err;
		console.log("Table creation `volunteers` was successful!");
	});

	let createEventTasksQuery =
		"DROP TABLE if exists event_tasks; CREATE TABLE event_tasks(id INT NOT NULL AUTO_INCREMENT, event_id INT NOT NULL, task_id INT NOT NULL, spots_available INT NOT NULL, FOREIGN KEY (event_id) REFERENCES events (id), FOREIGN KEY (task_id) REFERENCES tasks (id), PRIMARY KEY (id));";
	con.query(createEventTasksQuery, function (err, result) {
		if (err) throw err;
		console.log("Table creation `event_tasks` was successful!");
	});

	let createTasksVolunteersQuery =
		"DROP TABLE if exists tasks_volunteers; CREATE TABLE tasks_volunteers(id INT NOT NULL AUTO_INCREMENT, selected_task_id INT NOT NULL, volunteer_id INT NOT NULL, confirmed TINYINT NOT NULL DEFAULT 1, FOREIGN KEY (selected_task_id) REFERENCES event_tasks (id),FOREIGN KEY (volunteer_id) REFERENCES volunteers (id), PRIMARY KEY (id));";
	con.query(createTasksVolunteersQuery, function (err, result) {
		if (err) throw err;
		console.log("Table creation `tasks_volunteers` was successful!");
	});

	console.log("Closing...");

	con.end();
});
