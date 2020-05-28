const express = require("express");

const db = require("./lib/db");

const routes = express.Router();

routes.get("/", (req, res) => {
	res.send({
		message: "Hello World",
	});
});

// TBC
routes.get("/api/project", (req, res) => {
	db("SELECT * FROM event_tasks;").then(results => {
		if (results.error) {
			res.status(400).send({ message: "Error" });
		}
		res.send(results.data);
	});
});

module.exports = routes;
