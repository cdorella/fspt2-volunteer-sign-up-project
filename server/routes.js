const express = require("express");

const db = require("./lib/db");

const routes = express.Router();

routes.get("/", (req, res) => {
	res.send({
		message: "Hello World",
	});
});

// TO BE MODIFIED ACCORDING TO MY FUTURE DB INFO
routes.get("/users", (req, res) => {
	db("SELECT * FROM users;").then(results => {
		if (results.error) {
			res.status(400).send({ message: "Error" });
		}
		res.send(results.data);
	});
});

module.exports = routes;
