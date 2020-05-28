const express = require("express");
const db = require("./lib/db");
const router = express.Router();

router.get("/", (req, res) => {
	res.send({
		message: "Hello World",
	});
});

router.get("/projects", (req, res) => {
	db("SELECT * FROM events;").then(results => {
		if (results.error) {
			res.status(400).send({ message: "Error" });
		}
		res.send(results.data);
	});
});

module.exports = router;
